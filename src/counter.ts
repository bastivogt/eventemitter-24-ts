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

export class CounterEvent2 extends Event {
    static COUNTER_STARTED = "onCounterStarted";
    static COUNTER_CHANGED = "onCounterChanged";
    static COUNTER_FINISHED = "onCounterFinished";

    private _count: number;

    constructor(type: string, sender: object, count: number) {
        super(type, sender);
        this._count = count;
    }

    get count() {
        return this._count;
    }
}

export class Counter extends EventEmitter<CounterEvent> {
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
    private _em: EventEmitter<CounterEvent2>;

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

    addListener(
        type: string,
        listener: (event: CounterEvent2) => void
    ): boolean {
        return this._em.addListener(type, listener);
    }

    removeListener(type: string): boolean {
        return this._em.removeListener(type);
    }

    emit(event: CounterEvent2): boolean {
        return this._em.emit(event);
    }

    run() {
        this.emit(
            new CounterEvent2(CounterEvent2.COUNTER_STARTED, this, this._count)
        );
        for (; this._count < this._stop; this._count += this._step) {
            this.emit(
                new CounterEvent2(
                    CounterEvent2.COUNTER_CHANGED,
                    this,
                    this._count
                )
            );
        }
        this.emit(
            new CounterEvent2(CounterEvent2.COUNTER_FINISHED, this, this._count)
        );
    }

    get count() {
        return this._count;
    }
}
