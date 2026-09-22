import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test('standard user can complete checkout with two products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addFirstProducts(2);
  await productsPage.openCart();
  await checkoutPage.start();
  await checkoutPage.fillCustomerDetails('Taylor', 'Tester', '560001');
  await checkoutPage.finish();

  await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
});
