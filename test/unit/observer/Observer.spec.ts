import {Observable} from 'src/observer/Observable';
import {Observer} from 'src/observer/Observer';

/**
 * Test the Observer
 */
describe('The observer', (): void => {
    let observer: Observer;
    let observable: Observable;

    beforeEach((): void => {
        observer = new Observer();
        observable = new Observable();
    });

    it('Should register a listener with "listenTo', (): void => {
        let count: number = 0;
        const increment: Function = (): void => {
            count += 1;
        };
        const decrement: Function = (): void => {
            count -= 1;
        };

        observer.listenTo(observable, 'inc', increment);
        observer.listenTo(observable, 'dec', decrement);

        expect(count).toBe(0);

        observable.trigger('inc');
        expect(count).toBe(1);

        observable.trigger('inc');
        observable.trigger('dec');
        observable.trigger('dec');
        expect(count).toBe(0);
    });

    it('Should unregister a specific listener with "stopListening"', (): void => {
        let count: number = 0;
        const increment1: Function = (): void => {
            count += 1;
        };
        const increment10: Function = (): void => {
            count += 10;
        };

        observer.listenTo(observable, 'inc', increment1);
        observer.listenTo(observable, 'inc', increment10);

        observable.trigger('inc');
        expect(count).toBe(11);

        observer.stopListening(observable, 'inc', increment10);
        observable.trigger('inc');
        expect(count).toBe(12);
    });

    it('Should unregister a specific event with "stopListening"', (): void => {
        let count: number = 0;
        const increment: Function = (): void => {
            count += 1;
        };
        const decrement: Function = (): void => {
            count -= 1;
        };

        observer.listenTo(observable, 'inc', increment);
        observer.listenTo(observable, 'dec', decrement);

        observable.trigger('inc');
        expect(count).toBe(1);

        observer.stopListening(observable, 'inc');
        observable.trigger('inc');
        expect(count).toBe(1);

        observable.trigger('dec');
        expect(count).toBe(0);
    });

    it('Should unregister all listeners with "stopListening"', (): void => {
        let count: number = 0;
        const increment: Function = (): void => {
            count += 1;
        };
        const decrement: Function = (): void => {
            count -= 1;
        };

        observer.listenTo(observable, 'inc', increment);
        observer.listenTo(observable, 'dec', decrement);

        observable.trigger('inc');
        observable.trigger('inc');
        observable.trigger('inc');
        expect(count).toBe(3);

        observer.stopListening();
        observable.trigger('inc');
        expect(count).toBe(3);

        observable.trigger('dec');
        expect(count).toBe(3);
    });
});
