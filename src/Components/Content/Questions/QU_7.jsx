import styles from '../Content.module.css';
import { useRef } from 'react';
import { useEffect } from 'react';

const handleClick = (ev) => {
  const modal = document.querySelector('#sub_modal');
  modal.style.display = 'block';
};

const QU_7 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  const qu_7List = answers.qu_7.list;
  useEffect(() => {
    if (answers.qu_7.name.trim().length > 0) {
      const btn = document.querySelector('#submit_all');
      btn.style.display = 'block';
    }
  }, []);
  return (
    <div className={styles.r_c_list}>
      {qu_7List.map((el) => {
        return (
          <label key={el.id} htmlFor={el.id} className={styles.label_body}>
            {el.val}
            <input
              type="radio"
              name="question_7"
              id={el.id}
              value={el.id}
              checked={answers.qu_7.current == el.id}
              onChange={() => {
                dispatchAnswer({
                  type: 'qu_7',
                  payload: { name: el.val, current: el.id, listing },
                });
              }}
            />
            <span className={styles.cus_radio}></span>
          </label>
        );
      })}
      <button
        className={styles.submit_btn}
        id="submit_all"
        onClick={handleClick}
      >
        Complete Survey
      </button>
    </div>
  );
};

export default QU_7;
