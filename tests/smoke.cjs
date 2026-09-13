// Run with PLAYWRIGHT_MODULE set to a Playwright package path if not installed locally.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({ headless: true });
 const page = await browser.newPage({ viewport: { width: 1440, height: 1060 } });
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
 const base = process.env.TEST_URL || 'http://127.0.0.1:4173';
 await page.goto(base);
 const aminos = await page.evaluate(() => window.AMINOS);
 assert.equal(aminos.length, 21);
 assert.equal(new Set(aminos.map(a=>a.one)).size, 21);
 assert.equal(new Set(aminos.map(a=>a.three)).size, 21);
 assert.equal(await page.locator('.prompt h2').textContent(), '甘胺酸');
 // Draw, undo, redo, resize: the ink must survive a viewport change.
 const box = await page.locator('#draw').boundingBox();
 await page.mouse.move(box.x+35,box.y+35);await page.mouse.down();await page.mouse.move(box.x+95,box.y+75,{steps:8});await page.mouse.up();
 assert.equal(await page.locator('.canvas-placeholder').isVisible(),false);
 await page.click('#undo');assert.equal(await page.locator('.canvas-placeholder').isVisible(),true);
 await page.click('#redo');assert.equal(await page.locator('.canvas-placeholder').isVisible(),false);
 await page.setViewportSize({width:390,height:844});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.equal(await page.locator('.canvas-placeholder').isVisible(),false);
 await page.fill('#full-name','  GLYCINE  ');await page.fill('#three-code','gLY');await page.fill('#one-code','g');
 await page.click('#paper');assert.equal(await page.inputValue('#full-name'),'  GLYCINE  ');
 await page.click('#paper');assert.equal(await page.locator('.canvas-placeholder').isVisible(),false);
 await page.click('#reveal');assert.equal(await page.locator('#answer-area .correct').count(),3);
 assert.equal(await page.locator('#next').isDisabled(),true);
 await page.click('[data-grade="2"]');await page.click('#next');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('amino-lab-v1')).G.lastScore),5);
 // Wrong answers create a review item, and a perfect retry removes it.
 await page.click('#reveal');await page.click('[data-grade="0"]');await page.click('#next');
 assert.equal(await page.locator('#mistake-count').textContent(),'1');
 await page.click('[data-view="mistakes"]');
 const wrongZh = await page.locator('.prompt h2').textContent();
 const wrong = aminos.find(a=>a.zh===wrongZh);
 await page.fill('#full-name',wrong.name);await page.fill('#three-code',wrong.three);await page.fill('#one-code',wrong.one);
 await page.click('#reveal');await page.click('[data-grade="2"]');await page.click('#next');
 assert.equal(await page.locator('#mistake-count').textContent(),'0');
 assert.match(await page.locator('main').textContent(),/目前沒有錯題/);
 await page.reload();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('amino-lab-v1')).G.attempts),1);
 // Library grouping, search, and all structure assets.
 await page.click('[data-view="library"]');await page.check('#bonus-toggle');
 assert.equal(await page.locator('.amino-card').count(),21);
 await page.locator('.amino-card img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
 assert.equal(await page.locator('.amino-card img').evaluateAll(imgs=>imgs.every(i=>i.naturalWidth>0)),true);
 assert.equal(await page.locator('.amino-card img').evaluateAll(imgs=>imgs.every(i=>i.getAttribute('src').includes('.svg'))),true);
 await page.click('[data-structure="W"]');assert.equal(await page.locator('#structure-modal').isVisible(),true);
 assert.match(await page.locator('#structure-title').textContent(),/Tryptophan/);
 assert.equal(await page.evaluate(()=>document.querySelector('#structure-modal').scrollWidth<=document.querySelector('#structure-modal').clientWidth),true);
 await page.screenshot({path:'tmp/vector-zoom-mobile.png',fullPage:false});
 await page.keyboard.press('Escape');assert.equal(await page.locator('#structure-modal').isVisible(),false);
 await page.selectOption('#group-filter','acidic');assert.equal(await page.locator('.amino-card').count(),2);
 await page.selectOption('#group-filter','all');await page.fill('#search','Sec');assert.equal(await page.locator('.amino-card').count(),1);
 await page.click('[data-practice="U"]');assert.equal(await page.locator('.prompt h2').textContent(),'硒半胱胺酸');
 // Mnemonic coverage, exact spelling segments, hiding/revealing, search, and quiz leakage.
 assert.equal(await page.locator('.memory-content').count(),0);
 assert.equal(await page.evaluate(()=>AMINOS.every(a=>MEMORY[a.one] && MEMORY[a.one].parts.join('')===a.name)),true);
 await page.click('[data-view="memory"]');assert.equal(await page.locator('.memory-card').count(),21);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.click('#fold-memory');assert.equal(await page.locator('.memory-card[open]').count(),0);
 assert.equal(await page.locator('.memory-card summary small').first().isVisible(),false);
 await page.locator('.memory-card summary').first().click();assert.equal(await page.locator('.memory-card[open]').count(),1);
 await page.fill('#search','Key');assert.equal(await page.locator('.memory-card').count(),1);
 assert.match(await page.locator('.memory-card').textContent(),/Lysine/);
 await page.fill('#search','');await page.screenshot({path:'tmp/memory-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1060});await page.screenshot({path:'tmp/memory-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.click('[data-practice="K"]');assert.equal(await page.locator('.memory-content').count(),0);
 await page.click('#reveal');assert.match(await page.locator('.answer-memory').textContent(),/Key/);
 // Full 20 + bonus exam, no answers until all questions submitted.
 await page.click('[data-view="exam"]');await page.check('#exam-bonus');await page.click('#start-exam');
 const seen=new Set();
 for(let i=0;i<21;i++){
  const zh=await page.locator('.prompt h2').textContent();const a=aminos.find(a=>a.zh===zh);assert(a);assert(!seen.has(a.one));seen.add(a.one);
  assert.equal(await page.locator('.structure').count(),0);
  await page.fill('#full-name',a.name);await page.fill('#three-code',a.three);await page.fill('#one-code',a.one);await page.click('#reveal');
 }
 assert.equal(seen.size,21);
 for(let i=0;i<21;i++){
  assert.equal(await page.locator('#review-answer .correct').count(),3);
  await page.click('[data-grade="2"]');await page.click('#next');
 }
 assert.match(await page.locator('.score-big').textContent(),/100.*100/);
 assert.match(await page.locator('.summary-panel').textContent(),/加分題練習：5 \/ 5/);
 assert.equal(await page.locator('.summary-list .result-row').count(),21);
 // Responsive screenshot and no clipping, then desktop library and answer views.
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 fs.mkdirSync('tmp',{recursive:true});await page.screenshot({path:'tmp/exam-result-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1060});await page.click('[data-view="library"]');
 await page.screenshot({path:'tmp/library.png',fullPage:true});
 await page.click('[data-practice="W"]');await page.click('#reveal');
 await page.screenshot({path:'tmp/answer.png',fullPage:true});
 assert.equal(errors.length,0,errors.join('\n'));
 console.log('PASS: 21 entries and structure assets; all 21 mnemonic spelling segments; mnemonic search/collapse/reveal; no mnemonic leakage before submission; canvas undo/redo/resize; paper toggle; text grading; persistent progress; wrong-answer retry; filters/search; full 21-question exam = 100/100 + 5/5; mobile no overflow; no browser errors.');
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
