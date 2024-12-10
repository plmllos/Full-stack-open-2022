import { useState } from "react";

const StatisticLine = ({ text, value, percent }) => {
  const cellStyle = {
    width: "100px",
  };

  return (
    <table>
      <tbody>
        <tr>
          <td style={cellStyle}>{text}:</td>
          <td>
            {value} {percent}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const allValues = good + neutral + bad;
  const average = (good - bad) / allValues;
  const positivePercentage = (100 * good) / allValues;

  return (
    <div>
      <h4> Statistics </h4>
      {allValues === 0 && <p> No feedback given </p>}
      {allValues >= 1 && (
        <div>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"All"} value={allValues} />
          <StatisticLine text={"Average"} value={average} />
          <StatisticLine
            text={"Positive"}
            value={positivePercentage}
            percent={"%"}
          />
        </div>
      )}
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h3> Give feedback </h3>
      <Button onClick={handleGood} text={"Good"} />
      <Button onClick={handleNeutral} text={"Neutral"} />
      <Button onClick={handleBad} text={"Bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
