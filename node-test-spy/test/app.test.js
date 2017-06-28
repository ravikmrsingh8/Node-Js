const expect = require('expect');
const rewire = require('rewire');

var app = rewire('../app/src/app');

describe('SignUp Test', () => {
    var db = {saveUser: expect.createSpy()};
    app.__set__('db',db);

    it('Should call the db.saveUser', () =>{
        var email = 'xyz@gmail.com';
        var password = '123XYZ';
        app.handleSignUp(email,password);
        expect(db.saveUser).toHaveBeenCalledWith({email,password});
    });

    it('Should call spy correctly', () => {
        var spy = expect.createSpy();
        spy('Ravi',28);
        expect(spy).toHaveBeenCalled().toHaveBeenCalledWith('Ravi',28);
    });
});