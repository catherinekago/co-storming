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
                document.getElementById("cursor").setAttribute("material", "color", "#000");

            }
        });

        this.el.addEventListener('raycaster-intersected', evt => {
            this.raycaster = evt.detail.el;
            this.el.addState("intersected");
            document.getElementById("cursor").setAttribute("material", "color", "#ff3");

        });

        this.el.addEventListener('raycaster-intersected-cleared', evt => {
            this.raycaster = null;
            this.el.removeState("intersected");
            document.getElementById("cursor").setAttribute("material", "color", "white");

        });


    },
    tick: function () {
        // check if user is providing voice input for post it text
        if (document.getElementById("scene").getAttribute("setupuser").postitinput !== "" && this.el.is(document.getElementById("scene").getAttribute("setupuser").username)) {

            let input = document.getElementById("scene").getAttribute("setupuser").postitinput;
            let textfields = document.getElementsByClassName("postit-text");
            for (var i = 0; i < textfields.length; i++) {
                if (textfields.item(i).parentElement.is(document.getElementById("scene").getAttribute("setupuser").username) && textfields.item(i).parentElement.is("typing")) {
                    let formattedInput = "";
                    while (input.length > 0) {
                        let upperBound = input.length >= 15 ? 15 : input.length;
                        let newLine = input.substring(0, upperBound);
                        // if last char is " ", remove
                        if (newLine[newLine.length - 1] === " ") {
                            newLine = newLine.substring(0, upperBound - 1) + "\n"
                            // if last char of newLine and first char of rest !== " " add -
                        } else if (newLine[newLine.length - 1] !== " " && input.length > 15 && input[16] !== " ") {
                            newLine = newLine + "-" + "\n"
                        } else {
                            newLine = newLine + "\n"
                        }
                            input = input.substring(upperBound, input.length);
                        formattedInput = formattedInput + newLine;
                        console.log(formattedInput)
                    }

                    textfields.item(i).setAttribute("value", formattedInput);
                    document.getElementById("scene").setAttribute("setupuser", "postitinput", "");
                    document.getElementById("wall").removeState("justcreated");
                    // remove mic icon
                    let icons = document.getElementsByClassName("postitMicrophone");
                    for (var i = 0; i < icons.length; i++) {
                        if (icons.item(i).parentElement.is(document.getElementById("scene").getAttribute("setupuser").username) && icons.item(i).parentElement.is("typing")) {
                            icons.item(i).setAttribute("visible", "false");
                            icons.item(i).parentElement.removeState(document.getElementById("scene").getAttribute("setupuser").postitinput);
                            icons.item(i).parentElement.removeState("typing");
                        }
                    }

                }

            }


        }
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
                document.getElementById("cursor").setAttribute("material", "color", "#ff3");
                this.el.removeState(this.el.userId);
            }
            document.getElementById("wall").removeState("deselected");
        }


    }

});