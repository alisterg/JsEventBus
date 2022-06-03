# TsBus

A minimal event bus for you to implement the [pub/sub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern)
pattern with.

I have made it a class so you can create a new bus per use case.

- Zero dependencies
- Simple & easy to use
- Feature complete

# How to use

```ts
const salesEventBus = new TsBus();

function handler(eventData) {
  console.log("Received event: ", eventData);
}
```

## .on

**Register** event handlers with `.on`. You can register multiple handlers for a specific event.
You can register a handler with multiple events.

```ts
salesEventBus.on("MY_EVENT", handler);
```

## .emit

**Emit** events with `.emit`. Each handler function registered with the event name is called.

```ts
// Emit the event (as many times as you want). `handler` is called each time the event is emitted.
salesEventBus.emit("MY_EVENT");
salesEventBus.emit("MY_EVENT");
```

## .off

**De-register** event handlers with `.off`. Handlers that are currently running will not be terminated.

```ts
salesEventBus.off("MY_EVENT", handler);
// Handler will *not* be called again
salesEventBus.emit("MY_EVENT");
```

## .once

Use `.once` to call a handler only the first time the relevant event is emitted.

```ts
// Register the event
salesEventBus.once("MY_EVENT", handler);
salesEventBus.emit("MY_EVENT");
// Handler will *not* be called again
salesEventBus.emit("MY_EVENT");
```
