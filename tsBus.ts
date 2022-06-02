export class TsBus {
  private events: Record<string, ((eventData?: any) => void)[]> = {};

  on(eventName: string, handler: (eventData?: any) => void) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);
  }

  off(eventName: string, handler: (eventData?: any) => void) {
    if (!this.events[eventName]) return;

    for (let i = 0; i < this.events[eventName].length; i++) {
      if (this.events[eventName][i] === handler) {
        delete this.events[eventName][i];
        this.events[eventName].splice(i, 1);
        break;
      }
    }
  }

  once(eventName: string, handler: (eventData?: any) => void) {
    const runOnce = () => {
      this.off(eventName, runOnce);
      handler();
    };
    this.on(eventName, runOnce);
  }

  emit(eventName: string, eventData?: any) {
    if (this.events[eventName]) this.events[eventName].forEach((handler) => handler(eventData));
  }
}
