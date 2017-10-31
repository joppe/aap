import {trigger} from 'src/observer/trigger';
import {IHash, watch} from 'src/observer/watch';

/**
 * Test the trigger
 */
describe('The trigger', (): void => {
    it('Should listen to changes in observables', (): void => {
        const person: IHash = watch({
            firstName: 'joppe',
            lastName: 'aarts',
            age: 12
        });
        let count: number = 0;

        trigger((): string => {
            const out: string = `My name is ${person.firstName} ${person.lastName}`;

            count += 1;

            return out;
        });

        expect(count).toBe(1);
        person.firstName = 'Joppe';
        expect(count).toBe(2);
        person.lastName = 'Aarts';
        expect(count).toBe(3);
        person.age = 43;
        expect(count).toBe(3);
    });
});
