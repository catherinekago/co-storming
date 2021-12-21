AFRAME.registerComponent('movepostit', {

    schema: {
        userId: { type: "string", default: "none" }
    },

    init: function () {
        this.el.addState(document.getElementById("scene").getAttribute("setupuser").username);
        this.el.addState("typing");

        // Add listener that selects and deselects a post it 
        this.el.addEventListener('click', function (event) {
            if (!this.is("selected")) {
                this.addState("selected");
                this.addState(this.userId);
                document.getElementById("wall").removeState("selected");
            } else {
                // Drop post it if clicked on it again
                if (this.is(this.userId)) {
                    this.removeState("selected");
                    this.removeState(this.userId);
                    document.getElementById("wall").removeState("deselected");
                }
            }

        });

        // Add listener to event of being selected
        this.el.addEventListener("stateadded", function (event) {
            if (event.detail === "selected") {
                // todo: change to selectborder;
            }
        });

        this.el.addEventListener('raycaster-intersected', evt => {
            this.raycaster = evt.detail.el;
            this.el.addState("intersected");
            // todo: add hoverborder
        });

        this.el.addEventListener('raycaster-intersected-cleared', evt => {
            this.raycaster = null;
            this.el.removeState("intersected");
            // todo: remove hoverborder
        });


    },
    tick: function () {
        if (!this.raycaster) {
            return;
          }  // Not intersecting.

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
        let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
        if (!intersection) {
            return;
        }
        if (intersection && !this.el.is("selected") && document.getElementById("wall").is("selected")) {
            this.el.addState("selected");
            this.el.addState(this.el.userId);
            document.getElementById("wall").removeState("selected");
            console.log("understood")
        } else if (intersection && !this.el.is("deselected") && document.getElementById("wall").is("deselected")) {
            if (this.el.is(this.el.userId)) {
                this.el.removeState("selected");
                //todo: change to hoverborder
                this.el.removeState(this.el.userId);
            }
            document.getElementById("wall").removeState("deselected");
        } else if (document.getElementById("scene").getAttribute("setupuser").postitinput !== "" && this.el.is(document.getElementById("scene").getAttribute("setupuser").username)){

            let input = document.getElementById("scene").getAttribute("setupuser").postitinput;
            let textfields = document.getElementsByClassName("postit-text");
            for (var i = 0; i < textfields.length; i++) {
                if( textfields.item(i).parentElement.is(document.getElementById("scene").getAttribute("setupuser").username) && textfields.item(i).parentElement.is("typing")){
                    console.log("now add this: " + document.getElementById("scene").getAttribute("setupuser").postitinput);
                    textfields.item(i).setAttribute("value", input);
                    document.getElementById("scene").setAttribute("setupuser", "postitinput", "");
                    document.getElementById("wall").removeState("justcreated");
                    textfields.item(i).parentElement.removeState(document.getElementById("scene").getAttribute("setupuser").postitinput);
                    textfields.item(i).parentElement.removeState("typing");
                }
             }

          }
    }

});