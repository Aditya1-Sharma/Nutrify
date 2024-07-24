import { userContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const loggedData = useContext(userContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("nutrify-user");
    loggedData.setLoggedUser(null);
    navigate("/login");
  }
  return (
    <div>
      <ul>
        <li>Home</li>
        <li onClick={logout}>
          <Link to="/logout">Logout</Link>{" "}
        </li>
      </ul>
    </div>
  );
}

export default Header;
