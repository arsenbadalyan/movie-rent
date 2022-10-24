import styles from '../Content.module.css';
const QU_0 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  return (
    <div>
      <input
        type="text"
        value={answers.qu_0}
        onChange={(ev) => {
          dispatchAnswer({
            type: 'qu_0',
            payload: { text: ev.target.value, listing },
          });
        }}
      />
    </div>
  );
};

export default QU_0;
