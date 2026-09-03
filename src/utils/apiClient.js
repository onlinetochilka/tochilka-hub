const BASE_URL = '/api/v2';

async function request(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.message || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

const api = {
  get:   (path) => request('GET', path),
  post:  (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
};

export default api;
