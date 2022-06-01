const EventBus = require("./eventbus");

describe("EventBus class", function () {
  const events = {
    TEST_EVENT_1: "test",
    TEST_EVENT_2: "test2",
    TEST_EVENT_3: "test3",
  };

  let bus;

  beforeEach(() => {
    bus = new EventBus();
  });

  it("Calls the handler when an event is emitted", () => {
    const handler = jest.fn();
    bus.on(events.TEST_EVENT_1, handler);
    bus.emit(events.TEST_EVENT_1);

    expect(handler).toHaveBeenCalled();
  });

  it("Calls multiple handlers when multiple events are emitted", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const handler4 = jest.fn();
    const handler5 = jest.fn();

    bus.on(events.TEST_EVENT_1, handler1);
    bus.on(events.TEST_EVENT_2, handler2);
    bus.on(events.TEST_EVENT_3, handler3);
    bus.on(events.TEST_EVENT_3, handler4);
    bus.on(events.TEST_EVENT_3, handler5);

    bus.emit(events.TEST_EVENT_1);
    bus.emit(events.TEST_EVENT_2);
    bus.emit(events.TEST_EVENT_3);

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).toHaveBeenCalled();
    expect(handler4).toHaveBeenCalled();
    expect(handler5).toHaveBeenCalled();
  });

  it("Correctly de-registers event handlers", () => {
    const handler = jest.fn();

    bus.on(events.TEST_EVENT_1, handler);
    bus.off(events.TEST_EVENT_1, handler);
    bus.emit(events.TEST_EVENT_1);

    expect(handler).not.toHaveBeenCalled();
  });

  it("Correctly de-registers event handlers while calling multiple", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const handler4 = jest.fn();
    const handler5 = jest.fn();

    bus.on(events.TEST_EVENT_1, handler1);
    bus.on(events.TEST_EVENT_1, handler2);
    bus.on(events.TEST_EVENT_1, handler3);
    bus.on(events.TEST_EVENT_1, handler4);
    bus.on(events.TEST_EVENT_1, handler5);

    bus.off(events.TEST_EVENT_1, handler1);
    bus.emit(events.TEST_EVENT_1);
    bus.off(events.TEST_EVENT_1, handler2);
    bus.off(events.TEST_EVENT_1, handler3);
    bus.off(events.TEST_EVENT_1, handler4);
    bus.off(events.TEST_EVENT_1, handler5);
    bus.emit(events.TEST_EVENT_1);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(1);
    expect(handler4).toHaveBeenCalledTimes(1);
    expect(handler5).toHaveBeenCalledTimes(1);
  });
  
  it("Works when a handler is registered with multiple events", () => {
    const handler1 = jest.fn();

    bus.on(events.TEST_EVENT_1, handler1);
    bus.on(events.TEST_EVENT_2, handler1);
    bus.on(events.TEST_EVENT_3, handler1);

    bus.off(events.TEST_EVENT_1, handler1);
    bus.emit(events.TEST_EVENT_1);
    bus.emit(events.TEST_EVENT_2);
    bus.emit(events.TEST_EVENT_3);

    expect(handler1).toHaveBeenCalledTimes(2);
  })

  it("Calls the function only once when using `once`", () => {
    const handler = jest.fn();

    bus.once(events.TEST_EVENT_1, handler);
    bus.emit(events.TEST_EVENT_1);

    expect(handler).toHaveBeenCalledTimes(1);

    bus.emit(events.TEST_EVENT_1);

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
