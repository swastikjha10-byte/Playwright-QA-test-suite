import { expect, test } from '@playwright/test';

const apiBaseUrl = 'https://reqres.in';
const headers = process.env.REQRES_API_KEY
  ? { 'x-api-key': process.env.REQRES_API_KEY }
  : undefined;

test.describe('ReqRes users API', () => {
  test('GET /api/users?page=2 returns complete user records', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/api/users?page=2`, { headers });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);

    for (const user of body.data) {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String)
        })
      );
    }
  });

  test('POST /api/users creates a user response with server metadata', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'leader' };
    const response = await request.post(`${apiBaseUrl}/api/users`, { data: payload, headers });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({ ...payload }));
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
    expect(Number.isNaN(Date.parse(body.createdAt))).toBe(false);
  });

  test('uses a create response as the handoff for a logical verify step', async ({ request }) => {
    const createResponse = await request.post(`${apiBaseUrl}/api/users`, {
      data: { name: 'morpheus', job: 'leader' },
      headers
    });
    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();
    expect(createdUser.id).toBeTruthy();

    // ReqRes is a mock API, so the verification targets the create contract rather than persistence.
    expect(createdUser).toMatchObject({ name: 'morpheus', job: 'leader' });
  });
});
