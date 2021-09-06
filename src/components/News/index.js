import React from 'react';
import style from './style.module.scss';

const News = ({ labNews }) => {
  const checkForColor = () => {
    if (!labNews.flag) return 'white';
    if (labNews.flag) return '#FFDFAF';
  };

  return (
    <>
      {labNews.flag && (
        <li className={style.one_new} style={{ backgroundColor: checkForColor() }}>
          <h3>{labNews.title}</h3>
          <div className={style.moli}>
            <span className={style.min}>{`${labNews.min} mmol/liter`}</span>
            <span className={style.max}>{`${labNews.max} mmol/liter`}</span>
          </div>
        </li>
      )}
    </>
  );
};

export default News;
