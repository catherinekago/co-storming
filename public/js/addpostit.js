AFRAME.registerComponent('addpostit', {
  schema:{
    userName: {type: "string", default: "Rudolf"},
    color: {type: "color", default: "red"},
    isMobile: {type:"string", default: "true"}
  },

  init: function () {
    // Method to create new entity of post it 
    function addPostIt(x, y) {
      console.log("with click :" + x + " " + y)
      var postIt = document.createElement('a-entity');
      postIt.setAttribute("id", "myPostIt");
      postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
      let position = x + " " + (y) + " " + "-9.98";
      postIt.setAttribute("position", position);

      // Text Field Component 
      let textField = document.createElement('a-text');
      textField.setAttribute("scale", "0.9 0.7 0.7");
      textField.setAttribute("position", "-0.45 0.1 1000");
      textField.setAttribute("text", "value", "This is where \n the text will \n go");
      textField.setAttribute("text", "width", "3");
      textField.setAttribute("text", "color", "black");
      postIt.appendChild(textField);

      document.getElementById("scene").appendChild(postIt);

      if (!AFRAME.utils.device.isMobile()){
        // // Marion: this is where you have to make keyboard visible and ready to modify the text field value:
        // textfield.setAttribute("text", "value", "what the user is typing")
      }
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
          addPostIt(positionX, positionY);

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