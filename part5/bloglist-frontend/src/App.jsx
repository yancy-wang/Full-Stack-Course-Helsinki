import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotification('Logged in successfully');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setNotification('Wrong username or password');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setNotification('Successfully logged out');
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setNewBlog({ title: '', author: '', url: '' });
      setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setNotification(exception)
      setNotification('Failed to create a new blog');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog));
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                type="username"
                value={username}
                name="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                value={password}
                name="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Blog'}
          </button>
          {showForm && (
            <BlogForm
              handleSubmit={addBlog}
              handleInputChange={handleInputChange}
              newBlog={newBlog}
            />
          )}
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
