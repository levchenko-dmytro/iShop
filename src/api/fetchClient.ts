const BASE_URL =
  'https://levchenko-dmytro.github.io/phone-catalog/updated_data/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function request<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
