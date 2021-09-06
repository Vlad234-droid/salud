import React from 'react';
import style from './style.module.scss';
import logo from '../../../assets/img/logo.svg';

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.wrapper__}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ marginRight: '15px' }} />

          <div className={style.copyright}>Copyright 2020. All Rights Reserved.</div>
        </div>
        <div className={style.powered}>Powered by Salud Medica Inc.</div>
      </div>
    </div>
  );
};

export default Footer;
