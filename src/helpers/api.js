const apiUrl = 'http://localhost:3000';

export async function getUserList (curPage, perPage, fetch) {
  const url = `${apiUrl}/users?_page=${curPage}&_limit=${perPage}`;
  const result = await fetch(url);
  const userCount = result.headers.get('x-total-count');
  const userList = await result.json();
  return { userCount, userList };
}

export async function getSingleUser (userId, fetch) {
  const url = `${apiUrl}/users?id=${userId}`;
  const result = await fetch(url);
  const user = await result.json();
  return user[0];
}

export async function getTodoList (userId, fetch) {
  const url = `${apiUrl}/todos?userId=${userId}`;
  return await fetch(url).then(r => r.json());
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
