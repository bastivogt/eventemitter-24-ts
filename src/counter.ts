import {
    EventEmitter,
    Event,
    IListener,
    IEventEmitter,
} from "./sevo/events.js";

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

export class Counter2 implements IEventEmitter {
    private _em: EventEmitter;

    private _start: number;
    private _stop: number;
    private _step: number;
    private _count: number;

    constructor(start: number = 0, stop: number = 10, step: number = 1) {
        this._em = new EventEmitter();

        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
    }

    hasListener(type: string): boolean {
        return this._em.hasListener(type);
    }

    addListener(type: string, listener: (event: Event) => void): boolean {
        return this._em.addListener(type, listener);
    }

    removeListener(type: string): boolean {
        return this._em.removeListener(type);
    }

    emit(event: Event): boolean {
        return this._em.emit(event);
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
