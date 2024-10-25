import { EventEmitter, Event } from "./sevo/events.js";

export class CounterEvent extends Event {
    static COUNTER_STARTED = "onCounterStarted";
    static COUNTER_CHANGED = "onCounterChanged";
    static COUNTER_FINISHED = "onCounterFinished";
}

export class Counter extends EventEmitter {
    private _start: number;
    private _stop: number;
    private _step: number;
    private _count: number;

    constructor(start: number = 0, stop: number = 10, step: number = 1) {
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
