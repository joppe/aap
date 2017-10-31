import {Observable} from 'src/observer/Observable';

/**
 * @interface IWatchable
 */
export interface IWatchable {
    /**
     * @type {string}
     */
    identifier: string;

    /**
     * @type {string}
     */
    key: string;
}

/**
 * @interface IWatchableRegistry
 */
export interface IWatchableRegistry {
    [id: string]: IWatchable;
}


/**
 * @interface IWatcher
 */
export interface IWatcher {
    /**
     * Register a key.
     *
     * @param {string} key
     * @returns {IWatchable}
     */
    register(key: string): IWatchable;

    /**
     * @param {IWatchable} watchable
     */
    invoke(watchable: IWatchable): void;

    /**
     * Trigger a change.
     *
     * @param {IWatchable} watchable
     */
    trigger(watchable: IWatchable): void;

    /**
     * @param {IWatchable} watchable
     * @param {Function} callback
     */
    listen(watchable: IWatchable, callback: Function): void;

    /**
     * @param {Function} callback
     * @returns {IWatchableRegistry}
     */
    capture(callback: Function): IWatchableRegistry;
}

/**
 * @type {IWatcher}
 */
export const watcher: IWatcher = ((): IWatcher => {
    const observable: Observable = new Observable();
    let count: number = 0;
    let invoked: IWatchableRegistry = {};

    return {
        /**
         * Register a key.
         *
         * @param {string} key
         * @returns {IWatchable}
         */
        register(key: string): IWatchable {
            count += 1;

            return {
                identifier: `observable-${count}-${key}`,
                key
            };
        },

        /**
         * @param {IWatchable} watchable
         */
        invoke(watchable: IWatchable): void {
            invoked[watchable.identifier] = watchable;
        },

        /**
         * Trigger a change.
         *
         * @param {IWatchable} watchable
         */
        trigger(watchable: IWatchable): void {
            observable.trigger(`change:${watchable.identifier}`);
        },

        /**
         * @param {IWatchable} watchable
         * @param {Function} callback
         */
        listen(watchable: IWatchable, callback: Function): void {
            observable.on(`change:${watchable.identifier}`, callback);
        },

        /**
         * @param {Function} callback
         * @returns {IWatchableRegistry}
         */
        capture(callback: Function): {[id: string]: IWatchable} {
            invoked = {};

            callback();

            return invoked;
        }
    };
})();
