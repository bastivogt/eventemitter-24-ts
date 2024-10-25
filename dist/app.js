import { Counter, Counter2, CounterEvent, CounterEvent2 } from "./counter.js";
console.log("APP");
const c = new Counter();
c.addListener(CounterEvent.COUNTER_STARTED, (event) => {
    const sender = event.sender;
    console.log(event.type, sender.count);
});
c.addListener(CounterEvent.COUNTER_CHANGED, (event) => {
    const sender = event.sender;
    console.log(event.type, sender.count);
});
c.addListener(CounterEvent.COUNTER_FINISHED, (event) => {
    const sender = event.sender;
    console.log(event.type, sender.count);
});
//c.removeListener(CounterEvent.COUNTER_CHANGED);
c.run();
console.log("---------------------------------");
const c2 = new Counter2(100, 200, 10);
c2.addListener(CounterEvent2.COUNTER_STARTED, (event) => {
    const counterEvent = event;
    console.log(counterEvent.type, counterEvent.count);
});
c2.addListener(CounterEvent2.COUNTER_CHANGED, (event) => {
    const counterEvent = event;
    console.log(counterEvent.type, counterEvent.count);
});
c2.addListener(CounterEvent2.COUNTER_FINISHED, (event) => {
    const counterEvent = event;
    console.log(counterEvent.type, counterEvent.count);
});
//c2.removeListener(CounterEvent.COUNTER_CHANGED);
c2.run();
