import React from 'react';
import { Button } from '@material-ui/core';
import { postLogin } from '../../core/services/login';

import style from './style.module.scss';

const ExpiredPart = ({ setIsRequestes, email }) => {
  return (
    <div className={style.request}>
      <h1>
        {localStorage.getItem('name') === '' ||
          (localStorage.getItem('name') === 'unknown' ? 'Saludos' : `Saludos ${localStorage.getItem('name')}`)}
      </h1>
      <div className={style.text}>
        Ya usaste este enlace. Para ver sus resultados, haga clic en el botón Enviar de nuevo a continuación.
      </div>
      <div className={style.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsRequestes(true);
            const body = {
              emailAddress: email,
              appUrl: 'https://saludmedica.dev.angleto.com',
            };
            postLogin(body).catch((error) => {});
          }}>
          Enviar de Nuevo
        </Button>
      </div>
    </div>
  );
};

export default ExpiredPart;
