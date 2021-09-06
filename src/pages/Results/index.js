import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@material-ui/core';
import style from './style.module.scss';
import Cards from '../../components/Card';
import { DotsSVG } from '../../components/icons';
import LayOutBoard from '../../components/LayOutBoard/LayOut';
import Drawer from '@material-ui/core/Drawer';
import DrawerCard from '../../components/DrawerCard';
import { useCards } from '../../components/cardsContext';
import { LoaderSVG } from '../../components/icons';
import { PlugSVG } from '../../components/icons';
import { getCards } from '../../core/services/cards';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '../../core/services/login';

const Results = () => {
  const [showCards, setShowCards] = useState(false);
  const [analPerson, setAnalPerson] = useState(null);
  const history = useHistory();

  const {
    drawerPdfDesctop,
    setBlur,
    config,
    setConfig,
    configFiltered,
    setConfigFiltered,
    plug,
    draweropen,
    setDrawerOpen,
    scrollFilter,
    cards,
    setCards,
  } = useCards();

  const setInfo = useCallback(() => {
    if (cards !== null) {
      const info = [];
      cards.forEach((item) => {
        const news = [];
        if (item?.TestObservations.length) {
          for (let newItem of item?.TestObservations) {
            news.push({
              id: uuid(),
              flag: newItem.HasAbnormalFlag,
              min: newItem.Value,
              max: newItem.ReferenceRange,
              title: newItem.Text,
            });
          }
        }
        info.push({
          id: item.TestLocator,
          data: getProperDate(item.StatusDateUtc),
          title: item.TestDescription,
          clinica: item.TestOrganization,
          flag: item.HasAbnormalObservation,
          looked: item.HasBeenViewed,
          first_name: item.PatientFirstName,
          last_name: item.PatientLastName,
          age: item.PatientAge,
          news,
          full_name: `${item.PatientFirstName} ${item.PatientLastName}, ${item.PatientAge}`,
        });
      });
      setConfig(() => info);
    }
  }, [cards, setConfig]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === '' || token === null) {
      localStorage.removeItem('token');
      return history.push('/request');
    } else {
      if (token.split('.').length !== 3) {
        localStorage.removeItem('token');
        return history.push('/request');
      }

      try {
        const decode = jwt_decode(token);
        const dateToExpired = new Date().getTime() > decode.exp * 1000;
        if (dateToExpired) {
          localStorage.setItem('name', decode.name);
          refreshToken(history)
            .then((data) => {
              if (data) {
                const [token] = data;
                localStorage.setItem('token', token);
                const decode = jwt_decode(token);
                const dateToExpired = new Date().getTime() > decode.exp * 1000;
                if (dateToExpired) {
                  localStorage.setItem('name', decode.name);
                  history.push('/expired');
                } else {
                  history.push('/results');
                }
              }
            })
            .catch((error) => {});
        } else {
          cards ??
            getCards(history)
              .then((data) => {
                setCards(() => data);
              })
              .catch((error) => {});
          if (cards !== null) {
            setInfo();
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
        history.push('/request');
      }
    }
  }, [history, cards, setCards, setInfo]);

  const getProperDate = (date_updated) => {
    function checkForZeroDate(date) {
      return date < 10 ? `0${date}` : date;
    }
    function checkForZeroMonth(month) {
      let pl1 = month + 1;
      return pl1 < 10 ? `0${pl1}` : pl1;
    }
    const date = new Date(date_updated);
    const day = checkForZeroDate(date.getDate());
    const month = checkForZeroMonth(date.getMonth());
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (draweropen) document.body.style.overflow = 'hidden';
    if (!draweropen) document.body.style.overflow = 'unset';
  }, [draweropen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scrollFilter]);

  return (
    <LayOutBoard className={`${draweropen && 'draweropen'}`}>
      <div className={style.block}>
        {config !== null ? (
          <>
            <Drawer
              open={draweropen}
              className={`drawer_cards ${window.document.body.clientWidth > 727 ? 'desctop' : 'mobile'} ${
                drawerPdfDesctop && 'drawerPdfDesctop'
              }`}
              anchor="right"
              onClose={() => {
                setBlur(() => false);
                setDrawerOpen(false);
              }}>
              <DrawerCard
                config={config}
                analPerson={analPerson}
                setDrawerOpen={setDrawerOpen}
                draweropen={draweropen}
              />
            </Drawer>
            <div className={style.wrapper}>
              {plug ? (
                <div className={style.plugWrapper}>
                  <div className={style.plug}>
                    <PlugSVG />
                  </div>
                  <div className={style.any}>
                    Lo sentimos, no encontramos ningún resultado que coincida con su selección. Favor inténtelo de
                    nuevo.
                  </div>
                </div>
              ) : configFiltered !== null ? (
                !showCards ? (
                  configFiltered !== null && configFiltered.length >= 4 ? (
                    <>
                      <div className={style.content}>
                        {configFiltered.slice(0, window.document.body.clientWidth > 727 ? 6 : 3).map((item) => (
                          <Cards
                            setAnalPerson={setAnalPerson}
                            key={item.id}
                            item={item}
                            setDrawerOpen={setDrawerOpen}
                            looked={item.looked}
                            config={configFiltered}
                            setConfigFiltered={setConfigFiltered}
                            setConfig={setConfig}
                          />
                        ))}
                      </div>
                      <div className={style.show_more}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<DotsSVG />}
                          onClick={() => {
                            setShowCards(() => true);
                          }}>
                          Mostrar más
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className={style.content}>
                      {configFiltered.map((item) => (
                        <Cards
                          setAnalPerson={setAnalPerson}
                          key={item.id}
                          item={item}
                          setDrawerOpen={setDrawerOpen}
                          looked={item.looked}
                          config={configFiltered}
                          setConfigFiltered={setConfigFiltered}
                          setConfig={setConfig}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <div className={style.content}>
                    {configFiltered.map((item) => (
                      <Cards
                        setAnalPerson={setAnalPerson}
                        key={item.id}
                        item={item}
                        setDrawerOpen={setDrawerOpen}
                        looked={item.looked}
                        config={configFiltered}
                        setConfigFiltered={setConfigFiltered}
                        setConfig={setConfig}
                      />
                    ))}
                  </div>
                )
              ) : !showCards ? (
                config !== null && config.length >= 4 ? (
                  <>
                    <div className={style.content}>
                      {config.slice(0, window.document.body.clientWidth > 727 ? 6 : 3).map((item) => (
                        <Cards
                          setAnalPerson={setAnalPerson}
                          key={item.id}
                          item={item}
                          setDrawerOpen={setDrawerOpen}
                          looked={item.looked}
                          config={config}
                          setConfig={setConfig}
                        />
                      ))}
                    </div>
                    <div className={style.show_more}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<DotsSVG />}
                        onClick={() => {
                          setShowCards(() => true);
                        }}>
                        Mostrar más
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className={style.content}>
                    {config.map((item) => (
                      <Cards
                        setAnalPerson={setAnalPerson}
                        key={item.id}
                        item={item}
                        setDrawerOpen={setDrawerOpen}
                        looked={item.looked}
                        config={config}
                        setConfig={setConfig}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className={style.content}>
                  {config.map((item) => (
                    <Cards
                      setAnalPerson={setAnalPerson}
                      key={item.id}
                      item={item}
                      setDrawerOpen={setDrawerOpen}
                      looked={item.looked}
                      config={config}
                      setConfig={setConfig}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="loader">
            <LoaderSVG />
          </div>
        )}
      </div>
    </LayOutBoard>
  );
};
export default Results;
