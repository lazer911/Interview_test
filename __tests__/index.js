const Assessment = require("../index")
//test Assessment

describe('Dev Assessment', () => {
    describe('problem 0 (example)', () => {
        test('should return hello wrold', () => {
            expect(Assessment.example()).toEqual('hello world');
        });
    });

    describe('problem 1 (stripPrivateProperties)', () => {
        test('should strip private properties', () => {
            expect(Assessment.stripPrivateProperties(
                ['password', 'token'],
                [
                    {
                        name: 'stan',
                        email: 'stan@smith.test',
                        password: 'secret',
                        token: '123',
                    },
                    {
                        name: 'fran',
                        email: 'sran@smith.test',
                        password: 'secret',
                        token: '123',
                    },
                ],
            )).toEqual([
                {
                    name: 'stan',
                    email: 'stan@smith.test',
                },
                {
                    name: 'fran',
                    email: 'sran@smith.test',
                },
            ]);
        });
    });

    describe('problem 2 (excludeByProperty)', () => {
        test('should only include objects that do not have a given property', () => {
            expect(Assessment.excludeByProperty('deleted', [
                { name: 'stan' },
                { name: 'fran' },
                { name: 'peter', deleted: true },
                { name: 'steve' },
                { name: 'hayley' },
            ])).toEqual([{ name: 'stan' }, { name: 'fran' }, { name: 'steve' }, { name: 'hayley' }]);
        });
    });

    /**
     * fixed depth, solution does not require deeper sums
     */
    describe('problem 3 (sumDeep)', () => {
        test('should calculate the total of `val` from `objects`', () => {
            expect(Assessment.sumDeep([
                {
                    objects: [{ val: 2 }, { val: 1 }, { val: 1 }],
                },
                {
                    objects: [{ val: 1 }, { val: 0 }, { val: 4 }],
                },
            ])).toEqual([{ objects: 4 }, { objects: 5 }]);
        });
    });

    // todo: describe: can't use if or switch
    describe('problem 4 (applyStatusColor)', () => {
        test('should add the correct color to each status', () => {
            expect(Assessment.applyStatusColor(
                {
                    red: [404, 400],
                    green: [200, 201],
                },
                [
                    {
                        status: 404,
                    },
                    {
                        status: 200,
                    },
                    {
                        status: 404,
                    },
                    {
                        status: 201,
                    },
                    {
                        status: 400,
                    },
                    {
                        status: 408,
                    },
                ],
            )).toEqual([
                {
                    status: 404,
                    color: 'red',
                },
                {
                    status: 200,
                    color: 'green',
                },
                {
                    status: 404,
                    color: 'red',
                },
                {
                    status: 201,
                    color: 'green',
                },
                {
                    status: 400,
                    color: 'red',
                },
            ]);
        });
    });

    describe('problem 5 (createGreeting)', () => {
        test('should create a function that makes it easy to greet people', () => {
            const greet = (greeting, name) => `${greeting} ${name}`;
            const sayHelloTo = Assessment.createGreeting(greet, 'hello');
            const sayGoodByeTo = Assessment.createGreeting(greet, 'good bye');

            expect(sayHelloTo('stan')).toEqual('hello stan');
            expect(sayGoodByeTo('fran')).toEqual('good bye fran');
        });
    });

    describe('problem 6 (setDefaults)', () => {
        test('should ensure that a user always has default props', () => {
            const applyDefaults = Assessment.setDefaults({ subscribed: true });

            expect(applyDefaults({
                name: 'stan',
                subscribed: false,
            })).toEqual({
                name: 'stan',
                subscribed: false,
            });

            expect(applyDefaults({
                name: 'fran',
            })).toEqual({
                name: 'fran',
                subscribed: true,
            });
        });
    });

    describe('problem 7 (fetchUserByNameAndUsersCompany)', () => {
        const {
            services, companies, status, users,
        } = require('./__helpers__/p7');

        test('should asynchronously fetch a user, users company and status', () =>
            Assessment.fetchUserByNameAndUsersCompany('stan', services).then(result =>
                expect(result).toEqual({
                    company: companies[2],
                    status,
                    user: users[1],
                })));
    });
});
