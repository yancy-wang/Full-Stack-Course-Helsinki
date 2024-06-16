const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
  });

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3004/api/testing/reset');
      await request.post('http://localhost:3004/api/users', {
        data: { username: 'testuser', name: 'Test User', password: 'password' }
      });

      await page.goto('http://localhost:5173');
    });

    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[name="username"]', 'testuser');
      await page.fill('input[name="password"]', 'password');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Test User logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[name="username"]', 'testuser');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Test User logged in')).not.toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173');
      await page.fill('input[name="username"]', 'testuser');
      await page.fill('input[name="password"]', 'password');
      await page.click('button[type="submit"]');
    });

    test('a new blog can be created', async ({ page }) => {
      await page.click('button[text="New Blog"]');
      await page.fill('input[name="title"]', 'Test Blog');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');
      await page.click('button[type="submit"]');
      await expect(page.locator('.blog')).toContainText('Test Blog');
    });

    test('a blog can be liked', async ({ page }) => {
      await page.click('button[text="view"]');
      await page.click('button[text="like"]');

      const likes = await page.locator('.blog-likes').textContent();
      expect(Number(likes)).toBe(1);
    });

    test('the user who added the blog can delete it', async ({ page }) => {
      await page.click('button[text="view"]');
      await page.click('button[text="remove"]');

      // Handle the confirmation dialog
      await page.on('dialog', dialog => dialog.accept());

      await expect(page.locator('.blog')).not.toContainText('Test Blog');
    });

    test('only the user who added the blog sees the delete button', async ({ page }) => {
      await page.click('button[text="view"]');
      await expect(page.locator('button[text="remove"]')).toBeVisible();

      // Logout and login as another user
      await page.click('button[text="Logout"]');
      await request.post('http://localhost:3004/api/users', {
        data: { username: 'otheruser', name: 'Other User', password: 'password' }
      });
      await page.fill('input[name="username"]', 'otheruser');
      await page.fill('input[name="password"]', 'password');
      await page.click('button[type="submit"]');
      await page.click('button[text="view"]');

      await expect(page.locator('button[text="remove"]')).not.toBeVisible();
    });

    test('blogs are ordered by likes', async ({ page }) => {
      await page.click('button[text="view"]');
      await page.click('button[text="like"]');
      await page.click('button[text="like"]');

      // Create another blog
      await page.click('button[text="New Blog"]');
      await page.fill('input[name="title"]', 'Another Blog');
      await page.fill('input[name="author"]', 'Another Author');
      await page.fill('input[name="url"]', 'http://anotherblog.com');
      await page.click('button[text="Create"]');
      await page.click('button[text="view"]');

      const blogs = await page.locator('.blog').allTextContents();
      expect(blogs[0]).toContain('Test Blog');
      expect(blogs[1]).toContain('Another Blog');
    });
  });
});
