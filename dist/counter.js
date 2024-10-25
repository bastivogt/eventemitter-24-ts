import { EventEmitter, Event, } from "./sevo/events.js";
export class CounterEvent extends Event {
}
CounterEvent.COUNTER_STARTED = "onCounterStarted";
CounterEvent.COUNTER_CHANGED = "onCounterChanged";
CounterEvent.COUNTER_FINISHED = "onCounterFinished";
export class CounterEvent2 extends Event {
    constructor(type, sender, count) {
        super(type, sender);
        this._count = count;
    }
    get count() {
        return this._count;
    }
}
CounterEvent2.COUNTER_STARTED = "onCounterStarted";
CounterEvent2.COUNTER_CHANGED = "onCounterChanged";
CounterEvent2.COUNTER_FINISHED = "onCounterFinished";
export class Counter extends EventEmitter {
    constructor(start = 0, stop = 10, step = 1) {
        super();
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
    }
    run() {
        this.emit(new CounterEvent(CounterEvent.COUNTER_STARTED, this));
        for (; this._count < this._stop; this._count += this._step) {
            this.emit(new CounterEvent(CounterEvent.COUNTER_CHANGED, this));
        }
        this.emit(new CounterEvent(CounterEvent.COUNTER_FINISHED, this));
    }
    get count() {
        return this._count;
    }
}
export class Counter2 {
    constructor(start = 0, stop = 10, step = 1) {
        this._em = new EventEmitter();
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
    }
    hasListener(type) {
        return this._em.hasListener(type);
    }
    addListener(type, listener) {
        return this._em.addListener(type, listener);
    }
    removeListener(type) {
        return this._em.removeListener(type);
    }
    emit(event) {
        return this._em.emit(event);
    }
    run() {
        this.emit(new CounterEvent2(CounterEvent2.COUNTER_STARTED, this, this._count));
        for (; this._count < this._stop; this._count += this._step) {
            this.emit(new CounterEvent2(CounterEvent2.COUNTER_CHANGED, this, this._count));
        }
        this.emit(new CounterEvent2(CounterEvent2.COUNTER_FINISHED, this, this._count));
    }
    get count() {
        return this._count;
    }
}
