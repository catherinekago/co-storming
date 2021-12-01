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
                console.log("selected just now!");
            }
        })
    }

});