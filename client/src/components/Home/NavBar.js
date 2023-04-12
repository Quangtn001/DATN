import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { toggleSearchBar } from "../../store/reducers/globalReducer";
const NavBar = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  //   //   const { searchBar } = useSelector((state) => state.globalReducer);
  //   const { items, total } = useSelector((state) => state.cartReducer);
  //   console.log(total);
  //   const dispatch = useDispatch();
  return (
    <nav className="nav">
      <div className="my-container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              className="h-full w-[120px] object-cover"
              alt="logo"
            />
          </Link>
          <ul className="flex items-center">
            <li className="nav-li cursor-pointer">
              <FiSearch size={22} />
            </li>
            {userToken ? (
              <li className="nav-li">
                <Link to="/user" className="nav-link">
                  {user?.name}
                </Link>
              </li>
            ) : (
              <li className="nav-li">
                <Link to="/login" className="nav-link">
                  sign in
                </Link>
              </li>
            )}
            {/* <li className="nav-li">
              <Link to="/user" className="nav-link">
                Quang
              </Link>
            </li> */}
            <li className="nav-li relative">
              <Link to="/cart">
                <BsHandbag size={20} />
                <span className="nav-circle">2</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
