AFRAME.registerComponent('selectcolor', {
    schema: {
        color: {type: 'color', default: '#000'},
      },

    init: function () {
      let color = 
  
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
  
  
      // Event listeners to listen for raycaster on delete icon
      this.el.addEventListener('raycaster-intersected', evt => {
        this.raycaster = evt.detail.el;
      });
      this.el.addEventListener('raycaster-intersected-cleared', evt => {
        this.raycaster = null;
      });
    },
  
    tick: function () {
    
        if(this.el.is("selected") && this.el.getAttribute("material").color !== this.data.color){
            this.el.setAttribute("material", "color", this.data.color);
            // todo: how to access template?
            console.log(document.getElementById("post-it-template").content);

        } else if (!this.el.is("selected")) {
            this.el.setAttribute("material", "color", "white");
        }
      if (!this.raycaster) {
        return;
      }  // Not intersecting.
  
      let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
      if (!intersection) {
        return;
      }
      // Create post it if voice command has been provided
      if(document.getElementById("welcome-screen").is("fertig")) {
        this.el.parentNode.remove();
        document.getElementById("welcome-screen").removeState("fertig");
      }
    },
  });