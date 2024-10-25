import { Counter, Counter2, CounterEvent } from "./counter.js";

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

console.log("---------------------------------");

const c2 = new Counter2(10, 20, 1);

c2.addListener(CounterEvent.COUNTER_STARTED, (event: CounterEvent) => {
    const sender = event.sender as Counter2;
    console.log(CounterEvent.COUNTER_STARTED, sender.count);
});

c2.addListener(CounterEvent.COUNTER_CHANGED, (event: CounterEvent) => {
    const sender = event.sender as Counter2;
    console.log(CounterEvent.COUNTER_STARTED, sender.count);
});

c2.addListener(CounterEvent.COUNTER_FINISHED, (event: CounterEvent) => {
    const sender = event.sender as Counter2;
    console.log(CounterEvent.COUNTER_STARTED, sender.count);
});

c2.removeListener(CounterEvent.COUNTER_CHANGED);

c2.run();
