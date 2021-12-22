AFRAME.registerComponent('delete', {

  init: function () {

    this.el.addEventListener("click", function (event) {
      // delete parent component (post-it)
      event.stopPropagation();
      event.target.parentNode.remove();
    });

  }
});
