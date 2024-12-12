import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const renderContent = course.map((item) => (
    <div key={item.id}>
      <Header course={item.name} />
      <Content parts={item.parts} />
    </div>
  ));

  return (
    <div>
      <h1>Web Development curriculum</h1>
      {renderContent}
    </div>
  );
};

export default Course;
