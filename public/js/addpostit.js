AFRAME.registerComponent('addpostit', {

  init: function () {
    // Method to create new entity of post it 
    function addPostIt(x, y) {
      var postIt = document.createElement('a-entity');
      postIt.setAttribute("id", "myPostIt");
      postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
      let position = x + " " + (y) + " " + "-9.98";
      postIt.setAttribute("position", position);
      postIt.setAttribute("material", "color", document.getElementById("scene").getAttribute("setupuser").usercolor)

      // set up name tag
      let nametag = document.createElement('a-entity');
      nametag.setAttribute("text", "value", document.getElementById("scene").getAttribute("setupuser").username)
      nametag.setAttribute("networked", "template:#post-it-name; attachTemplateToLocal:true");
      postIt.appendChild(nametag);

      // Text Field Component 
      let textField = document.createElement('a-text');
      textField.setAttribute("text", "value", "This is where \n the text will \n go");
      textField.setAttribute("networked", "template:#post-it-text; attachTemplateToLocal:true");
      textField.classList.add("postit-text");
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
      this.el.addState("justcreated");
      this.el.removeState("neu");

      var postIt = document.createElement('a-entity');
      postIt.setAttribute("id", "myPostIt");
      postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
      let positionX = intersection.point.x <= -9.4 ? "-9.4" : (intersection.point.x >= 9.4 ? "9.4" : intersection.point.x)
      let position = positionX + " " + intersection.point.y + " " + "-9.98";
      postIt.setAttribute("position", position);
      postIt.setAttribute("material", "color", document.getElementById("scene").getAttribute("setupuser").usercolor);

      // Set up mic icon
      var micIcon = document.createElement("a-image");
      micIcon.classList.add("postitMicrophone");
      micIcon.setAttribute("visible", "true");
      micIcon.setAttribute("scale", "0.5 0.5 1");
      micIcon.setAttribute("animation", "property", "material.opacity");
      micIcon.setAttribute("animation", "to", "0.5 1.0");
      micIcon.setAttribute("animation", "loop", "true");
      micIcon.setAttribute("animation", "dur", "1250");
      micIcon.setAttribute("animation", "easing", "easeInOutCubic");
      micIcon.setAttribute("position", "0 -0.015 0.02");
      micIcon.setAttribute("src", "#mic-icon-white");
      postIt.appendChild(micIcon);

      // <a-image id="name-mic" class="colorMicrophone" visible="true" scale="0.5 0.5 1"
      // animation="property: material.opacity; to: 0.5 1.0; loop: true; dur: 1250; easing: easeInOutCubic"
      // position="0 -0.015 0.02 " src="#mic-icon-white"></a-image>

      // set up name tag
      let nametag = document.createElement('a-entity');
      nametag.setAttribute("text", "value", document.getElementById("scene").getAttribute("setupuser").username)
      nametag.setAttribute("networked", "template:#post-it-name; attachTemplateToLocal:true");
      postIt.appendChild(nametag);

      // Text Field Component 
      let textField = document.createElement('a-text');
      textField.setAttribute("networked", "template:#post-it-text; attachTemplateToLocal:true");
      textField.classList.add("postit-text");
      postIt.appendChild(textField);

      document.getElementById("scene").appendChild(postIt);


    }
  },
    
  });