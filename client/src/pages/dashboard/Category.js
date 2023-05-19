import React, { useEffect } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
const Category = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { data = [], isFetching } = useGetQuery(page);
  // delete category
  const [removeCategory, response] = useDeleteCategoryMutation();
  const deleteCat = (id) => {
    if (window.confirm("Are you really want to delete the category?")) {
      removeCategory(id);
    }
  };
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  }, [response?.data?.message, dispatch, response.isSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/create-category"
          className="btn btn-warning p-4 font-bold"
        >
          Thêm danh mục <i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className="w-full bg-gray-200 rounded-md">
                <thead>
                  <tr className="border-b bg-gray-200 text-left">
                    <th className="p-3 uppercase text-lg font-medium text-black">
                      Tên danh mục
                    </th>
                    <th className="p-3 uppercase text-lg font-medium text-black">
                      <i className="bi bi-pencil-square"></i> Sửa
                    </th>
                    <th className="p-3 uppercase text-lg font-medium text-black">
                      <i className="bi bi-trash"></i>Xóa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-50">
                      <td className="p-3 capitalize text-sm font-medium text-black">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-medium text-black">
                        <Link
                          to={`/dashboard/update-category/${category._id}`}
                          className="btn btn-warning"
                        >
                          <i className="bi bi-pencil-square"></i> edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-medium text-black">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCat(category._id)}
                        >
                          <i className="bi bi-trash"></i> delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Category;
