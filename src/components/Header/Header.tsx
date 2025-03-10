import { Link, NavLink } from 'react-router-dom';
import { Counter } from '../Counter';
import { useAppSelector } from '../../features/hooks/hooks';

import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';


export const ROUTER = {
  home: '/',
  saved: '/saved'
};

export const Header = () => {
  const { saved } = useAppSelector(
    (state) => state.savedReducer
  );

  return (
    <div className={styles.header}>
      <div className={styles.header__nav}>
        <div className={styles.header__icon}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.header__logo} />
          </Link>
        </div>
      </div>

      <nav className={styles.header__list}>
        <NavLink to={ROUTER.home} className={styles.header__link}>
          Home
        </NavLink>
      </nav>

      <div className={styles.header__icons}>
        {saved.length > 0 && (
          <div className={styles.header__heart}>
            <Counter count={saved.length} />
          </div>
        )}
        <NavLink to="/saved" className={styles.header__item} title="Saved">
          <div className={styles.header__saved}></div>
        </NavLink>
      </div>
    </div>
  );
};
