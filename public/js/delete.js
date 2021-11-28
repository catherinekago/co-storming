AFRAME.registerComponent('delete', {

  init: function () {

    // Touch and Click Input
    // Set double click detection 
    this.el.addEventListener("click", function (event) {
      console.log("click");
      console.log(event.target)
      console.log(event.target.parentNode.remove())
      // delete parent component (post-it)
    });

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

      // Voice Input

  }
});