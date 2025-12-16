import { test, expect } from '@playwright/test';

test('页面加载并显示标题', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await expect(page.getByText('博客工具')).toBeVisible();
  await expect(page.getByText('文档列表')).toBeVisible();
});

test('添加文档功能', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const docTitle = '测试文档';
  await page.locator('input[placeholder="输入文档标题"]').fill(docTitle);
  await page.getByText('添加').click();
  
  await expect(page.getByText(docTitle)).toBeVisible();
});

test('添加章节功能', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const docTitle = '测试文档';
  const chapterTitle = '测试章节';
  
  await page.locator('input[placeholder="输入文档标题"]').fill(docTitle);
  await page.getByText('添加').click();
  
  await page.locator('input[placeholder="输入章节标题"]').fill(chapterTitle);
  await page.getByText('添加章节').click();
  
  await expect(page.getByText(chapterTitle)).toBeVisible();
});

test('编辑章节内容', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const docTitle = '测试文档';
  const chapterTitle = '测试章节';
  const content = '这是测试章节的内容。\n多行内容测试。';
  
  await page.locator('input[placeholder="输入文档标题"]').fill(docTitle);
  await page.getByText('添加').click();
  
  await page.locator('input[placeholder="输入章节标题"]').fill(chapterTitle);
  await page.getByText('添加章节').click();
  
  await page.getByText('编辑内容').click();
  await page.locator('textarea').fill(content);
  await page.getByText('保存').click();
  
  await expect(page.getByText('这是测试章节的内容。')).toBeVisible();
});

test('删除功能', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const docTitle = '测试文档';
  
  await page.locator('input[placeholder="输入文档标题"]').fill(docTitle);
  await page.getByText('添加').click();
  
  await page.getByRole('button', { name: '删除' }).last().click();
  
  await expect(page.getByText(docTitle)).not.toBeVisible();
});
