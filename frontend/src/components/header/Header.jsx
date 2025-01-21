import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth.slice";
import Checkbox from "../UI/checkbox/Checkbox";
import Title from "../UI/title/Title";
import "./Header.css";

const Header = ({ changeHideDone, hideDone }) => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Checkbox changeHideDone={changeHideDone} hideDone={hideDone} />
      <Title text={"my todo list"} />
      <button className="log-out" onClick={handleLogoutClick}>
        Log out
      </button>
    </header>
  );
};

export default Header;
