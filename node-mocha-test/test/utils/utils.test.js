const utils = require('../../app/utils/utils');
const expect = require('expect');

//Groups Test's together
describe('Math Utils', () => {
    it('Should add Two numbers', () => {
        var sum = utils.add(4, 5);
        expect(sum).toBe(9).toBeA('number');
    });

    describe('#async', () => {
        it('Should async add two numbers', (done) => {
            var sum = utils.asyncAdd(4, 5, (sum) => {
                expect(sum).toBe(9).toBeA('number');
                done();
            });
        });

        it('Should compute square using async function', (done) => {
            utils.asyncSquare(3, (res) => {
                expect(res).toBe(9).toBeA('number');
                done();
            });
        });
    });



    it('Should return square of a number', () => {
        var res = utils.square(4);
        expect(res).toBe(16).toBeA('number');
        // if(res !== 16) {
        //     throw  new Error('Expected:'+ 16 + ', Actual: '+ res);
        // }
    });
});


describe('Playground Tests', () => {
    it('Should set firstName and lastName', () => {
        var user = {location: 'CA', age: 25};
        user = utils.set(user, "Ravi Singh")
        //expect(user.firstName).toExist("firstName not set").toBeA('string');
        //expect(user.lastName).toExist("lastName not set").toBeA('string');
        expect(user).toInclude({
            firstName: 'Ravi',
            lastName: 'Singh'
        });
    });
});

