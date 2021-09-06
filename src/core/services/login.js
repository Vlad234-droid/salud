const { REACT_APP_API_URL } = process.env;

export const postLogin = (body) => {
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/auth/v1/login`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'smx-api-client': 'TEST',
        'smx-api-env': 'Testing',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            throw new Error(json.message);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const refreshToken = (history) => {
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/auth/v1/refresh`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/plain',
        'smx-api-client': 'TEST',
        'smx-api-env': 'Testing',
      },
      body: localStorage.getItem('token'),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((data) => {
            if (resp.status === 401 || resp.status === 400 || resp.status === 403) {
              history.push('/expired');
            }
            throw new Error(data.Reason);
          });
        }
      })
      .then((data) => {
        resolve(data.ItemCollection);
      })

      .catch((error) => {
        reject(error);
      });
  });
};
