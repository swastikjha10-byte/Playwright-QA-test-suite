import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortSelect: Locator;
  readonly productPrices: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async addFirstProducts(count: number): Promise<void> {
    const buttons = this.page.locator('[data-test^="add-to-cart-"]');

    for (let index = 0; index < count; index += 1) {
      await buttons.nth(index).click();
    }
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortSelect.selectOption('lohi');
  }

  async prices(): Promise<number[]> {
    const values = await this.productPrices.allTextContents();
    return values.map((value) => Number(value.replace('$', '')));
  }
}
