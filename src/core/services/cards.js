import { refreshToken } from './login';
import jwt_decode from 'jwt-decode';

const { REACT_APP_API_URL } = process.env;

export const getCards = (history) => {
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/patients/v1/tests/`, {
      method: 'GET',
      headers: {
        'smx-api-client': 'TEST',
        'smx-api-env': 'Testing',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((data) => {
            if (resp.status === 401 || resp.status === 403 || resp.status === 400) {
              refreshToken(history)
                .then((data) => {
                  const [token] = data;
                  const decode = jwt_decode(token);
                  const dateToExpired = new Date().getTime() > decode.exp * 1000;
                  if (dateToExpired) {
                    history.push('/expired');
                  }
                  localStorage.setItem('token', token);
                })
                .then(() => getCards(history))
                .catch((error) => {});
            }
            throw new Error(data.message);
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

export const viewCard = (id, history) => {
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/patients/v1/tests/${id}/viewed`, {
      method: 'POST',
      headers: {
        'smx-api-client': 'TEST',
        'smx-api-env': 'Testing',
        'Cache-Control': 'no-cache',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp;
        } else {
          return resp.json().then((data) => {
            if (resp.status === 401 || resp.status === 403 || resp.status === 400) {
              refreshToken(history)
                .then((data) => {
                  const [token] = data;
                  const decode = jwt_decode(token);
                  const dateToExpired = new Date().getTime() > decode.exp * 1000;
                  if (dateToExpired) {
                    history.push('/expired');
                  }
                  localStorage.setItem('token', token);
                })
                .then(() => viewCard(id, history))
                .catch((error) => {});
            }
            throw new Error(data.message);
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

export const getPDF = (id, history) => {
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/patients/v1/tests/${id}`, {
      method: 'GET',
      headers: {
        'smx-api-client': 'TEST',
        'smx-api-env': 'Testing',
        'Cache-Control': 'no-cache',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((data) => {
            if (resp.status === 401 || resp.status === 403 || resp.status === 400) {
              refreshToken(history)
                .then((data) => {
                  const [token] = data;
                  const decode = jwt_decode(token);
                  const dateToExpired = new Date().getTime() > decode.exp * 1000;
                  if (dateToExpired) {
                    history.push('/expired');
                  }
                  localStorage.setItem('token', token);
                })
                .then(() => getPDF(id, history))
                .catch((error) => {});
            }
            throw new Error(data.message);
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
