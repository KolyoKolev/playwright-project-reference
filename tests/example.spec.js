const playwright = require('playwright-core');
const expect = require('chai').expect;
let page, browser, context;

const SAUCE_LOGIN = async () => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
};

describe('Example spec using chrome and playwright', () => {
  beforeEach(async () => {
    browser = await playwright['chromium'].launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await SAUCE_LOGIN();
  });

  afterEach(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });

  it('should login sucessfully in saucedemo inventory page', async () => {
    expect(await page.url()).to.eq('https://www.saucedemo.com/inventory.html');
  });

  it('should verify the number of inventory items', async () => {
    const inventoryItemsList = await page.$$('.inventory_item');
    expect(inventoryItemsList).to.have.length(6);
  });

  it('should verify the first inventory item title after sucessful login', async () => {
    const inventoryItemsName = await page.$$('.inventory_item_name');
    expect(await inventoryItemsName[0].textContent()).to.eq(
      'Sauce Labs Backpack'
    );
  });

  it('should verify added item to the cart', async () => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = await page.$('.shopping_cart_badge');
    expect(await cartBadge.textContent()).to.eq('1');
    await page.click('.shopping_cart_link');
    expect(await page.$$('.cart_item')).to.have.length(1);
    const inventoryItemName = await page.$('.inventory_item_name');
    expect(await inventoryItemName.textContent()).to.eq('Sauce Labs Backpack');
  });
});
