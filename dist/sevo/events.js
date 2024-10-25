export class Event {
    constructor(type, sender) {
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
export class EventEmitter {
    constructor() {
        this._listeners = [];
    }
    hasListener(type) {
        for (let item of this._listeners) {
            if (item.type === type) {
                return true;
            }
        }
        return false;
    }
    addListener(type, listener) {
        if (!this.hasListener(type)) {
            this._listeners.push({ type, listener });
            return true;
        }
        return false;
    }
    removeListener(type) {
        if (this.hasListener(type)) {
            for (let i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i].type === type) {
                    this._listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
    emit(event) {
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
