import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './style.scss';
import { useCards } from '../../../components/cardsContext';
const LayOutBoard = ({ children, className }) => {
  const { blur } = useCards();

  return (
    <div className={className ? className : ''} style={{ filter: blur ? 'blur(2px)' : 'none', minHeight: '100vh' }}>
      <Header />
      <div className="main-content">
        <div className="dashboard-wrapper">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LayOutBoard;
