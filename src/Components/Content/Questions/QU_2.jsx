import styles from '../Content.module.css';

const QU_2 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  const selectList = answers.qu_2;
  return (
    <div className={`${styles.r_c_list} ${styles.select_option}`}>
      <select
        value={selectList.current.value}
        onChange={(ev) =>
          dispatchAnswer({
            type: 'qu_2',
            payload: { value: ev.target.value, item: ev, listing },
          })
        }
      >
        <option disabled value>
          -- select an option --
        </option>
        {selectList.list.map((el, index) => {
          return (
            <option key={index} value={el.value}>
              {el.item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default QU_2;
