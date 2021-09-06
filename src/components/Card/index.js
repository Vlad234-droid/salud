import React, { useState } from 'react';
import style from './style.module.scss';
import { Button } from '@material-ui/core';
import { EyeSVG } from '../../components/icons';
import { HeardGreenSVG, HeardOrangeSVG, HeardGreySVG, HouseSVG } from '../../components/icons';
import News from '../../components/News';
import { AllGoodResSVG } from '../../components/icons';
import { viewCard } from '../../core/services/cards';
import { useCards } from '../../components/cardsContext';
import { useHistory } from 'react-router-dom';

const Cards = ({ setAnalPerson, item, setDrawerOpen, setConfig, config, setConfigFiltered }) => {
  const [expand, setExpand] = useState(false);
  const history = useHistory();

  const { setBlur, configFiltered } = useCards();

  const checkForColor = (flag) => {
    if (item.looked) return '#A2ACBE';
    if (!flag) return '#1EBF49';
    if (flag) return '#EB9718';
  };
  const checkForHeard = (flag) => {
    if (item.looked) return <HeardGreySVG />;
    if (!flag) return <HeardGreenSVG />;
    if (flag) return <HeardOrangeSVG />;
  };

  const checkForFn = () => {
    if (!item.looked)
      viewCard(item.id, history).then(() => {
        const newInfo = config.map((inf) => {
          if (inf.id === item.id) {
            inf.looked = true;
          }
          return inf;
        });
        if (configFiltered !== null) {
          setConfigFiltered(() => newInfo);
        }
        if (configFiltered === null) {
          setConfig(() => newInfo);
        } else {
          for (let inf of config) {
            if (inf.id === item.id) {
              inf.looked = true;
            }
          }
        }
      });
    if (window.document.body.clientWidth >= 728) {
      setAnalPerson(() => item.id);
      setDrawerOpen(() => true);
      setBlur(() => true);
      return;
    }
    setAnalPerson(() => item.id);
    if (!item.flag) setDrawerOpen(true);
    if (item.flag) setExpand(true);
  };

  const actionsHandler = () => {
    setAnalPerson(() => item.id);
    setDrawerOpen(true);
    setExpand(() => false);
  };

  return (
    <div className={`${style.card} ${expand && style.extend}`}>
      <div className={style.line} style={{ background: checkForColor(item.flag) }}></div>
      <div className={style.main_info}>
        <div className={style.block}>
          <div className={style.description} style={{ color: checkForColor(item.flag) }}>
            <div className="heart">{checkForHeard(item.flag)}</div>
            <span className={style.desc_text}>
              {item?.looked ? 'FUE VISITADO' : !item.flag ? 'TODOS BIEN' : 'Atención necesaria'}
            </span>
          </div>
          <div className={style.data}>{item.data}</div>
        </div>

        <div className={style.title}>{item.title}</div>
        <div className={style.text}>{`${item.first_name} ${item.last_name}, ${item.age}`}</div>
        {expand && (
          <div className={style.news}>
            <div className={style.lab_title}>
              <div>
                <HouseSVG />
              </div>
              <h2>{item.clinica}</h2>
            </div>
            <ul className={style.listNews}>
              {item.news.map((newN) => {
                return <News labNews={newN} key={`${newN.id}`} />;
              })}
            </ul>
            <div className={style.all_good}>
              <div>
                <AllGoodResSVG />
              </div>
              <p>El resto de los resultados están bien</p>
            </div>
          </div>
        )}
        {expand ? (
          <>
            <div className={style.Ebtn}>
              <Button variant="contained" color="primary" className={style.Ebtn} onClick={() => setExpand(false)}>
                Cerrar
              </Button>
            </div>
            <div className={style.button}>
              <Button variant="contained" color="primary" onClick={actionsHandler}>
                Ver Todo
              </Button>
            </div>
          </>
        ) : (
          <div className={style.button}>
            <Button variant="contained" color="primary" startIcon={<EyeSVG />} onClick={checkForFn}>
              Evaluar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
