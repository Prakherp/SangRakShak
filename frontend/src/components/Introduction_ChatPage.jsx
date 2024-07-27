import React from 'react';
import styles from './Introduction_ChatPage.module.css';

const IntroPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Sangrakshak</h1>
      <p className={styles.paragraph}>
        <span className={styles.highlight}>Sangrakshak</span> is a groundbreaking chatbot designed to empower Indian women facing legal challenges. We understand the complexities and sensitivities involved in legal matters, and we are here to provide you with the support you need.
      </p>
      <p className={styles.paragraph}>
        As a confidential ally, <span className={styles.highlight}>Sangrakshak</span> offers guidance on legal rights, procedures, and support resources. Our aim is to help you navigate through the legal landscape with confidence and ease.
      </p>
      <p className={styles.paragraph}>
        For now, our chatbot is equipped to answer only direct queries related to legal matters. We do not support chit-chat conversations such as "Hi," "Hello," etc. This ensures that we stay focused on providing you with accurate and relevant information.
      </p>
      <p className={styles.paragraph}>
        Thank you for choosing <span className={styles.highlight}>Sangrakshak</span> as your trusted legal companion. We are here to assist you every step of the way.
      </p>
    </div>
  );
};

export default IntroPage;
