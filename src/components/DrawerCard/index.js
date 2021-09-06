import React, { useState, useEffect, useRef } from 'react';
import style from './style.module.scss';
import {
  ImageDownlaodSVGBlack,
  ImageDownlaodSVG,
  HouseSVG,
  PrintSVG,
  EmailSVG,
  SrcollDown,
  SrcollUp,
  BackSVG,
  LoaderSVG,
} from '../icons';
import Button from '@material-ui/core/Button';
import { getPDF } from '../../core/services/cards';
import PdfComponent from '../../components/PdfComponent';
import { useCards } from '../cardsContext';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '../../components/ComponentToPrint';
import { useHistory } from 'react-router-dom';

const DrawerCard = ({ config, analPerson, setDrawerOpen, draweropen }) => {
  const [loading, setLoading] = useState(false);
  const [listNews, setListNews] = useState(null);
  const heightUl = useRef();
  const heightWrapperUl = useRef();
  const { setPdfMob, pdfVisible, setPdfVisible, setDrawerPdfDesctop, setBlur } = useCards();
  const [card, setCard] = useState(null);
  const refPrint = useRef();
  const [PDF, setPDF] = useState([]);
  const history = useHistory();
  const [scrollTop, setScrollTop] = useState(true);
  const [scrollBottom, setScrollBottom] = useState(false);
  const [hideBtnsScroll, setHideBtnsScroll] = useState(null);
  const [PDftoPrint, setPDFToPrint] = useState(false);

  useEffect(() => {
    if (analPerson !== null) {
      const res = config.filter((item) => item.id === analPerson);
      const [first] = res;
      setCard(() => first);
      setListNews(() => res[0].news);
    }

    setTimeout(() => {
      if (heightUl?.current?.clientHeight + 88 >= heightWrapperUl?.current?.clientHeight) {
        setHideBtnsScroll(() => true);
      } else {
        setHideBtnsScroll(() => false);
      }
    }, 1);

    return () => {
      setListNews(() => null);
      setHideBtnsScroll(() => null);
      setHideBtnsScroll(() => null);
    };
  }, [draweropen, analPerson, config]);

  const checkForColor = (flag) => {
    if (!flag) return 'white';
    if (flag) return '#FFDFAF';
  };

  const getPDFHandlerMob = () => {
    setLoading(() => true);
    getPDF(analPerson, history).then((data) => {
      const listPages = [];
      for (let item of data) {
        listPages.push(item.Media);
      }
      setPdfMob(() => true);
      setPDF(() => listPages);
      setPdfVisible(() => true);
      setLoading(() => false);
    });
  };
  const getPDFHandlerDesc = () => {
    getPDF(analPerson, history).then((data) => {
      const listPages = [];
      for (let item of data) {
        listPages.push(item.Media);
      }
      setPDF(() => listPages);
      setPdfVisible(() => true);
      setDrawerPdfDesctop(() => true);
    });
  };

  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });

  const scroll = (e) => {
    if (e.target.scrollTop !== 0) setScrollTop(() => false);
    if (e.target.scrollTop === 0) setScrollTop(() => true);
    if (e.target.scrollTop === heightUl.current.clientHeight - heightWrapperUl.current.clientHeight + 88)
      setScrollBottom(() => true);

    if (e.target.scrollTop !== heightUl.current.clientHeight - heightWrapperUl.current.clientHeight + 88)
      setScrollBottom(() => false);
  };

  const scrollHandlerTop = () => {
    if (heightWrapperUl.current.scrollTop - heightWrapperUl.current.clientHeight <= 0) {
      setScrollTop(() => true);
      heightWrapperUl.current.scrollTop = 0;
    } else {
      heightWrapperUl.current.scrollTop -= heightWrapperUl.current.clientHeight;
    }
  };

  const scrollHandlerBottom = () => {
    if (heightWrapperUl.current.scrollTop + heightWrapperUl.current.clientHeight >= heightWrapperUl.current.scrollTop) {
      setScrollBottom(() => true);
      heightWrapperUl.current.scrollTop = heightWrapperUl.current.scrollTop += heightWrapperUl.current.clientHeight;
    } else {
      heightWrapperUl.current.scrollTop += heightWrapperUl.current.clientHeight;
    }
  };

  return (
    <div className={style.wrapper}>
      {pdfVisible ? (
        <div className={style.pdf}>
          <PdfComponent PDF={PDF} />
        </div>
      ) : (
        <>
          <div className={style.title_block}>
            <span
              className={style.block_back}
              onClick={() => {
                setBlur(false);
                setDrawerOpen(() => false);
              }}>
              <div>
                <BackSVG />
              </div>
              <h4>DE REGRESO</h4>
            </span>
            <h3 className={style.panel}>{card?.title}</h3>
            <p>{card?.full_name}</p>
            <div className={style.actions}>
              {/* <input
            accept="image/*"
            className={style.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button component="span">Upload</Button>
          </label> */}
              <div onClick={() => getPDFHandlerDesc()}>
                <div>
                  <ImageDownlaodSVGBlack />
                </div>
                <h3>Ver Imagen</h3>
              </div>
              <div onClick={() => handlePrint()} className={`${PDftoPrint && style.disabled}`}>
                <div>
                  <PrintSVG />
                </div>
                <h3>Imprimir</h3>
              </div>
              <a href={`mailto:`} style={{ display: 'none' }}>
                <div>
                  <EmailSVG />
                </div>
                <h3>Enviar</h3>
              </a>
              <div style={{ display: 'none' }}>
                <ComponentToPrint refPrint={refPrint} analPerson={analPerson} setPDFToPrint={setPDFToPrint} />
              </div>
            </div>
          </div>
          {!!hideBtnsScroll && listNews !== null && !!listNews.length && (
            <div className={style.scrolling}>
              <div
                onClick={() => {
                  scrollHandlerTop();
                }}
                className={`${scrollTop && style.dimming}`}>
                <SrcollUp />
              </div>
              <div
                onClick={() => {
                  scrollHandlerBottom();
                }}
                className={`${scrollBottom && style.dimming}`}>
                <SrcollDown />
              </div>
            </div>
          )}

          <div className={style.house_desktop}>
            <div>
              <HouseSVG />
            </div>
            <p>{card?.clinica}</p>
          </div>
          <div
            className={`${style.listNews}`}
            style={{ overflow: !hideBtnsScroll && 'hidden' }}
            onScroll={scroll}
            ref={heightWrapperUl}>
            <ul ref={heightUl}>
              {listNews !== null &&
                listNews.map((labNews) => {
                  return (
                    <li
                      key={labNews.id}
                      className={style.one_new}
                      style={{ backgroundColor: checkForColor(labNews.flag) }}>
                      <h3>{labNews.title}</h3>
                      <div className={style.moli}>
                        <span className={style.min}>{`${labNews.min ?? ''} mmol/liter`}</span>
                        <span className={style.max}>{`${labNews.max ?? ''} mmol/liter`}</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={style.button}>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                loading ? (
                  <div className={style.loaderPDF}>
                    <LoaderSVG />
                  </div>
                ) : (
                  <ImageDownlaodSVG />
                )
              }
              onClick={() => getPDFHandlerMob()}>
              <span style={{ opacity: loading ? '0.5' : '1' }}>Ver Imagen</span>
            </Button>
          </div>
          <div className={style.gradient}></div>
        </>
      )}
    </div>
  );
};

export default DrawerCard;
