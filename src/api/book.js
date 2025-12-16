import { API_BASE_URL, API_ROUTES } from './api-routes.js';

export async function postBook(payload) {
  try {
    const response = await fetch(API_BASE_URL + API_ROUTES.BOOKS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const res = { status: response.status, body: await response.json() };
    return res;
  } catch (error) {
    throw new Error('Failed to post book data');
  }
}
