/* global AFRAME, AFK */
const validateKeyboardInput = require('src/utils/events');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('a-keyboard', {
  schema: {
    audio: {default: false}, // Only if adapter supports audio
    color: {default: '#fff'},
    highlightColor: {default: '#1a79dc'},
    dismissable: {default: true},
    font: {default: 'roboto'},
    fontSize: {default: '0.39'},
    locale: {default: 'en'},
    model: {default: ''},
    baseTexture: {default: ''},
    keyTexture: {default: ''},
    verticalAlign: {default: 'center'},
  },

  init: function() {
    AFK.template.draw({...this.data, el: this.el});
    this.attachEventListeners();
  },

  attachEventListeners: function() {
    window.addEventListener('keydown', this.handleKeyboardPress);
    this.el.addEventListener('click', this.handleKeyboardVR);
  },

  removeEventListeners: function() {
    window.removeEventListener('keydown', this.handleKeyboardPress);
    this.el.removeEventListener('click', this.handleKeyboardVR);
  },

  handleKeyboardPress: function(e) {
    validateKeyboardInput(e);
  },

  handleKeyboardVR: function(e) {
    validateKeyboardInput(e, 'vr');
  },

  remove: function() {
    this.removeEventListeners();
  },
});
