import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback === 0 ? 0 : (good - bad) / totalFeedback;
  const positiveFeedbackPercentage = totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;

  return (
    <div>
      <h2><b>statistics</b></h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalFeedback} />
          <StatisticLine text="average" value={averageScore} />
          <StatisticLine text="positive" value={positiveFeedbackPercentage + '%'} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
    setFeedbackGiven(true);
  };

  return (
    <div>
      <h1><b>give feedback</b></h1>
      <Button handleClick={() => handleFeedback('good')} text="Good" />
      <Button handleClick={() => handleFeedback('neutral')} text="Neutral" />
      <Button handleClick={() => handleFeedback('bad')} text="Bad" />

      {feedbackGiven && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  );
};

export default App;
