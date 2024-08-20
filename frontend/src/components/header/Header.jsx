import "./Header.css";
import Checkbox from "./checkbox/Checkbox";
import Title from "./title/Title";

const Header = ({ changeHideDone, hideDone }) => {
    return (
        <header>
            <Checkbox changeHideDone={changeHideDone} hideDone={hideDone} />
            <Title />
        </header>
    );
};

export default Header;
