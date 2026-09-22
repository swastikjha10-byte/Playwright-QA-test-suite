import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('updates the cart badge after two products are added', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addFirstProducts(2);

    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test('sorts products with the lowest price first', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortByPriceLowToHigh();
    const prices = await productsPage.prices();

    expect(prices[0]).toBe(Math.min(...prices));
  });
});
