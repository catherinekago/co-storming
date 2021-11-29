AFRAME.registerComponent('delete', {

  init: function () {

    this.el.addEventListener("click", function (event) {
      // delete parent component (post-it)
      event.target.parentNode.remove();
    });


          // Voice Input

    // this.el.addEventListener("touchstart", tapHandler);
    // // Set double tap detection
    // // var tapedTwice = false;
    // function tapHandler(event) {
    //   // if (!tapedTwice) {
    //   //   tapedTwice = true;
    //   //   setTimeout(function () { tapedTwice = false; }, 300);
    //   //   return false;
    //   // }
    //   event.preventDefault();
    //   console.log('You tapped me!!!');
    //   // delete parent component (post-it)
    //   console.log(event.target)



  }
});