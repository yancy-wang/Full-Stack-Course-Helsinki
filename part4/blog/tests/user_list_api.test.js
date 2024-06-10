const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

const User = require('../models/user');

beforeEach(async () => {
	await User.deleteMany({});
	const userObjs = helper.initialUsers.map((user) => new User(user));
	const promiseArray = userObjs.map((user) => user.save());
	await Promise.all(promiseArray);
});

test('get all users', async () => {
	const response = await api.get('/api/users');
	expect(response.body).toHaveLength(helper.initialUsers.length);
});

test('creation fails with proper statuscode and message if username already taken', async () => {
	const usersAtStart = await helper.usersInDb();

	const newUser = {
		username: 'root',
		name: 'Superuser',
		password: 'salainen',
	};

	const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/);

	expect(result.body.error).toContain('expected `username` to be unique');

	const usersAtEnd = await helper.usersInDb();
	expect(usersAtEnd).toEqual(usersAtStart);
});

test('creation fails while validation fails', async () => {
	const newUser = {
		username: 'root',
		name: 'Superuser',
		password: 'AB',
	};

	const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/);

	expect(result.body.error).toContain('content missing');
});

afterAll(async () => {
	await mongoose.connection.close();
});
