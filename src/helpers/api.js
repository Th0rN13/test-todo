import wretch from 'wretch';

export function getApi(url, opts) {
  const endpoint = wretch(url, {
    ...opts,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return ({ fetch, error } = {}) => {
    return endpoint
      .polyfills({ fetch });
  };
}

const externalApi = (endpoint) => getApi(`APP_API_URL${endpoint}`);
const users = externalApi('/users');
const todos = externalApi('/todos');

export async function getUserList({curPage, perPage}, ctx) {
  return await users(ctx).url(`?_page=${curPage}&_limit=${perPage}`)
    .get()
    .setTimeout(1000)
    .res(async (response) => {
      return {
        userCount: response.headers.get('x-total-count'),
        userList: await response.json(),
      }
    });
}

export async function getSingleUser (userId, ctx) {
  const result = await users(ctx).url(`?id=${userId}`).get().json();
  return result[0];
}

export async function getTodoList (userId, ctx) {
  return todos(ctx).url(`?userId=${userId}`).get().json();
}

export const fetchOptions = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function post(endpoint, data) {
  const result = await fetch(endpoint, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await result.json();
}
