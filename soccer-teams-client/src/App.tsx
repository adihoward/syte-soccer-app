import React from 'react';
import styles from './App.module.css';
import { NavBar } from './components/NavBar/NavBar';
import { TeamsTable } from './components/TeamsTable/TeamsTable';

function App() {
  return (
    <div className={styles.app}>
      <NavBar />
      <TeamsTable />
    </div>
  );
}

export default App;