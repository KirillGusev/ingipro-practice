'use strict';

class Mediator {
    constructor() {
        this._listeners = {};
    }

    on(type, listener) {
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }

        if ( this._listeners[type].includes(listener) ) {
            return;
        }

        this._listeners[type].push(listener);
    }

    off(type, listener) {
        if (this._listeners[type]) {
            for (let i = 0; i < this._listeners[type].length; i++) {
                if(this._listeners[type][i] === listener) {
                    this._listeners[type].splice(i, 1);
                    return;
                }
            }
        }
    }

    emit(type, data) {
        let sliceChar = type.slice( 0, type.indexOf(':') ) + ':*';

        if ( this._listeners[sliceChar] ) {
            this._listeners[sliceChar].forEach( listener => listener.call(null, data, type) );
        }

        if (this._listeners['*']) {
            this._listeners['*'].forEach( listener => listener.call(null, data, type) );
        }

        if (this._listeners[type]) {
            this._listeners[type].forEach( listener => listener.call(null, data, type) );
        }
    }
}

export default new Mediator();
