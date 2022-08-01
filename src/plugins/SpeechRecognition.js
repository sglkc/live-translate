export default {
  install: (app) => {
    const SpeechRecognition =
      window.SpeechRecognition || webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.listeners = {
      start: {},
      end: {}
    };

    recognition.addListener = function (on, name, callback) {
      const listener = {
        [name]: callback
      };
      this.listeners[on] = Object.assign({}, this.listeners[on], listener);
    };

    recognition.onstart = function () {
      const listeners = Object.values(this.listeners.start);
      listeners.forEach((listener) => listener());
    };

    recognition.onend = function () {
      const listeners = Object.values(this.listeners.end);
      listeners.forEach((listener) => listener());
    };

    app.provide('SpeechRecognition', recognition);
  }
}
