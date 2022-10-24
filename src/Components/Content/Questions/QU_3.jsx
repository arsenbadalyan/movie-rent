import styles from '../Content.module.css';

const QU_3 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  const qu_3List = answers.qu_3.list;
  return (
    <div className={styles.r_c_list}>
      {qu_3List.map((el) => {
        return (
          <label key={el.id} htmlFor={el.id} className={styles.label_body}>
            {el.val}
            <input
              type="radio"
              name="question_3"
              id={el.id}
              value={el.id}
              checked={answers.qu_3.current == el.id}
              onChange={() => {
                dispatchAnswer({
                  type: 'qu_3',
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

export default QU_3;
