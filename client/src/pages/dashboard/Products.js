import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetProductsQuery(page);
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch, success]);
  const [delProduct] = useDeleteProductMutation();

  const deleteProduct = (id) => {
    if (window.confirm("Are you really want to delete this product?")) {
      delProduct(id);
    }
  };
  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/create-product"
          className="btn btn-warning p-4 font-bold"
        >
          Thêm sản phẩm <i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" />
      {!isFetching ? (
        data?.products?.length > 0 ? (
          <div>
            <table className="w-full bg-white rounded-md">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="p-3 uppercase text-xl font-bold text-black">
                    Tên
                  </th>
                  <th className="p-3 uppercase text-xl font-bold text-black">
                    Giá
                  </th>
                  <th className="p-3 uppercase text-xl font-bold text-black">
                    Số lượng kho
                  </th>
                  <th className="p-3 uppercase text-xl font-bold text-black">
                    Hình ảnh
                  </th>
                  <th className="p-3 uppercase text-xl font-bold text-black">
                    Sửa
                  </th>
                  <th className="p-3 uppercase text-xl font-bold text-black">
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((product) => (
                  <tr className="odd:bg-gray-200" key={product._id}>
                    <td className="p-3 capitalize text-sm font-medium text-black">
                      {product.title}
                    </td>
                    <td className="p-3 capitalize text-sm font-medium text-black">
                      ${product.price}.00
                    </td>
                    <td className="p-3 capitalize text-sm font-medium text-black">
                      {product.stock}
                    </td>
                    <td className="p-3 capitalize text-sm font-medium text-black">
                      <img
                        src={`/images/${product.image1}`}
                        alt="image_name"
                        className="w-20 h-20 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3 capitalize text-sm font-medium text-black">
                      <Link
                        to={`/dashboard/edit-product/${product._id}`}
                        className="btn btn-warning"
                      >
                        Sửa
                      </Link>
                    </td>
                    <td className="p-3 capitalize text-sm font-medium text-black">
                      <span
                        className="btn btn-danger cursor-pointer"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Xóa
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
          </div>
        ) : (
          "No products!"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
