export interface IEventEmitter {
    hasListener(type: string): boolean;
    addListener(type: string, listener: ListenerFunction): boolean;
    removeListener(type: string): boolean;
    emit(event: Event): boolean;
}

type ListenerFunction = (event: Event) => void;

export interface IListener {
    type: string;
    listener: ListenerFunction;
}

export class Event {
    private _type: string;
    private _sender: IEventEmitter;

    constructor(type: string, sender: IEventEmitter) {
        this._type = type;
        this._sender = sender;
    }

    get type() {
        return this._type;
    }

    get sender() {
        return this._sender;
    }
}

export class EventEmitter implements IEventEmitter {
    protected _listeners: IListener[];

    constructor() {
        this._listeners = [];
    }

    hasListener(type: string): boolean {
        for (let item of this._listeners) {
            if (item.type === type) {
                return true;
            }
        }
        return false;
    }

    addListener(type: string, listener: ListenerFunction): boolean {
        if (!this.hasListener(type)) {
            this._listeners.push({ type, listener });
            return true;
        }
        return false;
    }

    removeListener(type: string): boolean {
        if (this.hasListener(type)) {
            for (let i: number = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === type) {
                    this._listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    emit(event: Event): boolean {
        if (this.hasListener(event.type)) {
            for (let i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === event.type) {
                    this._listeners[i].listener(event);
                }
            }
        }
        return false;
    }
}