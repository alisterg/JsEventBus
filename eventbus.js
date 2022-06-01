class EventBus {
  events = {};

  on(eventName, handler) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);
  }

  off(eventName, handler) {
    if (!this.events[eventName]) return;

    for (let i = 0; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i] === handler) {
        delete this.events[eventName][i];
        this.events[eventName].splice(i, 1);
        break;
      }
    }
  }

  once(eventName, handler) {
    const runOnce = () => {
      this.off(eventName, runOnce);
      handler();
    };
    this.on(eventName, runOnce);
  }

  emit(eventName, eventData) {
    if (this.events[eventName]) this.events[eventName].forEach((handler) => handler(eventData));
  }
}

module.exports = EventBus;
