import styles from './SuccessModal.module.css';

const SuccessModal = () => {
  return (
    <div
      className={`${styles.modal} ${styles.fade} ${styles.success_tic}`}
      role="dialog"
    >
      <div className={styles.modal_dialog}>
        <div className={styles.modal_content}>
          <div className={styles.page_body}>
            <div className={styles.head}>
              <h3>Congratulations!!</h3>
              <h4>Your data has been send</h4>
            </div>

            <h1>
              <div className={styles.checkmark_circle}>
                <div className={styles.background}></div>
                <div className={`${styles.checkmark} ${styles.draw}`}></div>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
