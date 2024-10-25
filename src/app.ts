import { Counter, Counter2, CounterEvent, CounterEvent2 } from "./counter.js";

console.log("APP");

const c = new Counter();

c.addListener(CounterEvent.COUNTER_STARTED, (event: CounterEvent) => {
    const sender = event.sender as Counter;
    console.log(event.type, sender.count);
});

c.addListener(CounterEvent.COUNTER_CHANGED, (event: CounterEvent) => {
    const sender = event.sender as Counter;
    console.log(event.type, sender.count);
});

c.addListener(CounterEvent.COUNTER_FINISHED, (event: CounterEvent) => {
    const sender = event.sender as Counter;
    console.log(event.type, sender.count);
});

//c.removeListener(CounterEvent.COUNTER_CHANGED);

c.run();

console.log(c.listeners);

console.log("---------------------------------");

const c2 = new Counter2(100, 200, 10);

c2.addListener(CounterEvent2.COUNTER_STARTED, (event: CounterEvent2) => {
    console.log(event.type, event.count);
});

c2.addListener(CounterEvent2.COUNTER_CHANGED, (event: CounterEvent2) => {
    console.log(event.type, event.count);
});

c2.addListener(CounterEvent2.COUNTER_FINISHED, (event: CounterEvent2) => {
    console.log(event.type, event.count);
});

//c2.removeListener(CounterEvent.COUNTER_CHANGED);

c2.run();

console.log(c2.listeners);
