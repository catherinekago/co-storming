AFRAME.registerComponent('movepostit', {

    schema: {
        userId: {type: "string", default: "none"}
    },

    init: function () {

        // Add listener that selects and deselects a post it 
        this.el.addEventListener('click', function (event) {
            if (!this.is("selected")) {
                console.log("clicked");
                this.addState("selected");
                this.addState(this.userId);
            } else {
                // Drop post it if clicked on it again
                if (this.is(this.userId)) {
                    console.log("dropped");
                    this.removeState("selected");
                    this.removeState(this.userId);
                }
            }

        });

        // Add listener to event of being selected
        this.el.addEventListener("stateadded", function (event) {
            if (event.detail === "selected") {
            }
        });

        this.el.addEventListener('raycaster-intersected', evt => {
            this.raycaster = evt.detail.el;
          });


    }, 
    tick: function () {
        if (this.el.is("selected") && this.el.is(this.userId)) {
            if (!this.raycaster) { return; }  // Not intersecting.
            let intersection = this.raycaster.components.raycaster.getIntersection(document.getElementById("wall"));
            if (!intersection) { return; } // Not intersecting
            // intersecting
            let positionX = intersection.point.x <= -9.4 ? "-9.4" : (intersection.point.x >= 9.4 ? "9.4" : intersection.point.x)
            let positionY = intersection.point.y >= 11.4 ? "11.4" : (intersection.point.y <= 0.56 ? "0.56" : intersection.point.y)
            let position = positionX + " " + positionY + " " + "-9.98";
            this.el.setAttribute("position", position);
        }

    }

});