AFRAME.registerComponent('submitinfo', {

    init: function () {
  
      this.el.addEventListener("click", function (event) {
        // delete parent component (post-it)
        event.stopPropagation();
        event.target.parentNode.remove();
        document.getElementById("wall").classList.add("clickable");
      });
  
    },
  
    tick: function () {

      if(document.getElementById("welcome-screen") !== undefined && document.getElementById("welcome-screen").is("fertig")) {
          console.log("remoooove")
        document.getElementById("welcome-screen").removeState("fertig");
        this.el.parentNode.remove();
        document.getElementById("wall").classList.add("clickable");
      }
    },
  });