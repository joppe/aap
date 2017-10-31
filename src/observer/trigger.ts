import {IWatchable, IWatchableRegistry, watcher} from 'src/observer/watcher';

/**
 * Trigger a callback when a change in one of the observed values occurs that is used in the callback.
 *
 * @param {Function} callback
 */
export const trigger: (callback: Function) => void = (callback: Function): void => {
    const invoked: IWatchableRegistry = watcher.capture(callback);

    Object.keys(invoked).forEach((key: string) => {
        const watchable: IWatchable = invoked[key];

        watcher.listen(watchable, callback);
    });
};
