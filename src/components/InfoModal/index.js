import React from 'react';
import styles from './infoModal.module.css';

const InfoModal = ({ data }) => {
  return (
    <div className={styles.root}>
      <p>Description: {data.description}</p>
    </div>
  )
}

export default InfoModal;