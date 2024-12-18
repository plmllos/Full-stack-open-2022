const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part, i) => {
        return (
          <p key={i}>
            {part.name} {part.exercises}
          </p>
        );
      })}
      <strong> total of {total} exercises </strong>
    </div>
  );
};

export default Content;
