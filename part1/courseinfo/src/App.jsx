const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part1 = ({ part1, exercise1 }) => (
  <p>
    {part1} {exercise1}
  </p>
);

const Part2 = ({ part2, exercise2 }) => (
  <p>
    {part2} {exercise2}
  </p>
);

const Part3 = ({ part3, exercise3 }) => (
  <p>
    {part3} {exercise3}
  </p>
);

const Content = ({ parts }) => {
  const partOne = parts[0].name;
  const exerciseOne = parts[0].exercise;
  const partTwo = parts[1].name;
  const exerciseTwo = parts[1].exercise;
  const partThree = parts[2].name;
  const exerciseThree = parts[2].exercise;

  return (
    <div>
      <Part1 part1={partOne} exercise1={exerciseOne} />
      <Part2 part2={partTwo} exercise2={exerciseTwo} />
      <Part3 part3={partThree} exercise3={exerciseThree} />
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercise + parts[1].exercise + parts[2].exercise}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
