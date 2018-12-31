import React from 'react';
import styles from './layout.module.css';

export default ({ children }) => (
  <React.Fragment>
    <header className={styles.header}>
      <p className={styles.container}>Gatsby Plugins Are the Cat’s Pajamas</p>
    </header>
    <main className={styles.container}>{children}</main>
  </React.Fragment>
);
