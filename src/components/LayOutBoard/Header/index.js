import React, { useState, useEffect } from 'react';
import logo from '../../../assets/img/logo.svg';
import { FilterSVG, BackSVG } from '../../../components/icons';
import { CancelFilterSVG } from '../../../components/icons';
import style from './style.module.scss';
import { Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import FilterDrawer from './FilterDrawer';
import { useCards } from '../../cardsContext';

const Header = () => {
  const [open, setOpen] = useState(false);

  const { pdfMob, setPdfMob, setPdfVisible, setBlur, draweropen, setDrawerOpen } = useCards();

  const handleToggle = () => {
    setOpen(() => true);
    if (window.document.body.clientWidth >= 728) {
      setBlur(() => true);
    }
  };
  const handleClose = () => {
    setOpen(() => false);
    if (window.document.body.clientWidth >= 728) {
      setBlur(() => false);
    }
  };

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    if (!open) document.body.style.overflow = 'unset';
  }, [open]);

  const cerrarHandler = () => {
    setPdfVisible(() => false);
    setPdfMob(() => false);
  };

  return (
    <div className={`${style.header} ${window.document.body.clientWidth > 727 && style.desctop} `} id="header">
      <div className={style.wrapper__}>
        <div className={style.wrapperFlex}>
          <img src={logo} alt="logo" className={style.img} />
          <div className={style.results}>Resultados</div>
        </div>
        {window.document.body.clientWidth <= 727 && pdfMob && (
          <div className={style.mobCerrar} onClick={() => cerrarHandler()}>
            Cerrar
          </div>
        )}

        {window.document.body.clientWidth <= 727 && draweropen && !pdfMob && (
          <span
            className={style.block_back}
            onClick={() => {
              setDrawerOpen(() => false);
              setBlur(() => false);
            }}>
            <div>
              <BackSVG />
            </div>
            <h4>DE REGRESO</h4>
          </span>
        )}

        <div className={style.filter} id="filter_toggle">
          {!open ? (
            <Button onClick={handleToggle}>
              <FilterSVG />
              <div className={style.filter_text}>Filtrar</div>
            </Button>
          ) : (
            <Button onClick={handleClose}>
              <CancelFilterSVG />
              <div className={style.filter_text}>Filtrar</div>
            </Button>
          )}
        </div>
        <Drawer
          open={open}
          className={`drawerFilter ${window.document.body.clientWidth > 727 ? 'desctop' : 'mobile'}`}
          anchor="right"
          onClose={() => {
            setBlur(() => false);
            setOpen(false);
          }}>
          <FilterDrawer setBlur={setBlur} setOpen={setOpen} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
