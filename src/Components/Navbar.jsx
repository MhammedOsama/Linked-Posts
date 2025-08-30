import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { useContext } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setUserData } = useContext(AuthContext);

  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <HeroNavbar>
      <NavbarBrand>
        <Link to={"/"} className='font-bold text-inherit'>
          Linked Posts
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        {isLoggedIn ? (
          <>
            <NavbarItem onClick={logOut} className='cursor-pointer'>
              Log out
            </NavbarItem>
            <NavbarItem>
              <NavLink to={"/profile"}>Profile</NavLink>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink to={"/register"}>Sign Up</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to={"/login"}>Sign In</NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroNavbar>
  );
}

export default Navbar;
