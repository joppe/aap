import {Observable} from 'src/observer/Observable';

/**
 * Test the Observable.
 */
describe('The observable', (): void => {
    let o: Observable;

    beforeEach((): void => {
        o = new Observable();
    });

    it('Should notify listener when an event is triggered', (): void => {
        let count: number = 0;

        o.on('change', (): void => {
            count += 1;
        });

        expect(count).toBe(0);

        o.trigger('change');
        expect(count).toBe(1);

        o.trigger('change');
        expect(count).toBe(2);
    });

    it('Should be able to unregister a single listener', (): void => {
        let count1: number = 0;
        let count2: number = 0;

        const listener1: Function = (): void => {
            count1 += 1;
        };

        const listener2: Function = (): void => {
            count2 += 1;
        };

        o.on('change', listener1);
        o.on('change', listener2);

        expect(count1).toBe(0);
        expect(count2).toBe(0);

        o.trigger('change');
        expect(count1).toBe(1);
        expect(count2).toBe(1);

        o.off('change', listener1);

        o.trigger('change');
        expect(count1).toBe(1);
        expect(count2).toBe(2);
    });

    it('Should be able to unregister all listeners to a specific event', (): void => {
        let count1: number = 0;
        let count2: number = 0;

        const listener1: Function = (): void => {
            count1 += 1;
        };

        const listener2: Function = (): void => {
            count2 += 1;
        };

        o.on('change', listener1);
        o.on('change', listener2);

        expect(count1).toBe(0);
        expect(count2).toBe(0);

        o.trigger('change');
        expect(count1).toBe(1);
        expect(count2).toBe(1);

        o.off('change');

        o.trigger('change');
        expect(count1).toBe(1);
        expect(count2).toBe(1);
    });

    it('Should not be possible to register the same listener twice to the same event', (): void => {
        let count: number = 1;
        const listener: Function = (): void => {
            count += 1;
        };

        o.on('test', listener);

        expect((): void => {
            o.on('test', listener);
        }).toThrow();
    });
});
