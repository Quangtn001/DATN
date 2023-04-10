import React, { useEffect } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
const Category = () => {
  const { success } = useSelector((state) => state.globalReducer);
  console.log(success);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn-dark">
          add categories <i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
    </Wrapper>
  );
};

export default Category;
