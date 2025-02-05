const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Milos Popovic',
        username: 'admin',
        password: 'admin'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    const form = page.locator('[data-testid="form"]');
    await expect(form).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('Milos Popovic logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('blog-title').fill('Test title');
      await page.getByTestId('blog-author').fill('Test author');
      await page.getByTestId('blog-url').fill('Test url');   
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByTestId('blog')).toContainText('Test title');
      await expect(page.getByTestId('blog')).toContainText('Test author');
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByTestId('blog')).toContainText('Test url');
    })
  })
})