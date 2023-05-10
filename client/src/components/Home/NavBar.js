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
import { RiMenuLine, RiCloseFill } from "react-icons/ri";

const NavBar = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  console.log(searchBar);
  const { items } = useSelector((state) => state.cartReducer);
  console.log(items);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const { data = [], isFetching } = useAllCategoriesQuery();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };
  const handleCloseMenu = () => {
    setMobileMenuVisible(false);
  };
  return (
    <>
      <nav className="nav">
        <div className="my-container">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                src="/logo.png"
                className="h-[60px] w-full object-cover"
                alt="logo"
              />
            </Link>
            <div className="relative hidden md:flex items-center gap-5 w-full lg:max-w-sm cursor-pointer ">
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
                      <div className="p-2 hover:bg-gray-200 shadow-sm text-black font-semibold ">
                        <Link to={`/cat-products/${item.name}`}>
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-5 font-medium uppercase ">
                <Link to="/about" className="hover:text-violet-600">
                  About Us
                </Link>
                <Link className="hover:text-violet-600" to="/contact">
                  Contact Us
                </Link>
              </div>
            </div>

            <ul className="flex items-center justify-center">
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
              <li className="nav-li md:hidden cursor-pointer">
                <RiMenuLine size={22} onClick={toggleMobileMenu} />
              </li>
            </ul>
            {mobileMenuVisible && (
              <div className="absolute top-0 right-0 h-screen w-8/12 bg-white border">
                <div className="flex flex-col items-center text-black gap-5 w-full pt-10">
                  <div className="flex items-center cursor-pointer">
                    <p
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="font-medium uppercase"
                    >
                      Category
                    </p>
                    {!isFetching && !isOpen ? (
                      <IoMdArrowDropdown />
                    ) : (
                      <IoMdArrowDropup />
                    )}
                  </div>
                  {isOpen && (
                    <div className="bg-white shadow-xl w-[300px] p-5 rounded-lg overflow-y-auto">
                      {data.categories.map((item) => (
                        <div
                          key={item.name}
                          className="p-2 hover:bg-gray-200 shadow-sm text-black font-semibold"
                        >
                          <Link
                            to={`/cat-products/${item.name}`}
                            className="py-2 px-6 rounded-md"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link
                    to="/about"
                    className="uppercase font-medium py-2 px-6 rounded-md text-black hover:bg-gray-200"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="uppercase font-medium py-2 px-6 rounded-md text-black hover:bg-gray-200"
                  >
                    Contact Us
                  </Link>
                  {/* ...add other mobile menu items as needed... */}
                </div>
                <div className="absolute top-0 cursor-pointer">
                  <RiCloseFill size={30} onClick={handleCloseMenu} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default NavBar;
