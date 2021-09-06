import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconBack } from '../icons';
import { MailSVG } from '../../components/icons';
import style from './style.module.scss';
import InputAdornment from '@material-ui/core/InputAdornment';
import { postLogin } from '../../core/services/login';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const EmailPart = ({ setIsRequestes, setEmail, email }) => {
  const useStyles = makeStyles((theme) => ({
    root: {},
    clr: {
      background: '#F9FBFF',
      maxWidth: '450px',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '523px !important',
        width: '100%',
      },
    },
  }));

  const classes = useStyles();

  const handleSubmit = () => {
    setIsRequestes(() => true);
    const body = {
      emailAddress: email,
      appUrl: 'https://saludmedica.dev.angleto.com',
    };
    postLogin(body).catch(() => {});
  };

  return (
    <div className={style.email}>
      <div className={style.text}>
        ¡Saludos! Para acceder sus resultados, favor ingrese su correo electrónico en el encasillado
      </div>
      <ValidatorForm onSubmit={handleSubmit} className={classes.root} autoComplete="off">
        <TextValidator
          validators={['required', 'isEmail']}
          errorMessages={[
            'El correo electrónico proporcionado no es válido',
            'El correo electrónico proporcionado no es válido',
          ]}
          value={email}
          onChange={(e) => {
            setEmail(() => e.target.value);
          }}
          className={classes.clr}
          variant="outlined"
          placeholder="Correo electronico"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailSVG />
              </InputAdornment>
            ),
          }}
        />
        <div className={style.button}>
          <Button variant="contained" color="primary" starticon={<IconBack />} type="submit">
            Accesar Mis Resultados
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default EmailPart;
