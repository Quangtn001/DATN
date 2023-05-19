import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import {
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiFillDashboard,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authReducer";

const AccountList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  return (
    <>
      <NavLink to="/user" className="account-list">
        <AiFillDashboard size={22} />
        <span className="account-list-title">Dashboard</span>
      </NavLink>
      <NavLink to={`/profile/${user?.id}`} className="account-list">
        <BsPersonCircle size={22} />
        <span className="account-list-title">Thông tin cá nhân</span>
      </NavLink>
      <NavLink to="/orders" className="account-list">
        <AiOutlineShoppingCart size={22} />
        <span className="account-list-title">Đơn hàng</span>
      </NavLink>
      <span
        className="account-list cursor-pointer"
        onClick={() => dispatch(logout("userToken"))}
      >
        <AiOutlineLogout size={22} />
        <span className="account-list-title">Đăng xuất</span>
      </span>
    </>
  );
};

export default AccountList;
