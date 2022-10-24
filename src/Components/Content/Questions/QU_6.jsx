import styles from '../Content.module.css';

const QU_6 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  return (
    <div className={styles.r_c_list}>
      <input
        type="date"
        value={answers.qu_6}
        className={styles.date_s}
        min="1900-01-01"
        max="2011-01-01"
        onChange={(ev) =>
          dispatchAnswer({
            type: 'qu_6',
            payload: { date: ev.target.value, listing },
          })
        }
      />
    </div>
  );
};

export default QU_6;
