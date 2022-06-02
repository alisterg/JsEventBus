import { TsBus } from "./tsBus";

describe("TsBus class", function () {
  const events = {
    TEST1: "test",
    TEST2: "test2",
    TEST3: "test3",
  };

  let bus: TsBus;

  beforeEach(() => {
    bus = new TsBus();
  });

  it("Calls the handler when an event is emitted", () => {
    const handler = jest.fn();
    bus.on(events.TEST1, handler);
    bus.emit(events.TEST1);

    expect(handler).toHaveBeenCalled();
  });

  it("Calls multiple handlers when multiple events are emitted", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const handler4 = jest.fn();
    const handler5 = jest.fn();

    bus.on(events.TEST1, handler1);
    bus.on(events.TEST2, handler2);
    bus.on(events.TEST3, handler3);
    bus.on(events.TEST3, handler4);
    bus.on(events.TEST3, handler5);

    bus.emit(events.TEST1);
    bus.emit(events.TEST2);
    bus.emit(events.TEST3);

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).toHaveBeenCalled();
    expect(handler4).toHaveBeenCalled();
    expect(handler5).toHaveBeenCalled();
  });

  it("Correctly de-registers event handlers", () => {
    const handler = jest.fn();

    bus.on(events.TEST1, handler);
    bus.off(events.TEST1, handler);
    bus.emit(events.TEST1);

    expect(handler).not.toHaveBeenCalled();
  });

  it("Correctly de-registers event handlers while calling multiple", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const handler4 = jest.fn();
    const handler5 = jest.fn();

    bus.on(events.TEST1, handler1);
    bus.on(events.TEST1, handler2);
    bus.on(events.TEST1, handler3);
    bus.on(events.TEST1, handler4);
    bus.on(events.TEST1, handler5);

    bus.off(events.TEST1, handler1);
    bus.emit(events.TEST1);
    bus.off(events.TEST1, handler2);
    bus.off(events.TEST1, handler3);
    bus.off(events.TEST1, handler4);
    bus.off(events.TEST1, handler5);
    bus.emit(events.TEST1);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(1);
    expect(handler4).toHaveBeenCalledTimes(1);
    expect(handler5).toHaveBeenCalledTimes(1);
  });

  it("Works when a handler is registered with multiple events", () => {
    const handler1 = jest.fn();

    bus.on(events.TEST1, handler1);
    bus.on(events.TEST2, handler1);
    bus.on(events.TEST3, handler1);

    bus.off(events.TEST1, handler1);
    bus.emit(events.TEST1);
    bus.emit(events.TEST2);
    bus.emit(events.TEST3);

    expect(handler1).toHaveBeenCalledTimes(2);
  });

  it("Calls the function only once when using `once`", () => {
    const handler = jest.fn();

    bus.once(events.TEST1, handler);
    bus.emit(events.TEST1);

    expect(handler).toHaveBeenCalledTimes(1);

    bus.emit(events.TEST1);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
