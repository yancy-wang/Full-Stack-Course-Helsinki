const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const initialBlogs = [
	{
	  title: "React patterns",
	  author: "Michael Chan",
	  url: "https://reactpatterns.com/",
	  likes: 7
	},
	{
	  title: "Go To Statement Considered Harmful",
	  author: "Edsger W. Dijkstra",
	  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
	  likes: 5
	}
  ];

const initialUsers = [
	{
		username: 'mluukkai',
		name: 'Matti Luukkainen',
		password: 'asd14sag',
	},
	{
		username: 'hellas',
		name: 'Arto Hellas',
		password: 'D341asf2',
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

const getToken = async (username) => {
	const user = await User.findOne({ username });

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: 60 * 60,
	});

	return 'Bearer: ' + token;
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, getToken };
