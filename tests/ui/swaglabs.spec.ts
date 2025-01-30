import { test, expect } from '@playwright/test';

test.describe('Swag Labs - Testes de UI', () => {
  test.beforeEach(async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/');
  });

  test('Login com credenciais corretas', async ({ page }) => {
    
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Login com credenciais incorretas', async ({ page }) => {
    
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });


  test('Adicionar e remover produtos do carrinho', async ({ page }) => {
    
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
   
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    await page.click('#remove-sauce-labs-backpack');
    await page.click('#remove-sauce-labs-bike-light');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Simulação de erro na finalização da compra', async ({ page }) => {
  
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('#add-to-cart-sauce-labs-backpack');

    await page.click('.shopping_cart_link');

    await page.click('#checkout');
    await page.click('#continue');

    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
  });
});