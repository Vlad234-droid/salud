import React, { useState } from 'react';
import EmailPart from '../../components/EmailPart';
import ConfirmPart from '../../components/ConfirmPart';
import logo from '../../assets/img/logo.svg';
import style from './style.module.scss';

const RequestPage = () => {
  const [isRequestes, setIsRequestes] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className={style['expired-page']}>
      <div className={style.wrapper}>
        {!isRequestes ? (
          <EmailPart setIsRequestes={setIsRequestes} setEmail={setEmail} email={email} />
        ) : (
          <ConfirmPart setIsRequestes={setIsRequestes} email={email} />
        )}
      </div>
      <div className={style.footer}>
        <div className={style.copyright}>Copyright 2020. All Rights Reserved.</div>
        <img src={logo} alt="" />
        <div>Powered by Salud Medica Inc.</div>
      </div>
    </div>
  );
};

export default RequestPage;
