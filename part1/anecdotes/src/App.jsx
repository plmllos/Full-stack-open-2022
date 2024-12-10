import { useState } from "react";

const App = () => {
  const array = Array(8).fill(0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(array);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomAnecdote = () => Math.floor(Math.random() * anecdotes.length);

  const handleBtn = () => {
    setSelected(randomAnecdote());
  };

  const handleVotes = () => {
    setPoints((prevPoints) => {
      const copy = [...prevPoints];
      copy[selected] += 1;
      return copy;
    });
  };

  const getHighestVoted = (arr) => {
    const maxVotes = Math.max(...arr);
    return arr.indexOf(maxVotes);
  };

  const highestVoted = getHighestVoted(points);

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVotes}>Vote</button>
      <button onClick={handleBtn}>Next anecdote</button>
      <h3>Anecdote with most votes</h3>
      {points[highestVoted] > 0 && (
        <p>
          {anecdotes[highestVoted]} has {points[highestVoted]} votes.
        </p>
      )}
    </div>
  );
};

export default App;
