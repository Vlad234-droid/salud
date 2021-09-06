import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { refreshToken } from '../../core/services/login';

const TokenDecode = () => {
  const history = useHistory();
  const { hash } = useLocation();
  const token = hash.split('=')[hash.split('=').length - 1];

  useEffect(() => {
    if (token === undefined || token === '' || token === null) {
      return history.push('/request');
    } else {
      localStorage.setItem('token', token);
      try {
        const decode = jwt_decode(token);
        const dateToExpired = new Date().getTime() > decode.exp * 1000;
        localStorage.setItem('name', `${decode.given_name} ${decode.family_name}`);

        if (token.split('.').length !== 3) {
          localStorage.removeItem('token');
          history.push('/request');
        } else if (dateToExpired) {
          refreshToken(history)
            .then((data) => {
              if (data) {
                const [token] = data;
                localStorage.setItem('token', token);
                const decode = jwt_decode(token);
                const dateToExpired = new Date().getTime() > decode.exp * 1000;

                if (dateToExpired) {
                  localStorage.setItem('name', `${decode.given_name} ${decode.family_name}`);
                  history.push('/expired');
                } else {
                  history.push('/results');
                }
              }
            })
            .catch(() => {});
        } else {
          history.push('/results');
        }
      } catch {
        history.push('/request');
      }
    }
  }, [history, token]);

  return <div></div>;
};
export default TokenDecode;
