AFRAME.registerComponent('delete', {
    schema: {type: 'string'},
  
    init: function () {
      var stringToLog = this.data;
      console.log(stringToLog);
    }
  });