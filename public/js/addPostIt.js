AFRAME.registerComponent('addpostit', {

    init: function () {
       
    // Method to create new entity of post it 
    function createPostIt(x,y,z) {
      console.log(x + " " + y)
        var postIt = document.createElement('a-entity');
        postIt.setAttribute("id", "myPostIt");
        postIt.setAttribute("networked", "template:#post-it-template; attachTemplateToLocal:true");
        let position = x + " " + (y)+ " " + "-5.98";
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
            createPostIt(e.detail.intersection.point.x, e.detail.intersection.point.y, e.detail.intersection.point.z)
            clicks = 0;
          }
        }
      }
  
      this.el.addEventListener('click', makeDoubleClick());

    },
    
   
    
     
  });