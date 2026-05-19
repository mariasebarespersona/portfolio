import { chromium, devices } from '@playwright/test';
const browser = await chromium.launch();

// Desktop — scrub test: find avatar card, move cursor left vs right
const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const dp = await d.newPage();
await dp.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
await dp.waitForTimeout(2000);
// avatar container is the cursor-crosshair div
const box = await dp.locator('.cursor-crosshair').boundingBox();
console.log('avatarBox', JSON.stringify(box));
if (box) {
  // move to far left, let easing settle, screenshot
  await dp.mouse.move(box.x + box.width * 0.08, box.y + box.height / 2, { steps: 10 });
  await dp.waitForTimeout(900);
  await dp.screenshot({ path: '/tmp/scrub_left.png', clip: box });
  // move to far right
  await dp.mouse.move(box.x + box.width * 0.92, box.y + box.height / 2, { steps: 20 });
  await dp.waitForTimeout(900);
  await dp.screenshot({ path: '/tmp/scrub_right.png', clip: box });
  // middle
  await dp.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2, { steps: 20 });
  await dp.waitForTimeout(900);
  await dp.screenshot({ path: '/tmp/scrub_mid.png', clip: box });
}
await d.close();

// Mobile compact banner
const m = await browser.newContext({ ...devices['iPhone 13'] });
const mp = await m.newPage();
await mp.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
await mp.waitForTimeout(1800);
await mp.screenshot({ path: '/tmp/mob.png', fullPage: true });
await browser.close();
console.log('done');
