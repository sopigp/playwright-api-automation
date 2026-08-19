import { test, expect } from '@playwright/test';

test('Create and Get Product', async ({ request }) => {

  //  METHOD : POST
  // 1. Create Product
  const createResponse = await request.post('https://api.restful-api.dev/objects', {
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

  console.log('POST Status:', createResponse.status());

  expect(createResponse.status()).toBe(200);

  // 2. Get response body
  const createBody = await createResponse.json();

  console.log('POST Response:', createBody);

  // 3. Get Product ID from POST response
  const productId = createBody.id;

  console.log('Product ID:', productId);

  expect(productId).toBeTruthy();

  // 4. Get Product using Product ID
  const getResponse = await request.get(
    `https://api.restful-api.dev/objects/${productId}`
  );

  console.log('GET Status:', getResponse.status());

  expect(getResponse.status()).toBe(200);

  // 5. Get GET response body
  const getBody = await getResponse.json();

  console.log('GET Response:', getBody);

  // 6. Verify Product
  expect(getBody.id).toBe(productId);
  expect(getBody.name).toBe('POS Product - Indomie Goreng');
  expect(getBody.data.category).toBe('Food');
  expect(getBody.data.price).toBe(3500);
  expect(getBody.data.stock).toBe(100);
  expect(getBody.data.sku).toBe('SKU-IND-001');

  // METHOD : PUT
  // 7. Update Product using PUT
const updateResponse = await request.put(
  `https://api.restful-api.dev/objects/${productId}`,
  {
    data: {
      name: 'POS Product - Indomie Goreng Updated',
      data: {
        category: 'Food',
        price: 4000,
        stock: 80,
        sku: 'SKU-IND-001'
      }
    }
  }
);

console.log('PUT Status:', updateResponse.status());

expect(updateResponse.status()).toBe(200);

// 8. Get PUT response body
const updateBody = await updateResponse.json();

console.log('PUT Response:', updateBody);

// 9. Verify PUT response
expect(updateBody.id).toBe(productId);
expect(updateBody.name).toBe('POS Product - Indomie Goreng Updated');
expect(updateBody.data.category).toBe('Food');
expect(updateBody.data.price).toBe(4000);
expect(updateBody.data.stock).toBe(80);
expect(updateBody.data.sku).toBe('SKU-IND-001');

// 10. Get Product after PUT
const getUpdatedResponse = await request.get(
  `https://api.restful-api.dev/objects/${productId}`
);

console.log('GET After PUT Status:', getUpdatedResponse.status());

expect(getUpdatedResponse.status()).toBe(200);

// 11. Get updated response body
const getUpdatedBody = await getUpdatedResponse.json();

console.log('GET After PUT Response:', getUpdatedBody);

// 12. Verify updated Product
expect(getUpdatedBody.id).toBe(productId);
expect(getUpdatedBody.name).toBe('POS Product - Indomie Goreng Updated');
expect(getUpdatedBody.data.category).toBe('Food');
expect(getUpdatedBody.data.price).toBe(4000);
expect(getUpdatedBody.data.stock).toBe(80);
expect(getUpdatedBody.data.sku).toBe('SKU-IND-001');

//  METHOD : PATCH
// 16. Get Product after PATCH
const getPatchedResponse = await request.get(
  `https://api.restful-api.dev/objects/${productId}`
);

console.log('GET After PATCH Status:', getPatchedResponse.status());

expect(getPatchedResponse.status()).toBe(200);

// 17. Get patched response body
const getPatchedBody = await getPatchedResponse.json();

console.log('GET After PATCH Response:', getPatchedBody);

// 18. Verify patched Product
expect(getPatchedBody.id).toBe(productId);
expect(getPatchedBody.name).toBe('POS Product - Indomie Goreng Updated');
expect(getPatchedBody.data.category).toBe('Food');
expect(getPatchedBody.data.price).toBe(4000);
expect(getPatchedBody.data.stock).toBe(80);
expect(getPatchedBody.data.sku).toBe('SKU-IND-001');

// METHOD : DELETE
// 19. Delete Product
const deleteResponse = await request.delete(
  `https://api.restful-api.dev/objects/${productId}`
);

console.log('DELETE Status:', deleteResponse.status());

expect(deleteResponse.status()).toBe(200);

// 20. Get DELETE response body
const deleteBody = await deleteResponse.json();

console.log('DELETE Response:', deleteBody);

// 21. Verify DELETE response
expect(deleteBody.message).toContain(productId);

// 22. Get Product after DELETE
const getDeletedResponse = await request.get(
  `https://api.restful-api.dev/objects/${productId}`
);

console.log('GET After DELETE Status:', getDeletedResponse.status());

expect(getDeletedResponse.status()).toBe(404);
});