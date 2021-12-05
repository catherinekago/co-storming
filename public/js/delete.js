AFRAME.registerComponent('delete', {

  init: function () {

    this.el.addEventListener("click", function (event) {
      // delete parent component (post-it)
      event.stopPropagation();
      event.target.parentNode.remove();
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
    if (!this.raycaster) {
      return;
    }  // Not intersecting.

    let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) {
      return;
    }
    // Create post it if voice command has been provided
    if(document.getElementById("wall").is("delete")) {
      this.el.parentNode.remove();
      document.getElementById("wall").removeState("delete");
    }
  },
});