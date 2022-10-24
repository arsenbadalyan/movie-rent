import styles from '../Content.module.css';
const QU_5 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  const qu_5List = answers.qu_5.list;
  return (
    <div className={styles.inputList}>
      {qu_5List.map((el) => {
        return (
          <input
            key={el.id}
            type="text"
            value={answers.qu_5[el.id]}
            placeholder={el.val}
            onChange={(ev) => {
              dispatchAnswer({
                type: 'qu_5',
                payload: { changeInput: el.id, text: ev.target.value, listing },
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default QU_5;
