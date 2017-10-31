import {IWatchable, watcher} from 'src/observer/watcher';

/**
 * @type {Property}
 */
export type Property = number|string|boolean;

/**
 * @interface IHash
 */
export interface IHash {
    [property: string]: Property;
}

/**
 * @param {IHash} target
 * @returns {IHash}
 */
export const watch: <T extends IHash>(target: T) => T = <T extends IHash>(target: T): T => {
    // Create getters and setters for each property
    Object.keys(target).forEach((key: string): void => {
        const watchable: IWatchable = watcher.register(key);
        let value: Property = target[key];

        delete target[key];

        Object.defineProperty(target, key, {
            // tslint:disable-next-line:no-reserved-keywords
            get(): Property {
                watcher.invoke(watchable);

                return value;
            },

            // tslint:disable-next-line:no-reserved-keywords
            set(newValue: Property): void {
                const trigger: boolean = value !== newValue;

                value = newValue;

                if (trigger) {
                    watcher.trigger(watchable);
                }
            }
        });
    });

    return target;
};
