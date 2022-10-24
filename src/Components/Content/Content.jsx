import React, { useCallback, useMemo } from 'react';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import styles from './Content.module.css';
import SuccessModal from './SuccessModal';
import QU_0 from './Questions/QU_0';
import QU_1 from './Questions/QU_1';
import QU_2 from './Questions/QU_2';
import QU_3 from './Questions/QU_3';
import QU_4 from './Questions/QU_4';
import QU_5 from './Questions/QU_5';
import QU_6 from './Questions/QU_6';
import QU_7 from './Questions/QU_7';
import { useState } from 'react';

// Answer Reducer
const answersInit = {
  qu_0: '',
  qu_1: {
    name: '',
    current: '',
    list: [
      { val: 'Yes', id: 'yes' },
      { val: 'No', id: 'no' },
      { val: 'Not Sure', id: 'ns' },
    ],
  },
  qu_2: {
    current: {
      item: '',
      value: '',
    },
    list: [
      {
        item: 'PC DVD-ROM',
        value: 'pcdvdrom',
      },
      {
        item: 'Macintosh DVD-ROM',
        value: 'macintoshdvdrom',
      },
      {
        item: 'Sony PlayStation 2/Microsoft X-Box',
        value: 'sps2mcxbox',
      },
      {
        item: 'Console Top DVD player',
        value: 'consoledvdplayer',
      },
      {
        item: 'None',
        value: 'none',
      },
      {
        item: 'Other',
        value: 'other',
      },
    ],
  },
  qu_3: {
    name: '',
    current: '',
    list: [
      { val: 'Purchase', id: 'purchase' },
      { val: 'Rent', id: 'rent' },
    ],
  },
  qu_4: '',
  qu_5: {
    fName: '',
    lName: '',
    email: '',
    list: [
      { val: '*First Name', id: 'fName' },
      { val: '*Last Name', id: 'lName' },
      { val: '*Email', id: 'email' },
    ],
  },
  qu_6: '',
  qu_7: {
    name: '',
    current: '',
    list: [
      { val: 'Male', id: 'male' },
      { val: 'Female', id: 'female' },
    ],
  },
};

// Start Value
answersInit.qu_2.current = {
  item: answersInit.qu_2.list[0].item,
  value: answersInit.qu_2.list[0].value,
};

const answerReducer = (state, action) => {
  const { canList, setCanList } = action.payload.listing;
  let changeState = false;
  if (action.type == 'qu_0') {
    if (action.payload.text.trim().length) {
      changeState = true;
      setCanList({
        ...canList,
        availableListing: changeState,
      });
    } else {
      setCanList({
        maxAvailablePage: +action.type.split('_')[1],
        availableListing: false,
      });
    }
    return {
      ...state,
      qu_0: action.payload.text,
    };
  } else if (action.type == 'qu_1') {
    if (action.payload.name.trim().length) {
      changeState = true;
    }
    setCanList({
      ...canList,
      availableListing: changeState,
    });
    return {
      ...state,
      qu_1: {
        ...state.qu_1,
        name: action.payload.name,
        current: action.payload.current,
      },
    };
  } else if (action.type == 'qu_2') {
    const curVal = action.payload.value;
    let curItem = state.qu_2.list.filter((el) => el.value == curVal);
    curItem = curItem[0].item;
    return {
      ...state,
      qu_2: {
        current: {
          item: curItem,
          value: curVal,
        },
        list: [...state.qu_2.list],
      },
    };
  } else if (action.type == 'qu_3') {
    if (action.payload.name.trim().length) {
      changeState = true;
    }
    setCanList({
      ...canList,
      availableListing: changeState,
    });
    return {
      ...state,
      qu_3: {
        name: action.payload.name,
        current: action.payload.current,
        list: [...state.qu_3.list],
      },
    };
  } else if (action.type == 'qu_4') {
    if (+action.payload.text > 0) {
      changeState = true;
    }
    setCanList({
      ...canList,
      availableListing: changeState,
    });
    return {
      ...state,
      qu_4: action.payload.text,
    };
  } else if (action.type == 'qu_5') {
    changeState = true;
    state.qu_5.list.forEach((el) => {
      if (state.qu_5[el.id].trim().length == 0) changeState = false;
    });
    if (action.payload.text.trim().length == 0) changeState = false;
    if (!changeState) {
      setCanList({
        maxAvailablePage: +action.type.split('_')[1],
        availableListing: false,
      });
    } else {
      setCanList({
        ...canList,
        availableListing: changeState,
      });
    }
    return {
      ...state,
      qu_5: {
        ...state.qu_5,
        [action.payload.changeInput]: action.payload.text,
      },
    };
  } else if (action.type == 'qu_6') {
    if (action.payload.date != '') {
      changeState = true;
    }
    setCanList({
      ...canList,
      availableListing: changeState,
    });
    return {
      ...state,
      qu_6: action.payload.date,
    };
  } else if (action.type == 'qu_7') {
    if (action.payload.name.trim().length) {
      changeState = true;
      const btn = document.querySelector('#submit_all');
      btn.style.display = 'block';
    }
    setCanList({
      ...canList,
      availableListing: changeState,
    });
    return {
      ...state,
      qu_7: {
        ...state.qu_7,
        name: action.payload.name,
        current: action.payload.current,
      },
    };
  }
};

// Button Handle and Final Object Making
const finalAnswerList = {};

const handleCancelClick = () => {
  const modal = document.querySelector('#sub_modal');
  modal.style.display = 'none';
};

const handleSubmitClick = () => {
  axios
    .post(`http://demo8816397.mockable.io/complete-survey`, finalAnswerList)
    .then((res) => {
      if (res.status == 200) {
        handleCancelClick();
        const success = document.querySelector('#successModal');
        success.style.display = 'block';
      }
    })
    .catch((rej) => console.log(rej));
};

// Main Container
const Content = ({ q_id, listing }) => {
  const { canList, setCanList } = listing;
  useEffect(() => {
    if (q_id == 2) {
      setCanList({
        ...canList,
        availableListing: true,
      });
    }
  }, [q_id]);
  // Questions
  const questions = [
    "When would you purchase a DVD player if you don't already own one?",
    'Would you be interested in software that allows you to have control over profanity, nudity, and violence in movies?',
    'What type of DVD player do you own?',
    'Do you mainly purchase or rent movies you view?',
    'How much do you spend renting and/or buying movies per month(in USD)?',
    'Type your first name, last name and email address',
    'When is your birthday?',
    'What is your gender?',
  ];
  // Answers
  const [answers, dispatchAnswer] = useReducer(answerReducer, answersInit);
  useEffect(() => {
    for (let key in answers) {
      const id = document.getElementById(key);
      const current = answers[key];
      if (key == 'qu_0' || key == 'qu_4' || key == 'qu_6') {
        finalAnswerList[key] = current;
      } else if (key == 'qu_1' || key == 'qu_3' || key == 'qu_7') {
        finalAnswerList[key] = current.name;
      } else if (key == 'qu_2') {
        finalAnswerList[key] = current.current.item;
      } else if (key == 'qu_5') {
        let str = '';
        current.list.forEach((el, index) => {
          if (index) str += ' ';
          str += current[el.id];
        });
        finalAnswerList[key] = str;
      }
      id.innerText = finalAnswerList[key];
    }
  }, [answers]);
  return (
    <div className={styles.Content}>
      <div id="successModal" className={styles.successModal}>
        <SuccessModal />
      </div>

      <div id="sub_modal" className={styles.submit_modal}>
        <div className={styles.submit_modal__content}>
          <h1 className={styles.submit_modal__title}>Your Answers</h1>
          <div className={styles.submit_modal__container}>
            <div className={styles.answers_list}>
              {questions.map((el, index) => {
                let id = 'qu_' + index;
                return (
                  <div key={index} className={styles.question__item}>
                    <p>{el}</p>
                    <p>
                      <span>Your Answer: </span>
                      <u>
                        <span id={id}></span>
                      </u>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.submit_modal__footer}>
            <h2>“Are you sure, you want to submit the survey”</h2>
            <div className={styles.submit_modal__footer_btns}>
              <button className={styles.cancel_btn} onClick={handleCancelClick}>
                Cancel
              </button>
              <button
                className={styles.success_btn}
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.question_list}>
        <div className={styles.question}>
          <h1>{questions[q_id]}</h1>
        </div>
        <div className={styles.question_container}>
          {
            {
              0: <QU_0 changeAnswer={[answers, dispatchAnswer, listing]} />,
              1: <QU_1 changeAnswer={[answers, dispatchAnswer, listing]} />,
              2: <QU_2 changeAnswer={[answers, dispatchAnswer, listing]} />,
              3: <QU_3 changeAnswer={[answers, dispatchAnswer, listing]} />,
              4: <QU_4 changeAnswer={[answers, dispatchAnswer, listing]} />,
              5: <QU_5 changeAnswer={[answers, dispatchAnswer, listing]} />,
              6: <QU_6 changeAnswer={[answers, dispatchAnswer, listing]} />,
              7: <QU_7 changeAnswer={[answers, dispatchAnswer, listing]} />,
            }[q_id]
          }
        </div>
      </div>
    </div>
  );
};

export default Content;
