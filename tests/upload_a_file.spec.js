const playwright = require('playwright-core');
const expect = require('chai').expect;
let page, browser, context;

const helloWorldFilePath = './tests/docs/hello_world.txt';

describe('Files upload', () => {
  beforeEach('should load test page', async () => {
    browser = await playwright['chromium'].launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto('https://the-internet.herokuapp.com/upload');
  });

  it('should drag and drop a single file', async () => {
    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(helloWorldFilePath);
    });
    await page.click('#drag-drop-upload');
  });

  afterEach('should close everything', async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
