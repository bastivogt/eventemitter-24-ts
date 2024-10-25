import { Counter, CounterEvent } from "./counter.js";

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
