const playwright = require('playwright-core');
const expect = require('chai').expect;
let page, browser, context;

const helloWorldFilePath = './tests/docs/hello_world.txt';

it('should drag and drop a single file', async () => {
  browser = await playwright['chromium'].launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto('https://the-internet.herokuapp.com/upload');

  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(helloWorldFilePath);
  });

  await page.click('#drag-drop-upload');

  await page.close();
  await context.close();
  await browser.close();
});
