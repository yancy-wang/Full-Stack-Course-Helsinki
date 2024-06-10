const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
		__v: 0,
	},
];

const blogs = [
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Robert C. Martin',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Robert C. Martin',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
	},
	{
		title: 'Canonical string reduction',
		author: 'Robert C. Martin',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 12,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
	},
];

test('dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});
});

describe('the most liked blog', () => {
	test('the blog with the most likes', () => {
		const result = listHelper.mostLikes(blogs);
		expect(result).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		});
	});
});

describe('the author with the most blogs', () => {
	test('the author with most blogs', () => {
		const result = listHelper.authorWithMostBlogs(blogs);
		expect(result).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});
});

describe('the author with the most likes', () => {
	test('the author with most blogs', () => {
		const result = listHelper.authorWithMostLikes(blogs);
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});
});
