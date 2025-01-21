import "./Title.css";

const Title = ({ text }) => {
  return (
    <div className="todo-title">
      <h1 className="todo-title-text">{text}</h1>
    </div>
  );
};

export default Title;
