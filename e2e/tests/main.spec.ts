import { test, expect } from '@playwright/test';

test.describe('Formulário de Passageiro', () => {
  test("Deve criar uma conta de passageiro", async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('.input-name').fill('John Doe');
    await page.locator('.input-email').fill(`john.doe${Math.random()}@example.com`);
    await page.locator('.input-cpf').fill('87748248800');
    await page.locator('.input-password').fill('123456');
    await page.locator('.input-passenger').check();
    await page.locator('.button-submit').click();
    await expect(page.locator('.p-status')).toContainText('success');
  });

  test("Não deve criar uma conta de passageiro", async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('.input-name').fill('John');
    await page.locator('.input-email').fill(`john.doe${Math.random()}@example.com`);
    await page.locator('.input-cpf').fill('87748248800');
    await page.locator('.input-password').fill('123456');
    await page.locator('.input-passenger').check();
    await page.locator('.button-submit').click();
    await expect(page.locator('.p-status')).toContainText('error');
    await expect(page.locator('.p-message')).toContainText('Nome inválido!');
  });
});
