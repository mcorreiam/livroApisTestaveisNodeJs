const User = require("../../../src/models/user");

describe('Routes: Users', () => {

    let request;
    let app;

    before(async () => {
        app = await setupApp();
        request = supertest(app);
    })

    after(async () => await app.database.connection.close());

    const defaultId = '56cb91bdc3464f14678934ca';
    
    const defaultAdmin = {
        name: 'Jhon Doe',
        email: 'jhon@mail.com',
        password: '123password',
        role: 'admin'
    };

    const expectedAdminUser = {
        _id: defaultId,
        name: 'Jhon Doe',
        email: 'jhon@mail.com',
        role: 'admin'
    };

    beforeEach(async() => {
        const user = new User(defaultAdmin);
        user._id = '56cb91bdc3464f14678934ca';
        await User.deleteMany();
        await user.save();
    })

    afterEach(async() => {
        await User.deleteMany()
    })
    
    describe('GET /user', () => {
        it('should return a list of users', done => {
            
            request.get('/users')
            .end((err, res) => {
                expect(res.body).to.eql([expectedAdminUser]);
                done(err);
            })
        })

        context('when an id is specified', done => { 
            it('should return 200 with one user', done => {
                request 
                .get(`/users/${defaultId}`) 
                .end((err, res) => {
                    expect(res.statusCode).to.eql(200); 
                    expect(res.body).to.eql([expectedAdminUser]);
                    done(err);
                });
            });
        });
    });

    describe('POST /users', () => {
        context('when posting a user', () => {
            it('should return a new user with status code 201', done => {
               const customId = '56cb91bdc3464f14678934ba';
               const newUser = Object.assign({},{_id: customId, __v:0}, defaultAdmin);
               const expectedSaveUser = {
                   _id: customId,
                   name: 'Jhon Doe',
                   email: 'jhon@mail.com',
                   role:'admin'
                };

               request
                .post('/users')
                .send(newUser)
                .end((err, res) => {
                    expect(res.statusCode).to.eql(201);
                    expect(res.body).to.eql(expectedSaveUser);
                    done(err);
                });
            });
        });
    });

    describe('PUT /users/:id', () => {
        context('when editing a user', () => {
            it('shold update the user and return 200 as status code', done => {
                const customUser = {
                    name: 'Din name'
                };
                const updatedUser = Object.assign({}, defaultAdmin, customUser);

                request
                    .put(`/users/${defaultId}`)
                    .send(updatedUser)
                    .end((err, res) => {
                        expect(res.status).to.eql(200);
                        done(err);
                    });
            })
        });
    });

    describe('DELETE /users/:id', () => {
        context('when deleting a user', () => {
            it('shold delete a user and return 204 as status code', done => {                
                request
                    .delete(`/users/${defaultId}`)
                    .end((err, res) => {
                        expect(res.status).to.eql(204);
                        done(err);
                    });
            })
        });
    });
})