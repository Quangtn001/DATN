import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
import { useAllCategoriesQuery } from "../../store/services/categoryService";

const NavBar = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  console.log(searchBar);
  const { items } = useSelector((state) => state.cartReducer);
  console.log(items);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const { data = [], isFetching } = useAllCategoriesQuery();
  return (
    <>
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
            <div className="relative flex items-center gap-5 w-full lg:max-w-sm cursor-pointer ">
              <div className="flex items-center ">
                <p
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="font-medium uppercase hover:text-violet-600"
                >
                  Category
                </p>
                {!isFetching && !isOpen ? (
                  <IoMdArrowDropdown />
                ) : (
                  <IoMdArrowDropup />
                )}
                {isOpen && (
                  <div className="absolute bg-white shadow-lg top-8 w-[200px] p-5 drop-shadow-lg">
                    {data.categories.map((item) => (
                      <div className="p-2 border-solid border-2 hover:bg-violet-600 hover:text-white ">
                        <Link to={`/cat-products/${item.name}`}>
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden md:flex items-center gap-5 font-medium uppercase ">
                <Link className="hover:text-violet-600">About Us</Link>
                <Link className="hover:text-violet-600" to="/contact">
                  Contact Us
                </Link>
              </div>
            </div>

            <ul className="flex items-center">
              <li className="nav-li cursor-pointer">
                <FiSearch
                  size={22}
                  onClick={() => dispatch(toggleSearchBar())}
                />
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
              <li className="nav-li relative">
                <Link to="/cart">
                  <BsHandbag size={20} />
                  <span className="nav-circle">{items}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default NavBar;
