import { test, expect } from '@playwright/test';

test('Create Product', async ({ request }) => {
  const response = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'POS Product - Indomie Goreng',
      data: {
        category: 'Food',
        price: 3500,
        stock: 100,
        sku: 'SKU-IND-001'
      }
    }
  });

  console.log('Status:', response.status());
  console.log('Response:', await response.json());

  expect(response.status()).toBe(200);
});