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
import ProductList from "./ProductList";

const NavBar = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { items } = useSelector((state) => state.cartReducer);

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
                className=" w-[100px] h-full object-cover mt-3"
                alt="logo"
              />
            </Link>
            <div className="relative hidden md:flex items-center gap-5 w-full lg:max-w-sm cursor-pointer ">
              <div className="flex items-center ">
                <p
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="font-medium uppercase hover:text-violet-600"
                >
                  Danh mục
                </p>
                {!isFetching && !isOpen ? (
                  <IoMdArrowDropdown />
                ) : (
                  <IoMdArrowDropup />
                )}
                {isOpen && (
                  <div className="absolute bg-white top-8 w-[5000px] p-5 flex gap-5 shadow-md">
                    {data.categories.map((item) => (
                      <ul className=" text-black font-semibold">
                        <li>
                          <Link
                            to={`/cat-products/${item.slug}`}
                            className="uppercase"
                          >
                            {item.name}
                          </Link>
                          <ul>
                            <ProductList slug={item.slug} />
                          </ul>
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-5 font-medium uppercase ">
                <Link to="/about" className="hover:text-violet-600">
                  Về chúng tôi
                </Link>
                <Link className="hover:text-violet-600" to="/contact">
                  Liên hệ
                </Link>
              </div>
            </div>

            <ul className="flex items-center justify-center">
              <li className="nav-li cursor-pointer">
                <FiSearch
                  className="md:text-lg"
                  onClick={() => dispatch(toggleSearchBar())}
                />
              </li>
              {userToken ? (
                <li className="nav-li hidden md:block">
                  <Link to="/user" className="nav-link">
                    {user?.name}
                  </Link>
                </li>
              ) : (
                <li className="nav-li">
                  <Link
                    to="/login"
                    className="nav-link text-xs md:text-base whitespace-nowrap"
                  >
                    Đăng nhập
                  </Link>
                </li>
              )}
              <li className="nav-li relative">
                <Link to="/cart">
                  <BsHandbag className="text-[16px] md:text-xl" />
                  <span className="nav-circle">{items}</span>
                </Link>
              </li>
              <li className="nav-li md:hidden cursor-pointer">
                <RiMenuLine className="text-lg" onClick={toggleMobileMenu} />
              </li>
            </ul>
            {mobileMenuVisible && (
              <div className="absolute top-0 right-0 h-screen w-8/12 bg-white border">
                <div className="flex flex-col items-center text-black gap-5 w-full pt-10">
                  <Link to="/">
                    <img
                      src="/logo.png"
                      className=" w-[200px] object-cover"
                      alt="logo"
                    />
                  </Link>
                  <div className="flex items-center cursor-pointer">
                    <p
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="font-medium uppercase"
                    >
                      Danh mục
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
                        <ul
                          key={item.name}
                          className="p-2 hover:bg-gray-200 shadow-sm text-black font-semibold"
                        >
                          <li>
                            <Link
                              to={`/cat-products/${item.slug}`}
                              className="py-2 px-6 rounded-md"
                            >
                              {item.name}
                            </Link>
                            <ul>
                              <ProductList categoryName={item.name} />
                            </ul>
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                  <Link
                    to="/about"
                    className="uppercase font-medium py-2 px-6 rounded-md text-black hover:bg-gray-200"
                  >
                    Về chúng tôi
                  </Link>
                  <Link
                    to="/contact"
                    className="uppercase font-medium py-2 px-6 rounded-md text-black hover:bg-gray-200"
                  >
                    Liên hệ
                  </Link>
                  {/* ...add other mobile menu items as needed... */}
                  <ul className="flex flex-col gap-6 items-center">
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
                          Đăng nhập
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
