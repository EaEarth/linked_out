import React from 'react';
import styles from './index.module.scss';

export const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright &copy; {new Date().getFullYear()} Solus. All right reserved.
      </p>
    </footer>
  );
};

export default Footer;
