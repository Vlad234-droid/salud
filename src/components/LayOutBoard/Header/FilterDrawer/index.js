import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import { CheckoBoxEmpty, CheckoBoxFill } from '../../../../components/icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { useCards } from '../../../../components/cardsContext';
import Button from '@material-ui/core/Button';
import { BackSVG } from '../../../../components/icons';

const FilterDrawer = ({ setOpen, setBlur }) => {
  const { cards, filterCadrs, setAnormalesChecked, anormalesChecked, namesChecked, setNamesChecked } = useCards();
  const [names, setName] = useState([]);
  const filterHandler = () => {
    setOpen(false);
    setBlur(() => false);
  };

  useEffect(() => {
    if (cards !== null) {
      const newNames = cards
        .map((item) => {
          return `${item.PatientFirstName} ${item.PatientLastName}, ${item.PatientAge}`;
        })
        .filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        });

      if (!namesChecked.length) setNamesChecked(() => newNames.map(() => ({ checked: false })));
      setName(() => newNames);
    }
  }, [cards, namesChecked.length, setNamesChecked]);

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const values = [];
    formData.forEach((item) => {
      values.push(item);
    });
    filterCadrs(values);
    e.preventDefault();
  };

  const handleCheckedNames = (i) => {
    const data = JSON.parse(JSON.stringify(namesChecked));
    data[i].checked = !data[i].checked;
    setNamesChecked(() => data);
  };

  return (
    <div className={style.block}>
      <form onSubmit={handleSubmit} style={{ height: '100%' }}>
        <div className={style.forma}>
          <div className={style.aditional}>
            <div
              className={style.back}
              onClick={() => {
                setBlur(() => false);
                setOpen(false);
              }}>
              <BackSVG />
              <p>DE REGRESO</p>
            </div>
            <div className={style.filter_title}>
              <div className={style.text}>Filtros</div>
              <div className={style.buttonSubm}>
                <Button variant="contained" color="primary" type="submit" onClick={filterHandler}>
                  Mostrar Resultados
                </Button>
              </div>
            </div>
          </div>
          <div className={style.miFamilia}>
            <p>Mi familia</p>
          </div>
          <FormGroup className={style.check_boxes}>
            {names.map((item, i) => (
              <div key={i + 1} className={style.wrapper_checboxs}>
                <label>
                  <Checkbox
                    name={toString(i + 1)}
                    value={item}
                    checked={namesChecked[i].checked}
                    onChange={() => handleCheckedNames(i)}
                    checkedIcon={<CheckoBoxFill />}
                    icon={<CheckoBoxEmpty />}
                  />
                  {item}
                </label>
              </div>
            ))}
            <div className={style.resultado}>
              <p>Tipo de resultado</p>
            </div>

            <label>
              <Checkbox
                checkedIcon={<CheckoBoxFill />}
                name="f"
                icon={<CheckoBoxEmpty />}
                value="anormales"
                checked={anormalesChecked}
                onChange={() => {
                  setAnormalesChecked((prev) => !prev);
                }}
              />
              Resultados anormales
            </label>
            <div className={style.buttonSubm}>
              <Button variant="contained" color="primary" type="submit" onClick={filterHandler}>
                Mostrar Resultados
              </Button>
            </div>
          </FormGroup>
        </div>
      </form>
    </div>
  );
};
export default FilterDrawer;
