import "./Checkbox.css";

const Checkbox = ({ changeHideDone, hideDone }) => {
    const checkboxChange = () => {
        changeHideDone();
    };
    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                className="todo-hide"
                name="hide-all"
                checked={hideDone}
                onChange={checkboxChange}
            />
            <label onClick={checkboxChange} htmlFor="hide-alla">
                Hide Completed ToDo
            </label>
        </div>
    );
};

export default Checkbox;
