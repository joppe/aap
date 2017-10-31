/**
 * @interface IEvents
 */
interface IEvents {
    [eventName: string]: Function[];
}

/**
 * @type {RegExp}
 */
export const EVENT_SPLITTER: RegExp = /\s+/;

/**
 * @class Observable
 */
export class Observable {
    /**
     * @type {IEvents}
     * @private
     */
    private events: IEvents = {};

    /**
     * Add an event listener.
     * Multiple events can be given by splitting them with spaces.
     *
     * @param {string} event
     * @param {Function} listener
     * @returns {Observable}
     * @throws {Error}
     * @public
     */
    public on(event: string, listener: Function): Observable {
        if (this.has(event, listener)) {
            throw new Error(`There is already an listener for the event "${event}" with the exact same callback.`);
        }

        event.split(EVENT_SPLITTER).forEach((e: string): void => {
            if (!this.has(e)) {
                this.events[e] = [];
            }

            this.events[e].push(listener);
        });

        return this;
    }

    /**
     * Remove an event listener.
     *
     * @param {string} [event]
     * @param {Function} [listener]
     * @returns {Observable}
     * @public
     */
    public off(event?: string, listener?: Function): Observable {
        // If no event name is given, remove all event listeners.
        if (undefined === event) {
            this.events = {};

            return this;
        }

        // Stop if the event is not found.
        if (!this.has(event)) {
            return this;
        }

        // Remove all listeners for the given event.
        if (undefined === listener) {
            delete this.events[event];

            return this;
        }

        // Find the index of the listener and remove it.
        const index: number = this.events[event].indexOf(listener);

        if (-1 < index) {
            this.events[event].splice(index, 1);
        }

        return this;
    }

    /**
     * Trigger an event.
     *
     * @param {string} event
     * @returns {Observable}
     * @public
     */
    public trigger(event: string): Observable {
        if (!this.has(event)) {
            return this;
        }

        this.events[event].forEach((listener: Function): void => {
            listener(this);
        });

        return this;
    }

    /**
     * Check if an event exists.
     *
     * @param {string} event
     * @param {Function} listener
     * @returns {boolean}
     * @private
     */
    private has(event: string, listener?: Function): boolean {
        return (
            undefined !== this.events[event] &&
            (undefined === listener || -1 < this.events[event].indexOf(listener))
        );
    }
}
