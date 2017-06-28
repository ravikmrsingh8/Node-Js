const request = require('supertest');
const expect = require('expect');
const app = require('../../app/server/server').app;


describe('Express App Test', () => {

    describe('GET /', () => {
        it('Should include error page not found.!', (done) => {
            request(app).get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.'
                    });
                })
                .end(done);
        });

    });

    describe('GET /users', () => {
        it('Should include user Ravi', (done) => {
            request(app).get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'Ravi',
                        age: 29
                    });
                })
                .end(done);
        });
    });

});
