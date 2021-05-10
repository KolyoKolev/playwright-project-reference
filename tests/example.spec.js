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

  it('should login sucessfully in saucedemo page', async () => {
    expect(await page.url()).to.equal(
      'https://www.saucedemo.com/inventory.html'
    );
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
});
