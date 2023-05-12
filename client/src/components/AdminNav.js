import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/authReducer";
const AdminNav = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const adminLogout = () => {
    dispatch(logout("admin-token"));
  };
  return (
    <>
      <nav className=" left-0 sm:left-64 top-4 right-0 mx-4 shadow-md">
        <div className="bg-white w-full flex justify-between sm:justify-end items-center p-4 shadow-md">
          <i
            className="bi bi-filter-left text-black text-5xl cursor-pointer sm:hidden block"
            onClick={openSidebar}
          ></i>
          <p className="mr-3 uppercase text-lg font-medium">Welcome admin!</p>
          <button
            className="py-2 px-4 bg-indigo-600 text-white rounded-md font-medium capitalize"
            onClick={adminLogout}
          >
            logout
          </button>
        </div>
      </nav>
      <hr />
    </>
  );
};
export default AdminNav;
