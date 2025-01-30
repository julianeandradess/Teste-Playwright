import { test, expect } from '@playwright/test';

test.describe('ReqRes - Testes de API', () => {
  test('Listar usuários e validar dados', async ({ request }) => {
  
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.data[0]).toHaveProperty('id');
    expect(responseBody.data[0]).toHaveProperty('first_name');
    expect(responseBody.data[0]).toHaveProperty('last_name');
    expect(responseBody.data[0]).toHaveProperty('email');
  });

  test('Criar e atualizar um usuário', async ({ request }) => {
  
    const createResponse = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'morpheus',
        job: 'leader',
      },
    });
    expect(createResponse.status()).toBe(201);

    const createResponseBody = await createResponse.json();
    expect(createResponseBody).toHaveProperty('id');
    expect(createResponseBody.name).toBe('morpheus');
    expect(createResponseBody.job).toBe('leader');

    const updateResponse = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'morpheus',
        job: 'zion resident',
      },
    });
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    expect(updateResponseBody.name).toBe('morpheus');
    expect(updateResponseBody.job).toBe('zion resident');
  });

  test('Manipulação de falhas na API', async ({ request }) => {
  
    const deleteResponse = await request.delete('https://reqres.in/api/users/999');
    expect(deleteResponse.status()).toBe(204); //devido não ter banco de dados
  });
});