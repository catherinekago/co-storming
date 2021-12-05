AFRAME.registerComponent('addpostit', {

  init: function () {
    // Method to create new entity of post it 
    function createPostIt(x, y) {
      console.log("with click :" + x + " " + y)
      var postIt = document.createElement('a-entity');
      postIt.setAttribute("id", "myPostIt");
      postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
      let position = x + " " + (y) + " " + "-5.98";
      postIt.setAttribute("position", position);
      document.getElementById("scene").appendChild(postIt);
    }

    // Source Double Click Function: https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event
    function makeDoubleClick(e) {

      var clicks = 0,
        timeout;
      return function (e) {

        clicks++;

        if (clicks == 1) {
          timeout = setTimeout(function () {
            clicks = 0;
          }, 250);
        } else {
          clearTimeout(timeout);
          createPostIt(e.detail.intersection.point.x, e.detail.intersection.point.y)
          clicks = 0;
        }
      }
    }

    this.el.addEventListener('click', makeDoubleClick());


    // Event listeners to listen for raycaster on wall
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
    if(this.el.is("neu")) {
      var postIt = document.createElement('a-entity');
      postIt.setAttribute("id", "myPostIt");
      postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
      let position = intersection.point.x + " " + intersection.point.y + " " + "-5.98";
      postIt.setAttribute("position", position);
      document.getElementById("scene").appendChild(postIt)
      document.getElementById("wall").removeState("neu");
    }
  },
    
  });