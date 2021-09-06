import React from 'react';
import { Button } from '@material-ui/core';
import { IconBack } from '../../components/icons';
import confirm from '../../assets/img/confirm-header.png';
import style from './style.module.scss';

const ConfirmPart = ({ email, setIsRequestes }) => {
  return (
    <div className={style.confirm}>
      <div className={style.header}>
        <img src={confirm} alt="" />
      </div>
      <div className={style.wrapper}>
        <h1>Correo electrónico fue enviado</h1>
        <div className={style.text}>
          Se envió un vínculo a <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div className={style.button}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconBack />}
            onClick={() => setIsRequestes(() => false)}>
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPart;
