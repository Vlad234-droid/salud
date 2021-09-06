import React, { useState, useEffect } from 'react';
import ExpiredPart from '../../components/ExpiredPart';
import ConfirmPart from '../../components/ConfirmPart';
import logo from '../../assets/img/logo.svg';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import style from './style.module.scss';

const ExpiredPage = () => {
  const history = useHistory();
  const [isRequestes, setIsRequestes] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      localStorage.removeItem('token');
      return history.push('/request');
    } else if (token.split('.').length !== 3) {
      localStorage.removeItem('token');
      return history.push('/request');
    } else {
      try {
        const decode = jwt_decode(token);
        setEmail(() => decode.email);
        localStorage.setItem('name', `${decode.given_name} ${decode.family_name}`);
      } catch (error) {
        localStorage.removeItem('token');
        history.push('/request');
      }
    }
  }, [history]);

  const ExpiredPartComponent = () => {
    return (
      <div className={style['expired-page']}>
        <div className={style.wrapper}>
          {isRequestes ? (
            <ConfirmPart setIsRequestes={setIsRequestes} email={email} />
          ) : (
            <ExpiredPart setIsRequestes={setIsRequestes} email={email} />
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

  const getProperActions = () => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      return false;
    } else {
      if (token.split('.').length !== 3) {
        localStorage.removeItem('token');
        return false;
      }
    }

    return true;
  };

  return <>{getProperActions() ? <ExpiredPartComponent /> : ''}</>;
};

export default ExpiredPage;
