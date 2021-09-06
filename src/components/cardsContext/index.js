import React, { createContext, useContext, useState } from 'react';

const СardsContext = createContext();

export const useCards = () => {
  return useContext(СardsContext);
};

export const GetInfoCardsProvider = ({ children }) => {
  const [cards, setCards] = useState(null);
  const [pdfMob, setPdfMob] = useState(false);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [drawerPdfDesctop, setDrawerPdfDesctop] = useState(false);
  const [blur, setBlur] = useState(false);
  const [config, setConfig] = useState(null);
  const [configFiltered, setConfigFiltered] = useState(null);
  const [anormalesChecked, setAnormalesChecked] = useState(false);
  const [namesChecked, setNamesChecked] = useState([]);
  const [plug, setPlug] = useState(false);
  const [draweropen, setDrawerOpen] = useState(false);
  const [scrollFilter, setScrollFilter] = useState(false);

  const filterCadrs = (value) => {
    setScrollFilter((prev) => !prev);
    setPlug(() => false);
    if (!value.length) {
      return setConfigFiltered(() => null);
    }

    if (value.length && !value.includes('anormales')) {
      const filtered = [];
      for (let item of config) {
        for (let key of value) {
          if (item.full_name === key) {
            filtered.push(item);
          }
        }
      }
      if (!filtered.length) setPlug(() => true);
      setConfigFiltered(() => filtered);
    } else if (value.length === 1 && value.includes('anormales')) {
      const filtered = config.filter((item) => {
        return item.flag;
      });

      if (!filtered.length) setPlug(() => true);
      setConfigFiltered(() => filtered);
    } else {
      const filtered = [];
      for (let item of config) {
        for (let key of value) {
          if (item.full_name === key) {
            filtered.push(item);
          }
        }
      }
      const filterAnormas = filtered.filter((item) => item.flag);
      if (!filterAnormas.length) setPlug(() => true);
      setConfigFiltered(() => filterAnormas);
    }
  };

  return (
    <СardsContext.Provider
      value={{
        cards,
        setCards,
        pdfMob,
        setPdfMob,
        pdfVisible,
        setPdfVisible,
        setDrawerPdfDesctop,
        drawerPdfDesctop,
        blur,
        setBlur,
        config,
        setConfig,
        filterCadrs,
        anormalesChecked,
        setAnormalesChecked,
        setNamesChecked,
        namesChecked,
        configFiltered,
        setConfigFiltered,
        plug,
        draweropen,
        setDrawerOpen,
        scrollFilter,
      }}>
      {children}
    </СardsContext.Provider>
  );
};
