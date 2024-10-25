import { EventEmitter, Event } from "./sevo/events.js";
export class CounterEvent extends Event {
}
CounterEvent.COUNTER_STARTED = "onCounterStarted";
CounterEvent.COUNTER_CHANGED = "onCounterChanged";
CounterEvent.COUNTER_FINISHED = "onCounterFinished";
export class Counter extends EventEmitter {
    constructor(start = 0, stop = 10, step = 1) {
        super();
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
    }
    run() {
        //console.log("START");
        this.emit(new CounterEvent(CounterEvent.COUNTER_STARTED, this));
        for (; this._count < this._stop; this._count += this._step) {
            //console.log(this._count, "CHANGE");
            this.emit(new CounterEvent(CounterEvent.COUNTER_CHANGED, this));
        }
        //console.log("FINISH");
        this.emit(new CounterEvent(CounterEvent.COUNTER_FINISHED, this));
    }
    get count() {
        return this._count;
    }
}
