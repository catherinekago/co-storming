AFRAME.registerComponent('selectcolor', {
    schema: {
        color: {type: 'color', default: '#000'},
      },

    init: function () {
  
      this.el.addEventListener("click", function (event) {
        // delete parent component (post-it)
        event.stopPropagation();
        let btns = document.getElementsByClassName("color-btn");
        for (var i = 0; i < btns.length; i++) {
            btns.item(i).removeState("selected");
         }
        this.addState("selected");

            document.getElementById("welcome-submit").setAttribute("visible", "true");
            document.getElementById("welcome-submit").classList.add("clickable");

      });

    },
  
    tick: function () {
    
        if(this.el.is("selected") && this.el.getAttribute("material").color !== this.data.color){
            this.el.setAttribute("material", "color", this.data.color);
            // todo: how to access template?
            this.el.sceneEl.setAttribute("setupuser", "usercolor", this.data.color);

        } else if (!this.el.is("selected")) {
            this.el.setAttribute("material", "color", "white");
        }
    },
  });