import React from 'react';
import { Button } from '@material-ui/core';

import style from './style.module.scss';

const ExpiredPart = ({ setIsRequestes }) => {
  return (
    <div className={style.request}>
      <h1>Saludos Juan Eugenio</h1>
      <div className={style.text}>
        Ya usaste este enlace. Para ver sus resultados, haga clic en el botón Enviar de nuevo a continuación.
      </div>
      <div className={style.button}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsRequestes(true);
          }}>
          Enviar de Nuevo
        </Button>
      </div>
    </div>
  );
};

export default ExpiredPart;
