/**
 * @class Observer
 */
import {Observable} from 'src/observer/Observable';

/**
 * @interface IListener
 */
export interface IListener {
    /**
     * @type {Observable}
     */
    observable: Observable;

    /**
     * @type {string}
     */
    event: string;

    /**
     * @type {Function}
     */
    callback: Function;
}

/**
 * @class Observer
 */
export class Observer {
    /**
     * @type {IListener[]}
     * @private
     */
    private listeners: IListener[] = [];

    /**
     * @param {Observable} observable
     * @param {string} event
     * @param {Function} callback
     * @returns {Observer}
     */
    public listenTo(observable: Observable, event: string, callback: Function): Observer {
        this.listeners.push({
            observable,
            event,
            callback
        });

        observable.on(event, callback);

        return this;
    }

    /**
     * @param {Observable} [observable]
     * @param {string} [event]
     * @param {Function} [callback]
     * @returns {Observer}
     */
    public stopListening(observable?: Observable, event?: string, callback?: Function): Observer {
        this.listeners = this.listeners.filter((listener: IListener): boolean => {
            if (
                undefined === observable ||
                (listener.observable === observable && undefined === event) ||
                (listener.observable === observable && listener.event === event && undefined === callback) ||
                (listener.observable === observable && listener.event === event && listener.callback === callback)
            ) {
                listener.observable.off(
                    listener.event,
                    listener.callback
                );

                return false;
            }

            return true;
        });

        return this;
    }
}
