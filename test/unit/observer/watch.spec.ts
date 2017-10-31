import {IHash, watch} from 'src/observer/watch';

/**
 * Test the watch
 */
describe('The watch', (): void => {
    it('Should create an observable', (): void => {
        const person: IHash = watch({
            firstName: 'joppe',
            lastName: 'aarts',
            age: 43
        });

        let fullName: string = `${person.firstName} ${person.lastName}`;

        expect(fullName).toBe('joppe aarts');

        person.firstName = 'Joppe';
        person.lastName = 'Aarts';
        fullName = `${person.firstName} ${person.lastName}`;

        expect(fullName).toBe('Joppe Aarts');
    });
});
