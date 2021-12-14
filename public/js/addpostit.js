AFRAME.registerComponent('addpostit', {

  init: function () {
    // Method to create new entity of post it 
    function createPostIt(x, y) {
      console.log("with click :" + x + " " + y)
      var postIt = document.createElement('a-entity');
      postIt.setAttribute("id", "myPostIt");
      postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
      let position = x + " " + (y) + " " + "-9.98";
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
          let positionX = e.detail.intersection.point.x <= -9.4 ? "-9.4" : (e.detail.intersection.point.x >= 9.4 ? "9.4" : e.detail.intersection.point.x)
          let positionY = e.detail.intersection.point.y >= 11.4 ? "11.4" : (e.detail.intersection.point.y <= 0.56 ? "0.56" : e.detail.intersection.point.y)
          createPostIt(positionX, positionY)
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
      let positionX = intersection.point.x <= -9.4 ? "-9.4" : (intersection.point.x >= 9.4 ? "9.4" : intersection.point.x)
      let position = positionX + " " + intersection.point.y + " " + "-9.98";
      postIt.setAttribute("position", position);
      document.getElementById("scene").appendChild(postIt)
      document.getElementById("wall").removeState("neu");
    }
  },
    
  });