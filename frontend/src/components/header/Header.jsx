import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth.slice";
import Checkbox from "./checkbox/Checkbox";
import Title from "./title/Title";
import "./Header.css";

const Header = ({ changeHideDone, hideDone }) => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Checkbox changeHideDone={changeHideDone} hideDone={hideDone} />
      <Title />
      <button className="log-out" onClick={handleLogoutClick}>
        Log out
      </button>
    </header>
  );
};

export default Header;
