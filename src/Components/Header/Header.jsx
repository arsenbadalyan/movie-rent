import React from 'react';
import styles from './Header.module.css';
import logo from '../../imgs/movie.png';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.logo}>
        <img src={logo} alt="movie-logo" />
      </div>
    </div>
  );
};

export default Header;
