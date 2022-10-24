import styles from '../Content.module.css';

const QU_1 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  const qu_1List = answers.qu_1.list;
  return (
    <div className={styles.r_c_list}>
      {qu_1List.map((el) => {
        return (
          <label key={el.id} htmlFor={el.id} className={styles.label_body}>
            {el.val}
            <input
              type="radio"
              name="question_1"
              id={el.id}
              value={el.id}
              checked={answers.qu_1.current == el.id}
              onChange={() => {
                dispatchAnswer({
                  type: 'qu_1',
                  payload: { name: el.val, current: el.id, listing },
                });
              }}
            />
            <span className={styles.cus_radio}></span>
          </label>
        );
      })}
    </div>
  );
};

export default QU_1;
