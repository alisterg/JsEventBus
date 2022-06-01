# JsEventBus

A minimal event bus for you to implement the [pub/sub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern)
pattern with.

I have made it a class so you can create a new bus per use case.

- Zero dependencies
- Simple & easy to use

# How to use

Assuming we have the following...

```js
const salesEventBus = new EventBus();

function handler(eventData) {
  console.log("Received event: ", eventData);
}
```

## .on

```js
// Register the event
salesEventBus.on("MY_EVENT", handler);
```

You can register multiple handlers for a specific event. You can register a handler with multiple events.

## .emit

```js
// Emit the event (as many times as you want). `handler` is called each time the event is emitted.
salesEventBus.emit("MY_EVENT");
salesEventBus.emit("MY_EVENT");
```

As long as a handler is registered for an event, it will be called every time you emit the event.

## .off

```js
salesEventBus.off("MY_EVENT", handler);
// Handler will *not* be called again
salesEventBus.emit("MY_EVENT");
```

## .once

Use `EventBus.once` to call a handler only the first time the relevant event is emitted.

```js
// Register the event
salesEventBus.once("MY_EVENT", handler);
salesEventBus.emit("MY_EVENT");
// Handler will *not* be called again
salesEventBus.emit("MY_EVENT");
```
