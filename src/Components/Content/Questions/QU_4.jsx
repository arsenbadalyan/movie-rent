import styles from '../Content.module.css';
const QU_4 = ({ changeAnswer }) => {
  const [answers, dispatchAnswer, listing] = changeAnswer;
  return (
    <div>
      <input
        type="number"
        value={answers.qu_4}
        placeholder="0000"
        onChange={(ev) => {
          dispatchAnswer({
            type: 'qu_4',
            payload: { text: ev.target.value, listing },
          });
        }}
      />
    </div>
  );
};

export default QU_4;
