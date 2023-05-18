import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { BsPrinter } from "react-icons/bs";
import currency from "currency-formatter";
import moment from "moment";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import Spinner from "../../components/Spinner";
import {
  useDetailsQuery,
  useUpdateOrderMutation,
} from "../../store/services/orderService";
import { discount } from "../../utils/discount";

const OrderDetails = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const { data, isFetching } = useDetailsQuery(id);
  const total =
    discount(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantities;

  const statusUpdate = ["Chưa xử lý", "Đang xử lý", "Đã giao", "Hủy"];
  const [changeStatus, setChangeStatus] = useState("");
  const [updateOrder] = useUpdateOrderMutation();
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setChangeStatus(newStatus);
    const orderId = data?.details?._id;
    if (newStatus && orderId) {
      updateOrder({ id: orderId, status: newStatus });
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <div className="flex items-center">
          <Link to="/dashboard/orders">
            <MdOutlineKeyboardBackspace />
          </Link>
          <span className="ml-4 text-2xl uppercase font-bold">
            Order Details
          </span>
          <span className="ml-4">
            <ReactToPrint
              trigger={() => (
                <button className="flex items-center btn bg-indigo-600 py-1 text-sm font-semibold px-3">
                  <BsPrinter /> <span className="ml-2">print</span>
                </button>
              )}
              content={() => componentRef.current}
            />
          </span>
        </div>
        <div className="px-8 flex gap-4 items-center mt-5">
          <p className="text-red-800 text-lg font-medium uppercase">
            Tình trạng đơn hàng :
          </p>
          <span>
            {!isFetching && data?.details?.status === "Đã giao" ? (
              <span className="text-green-600 font-medium">
                Đã giao thành công!
              </span>
            ) : (
              <>
                <select
                  className="appearance-none font-medium bg-white border border-gray-600 rounded px-4 py-1 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={handleStatusChange}
                >
                  {statusUpdate.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </select>
              </>
            )}
          </span>
        </div>
      </ScreenHeader>
      {!isFetching ? (
        <div ref={componentRef}>
          <h3 className="capitalize font-medium text-gray-800">
            Mã đơn hàng:{" "}
            <span className="text-lg text-gray-800 ml-4">
              #{data?.details?._id}
            </span>
          </h3>
          <h3 className="capitalize font-medium text-gray-800 mt-2">
            Ngày đặt hàng:{" "}
            <span className="text-sm text-gray-800 ml-4">
              {moment(data?.details?.createdAt).format("MMMM Do YYYY")}
            </span>
          </h3>
          <h3 className="capitalize font-medium text-gray-800 mt-2">
            Phương thức thanh toán:{" "}
            <span className="text-sm text-gray-800 ml-4">
              {data?.details?.paymentMethod === "COD"
                ? "Thanh toán khi nhận hàng"
                : "Thanh toán online"}
            </span>
          </h3>
          {data?.details?.received && (
            <h3 className="capitalize text-gray-800 mt-2">
              ngày nhận hàng:{" "}
              <span className="text-sm text-gray-800 ml-4">
                {moment(data?.details?.updatedAt).format("MMMM Do YYYY")}
              </span>
            </h3>
          )}

          <div className="flex flex-wrap -mx-5">
            <div className="w-full md:w-8/12 p-5">
              <div className="border px-2">
                <table className="bg-transparent border-gray-600 rounded-none md:rounded-md dashboard-table">
                  <thead>
                    <tr className="dashboard-tr">
                      <th className="dashboard-th">Tên</th>
                      <th className="dashboard-th">Hình ảnh</th>
                      <th className="dashboard-th">Số lượng</th>
                      <th className="dashboard-th">Giá</th>
                      <th className="dashboard-th">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="dashboard-td">
                        {data?.details?.productId?.title}
                      </td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${data?.details?.productId?.image1}`}
                          alt="image_name"
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </td>
                      <td className="dashboard-td">
                        {data?.details?.quantities}
                      </td>
                      <td className="dashboard-td">
                        {currency.format(
                          discount(
                            data?.details?.productId?.price,
                            data?.details?.productId?.discount
                          ),
                          { code: "USD" }
                        )}
                      </td>
                      <td className="dashboard-td">
                        {currency.format(total, { code: "USD" })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full md:w-4/12 p-5">
              <div className="border border-gray-600 rounded-none md:rounded-md p-4">
                <div className="border-b pb-3 border-b-gray-600">
                  <h4 className="capitalize  text-gray-800 text-xl">
                    Tên khách hàng :
                  </h4>
                  <span className="text-gray-800 text-base font-medium capitalize mt-2">
                    {data?.details?.userId?.name}
                  </span>
                </div>
                <div className="border-b pb-3 border-b-gray-600">
                  <h4 className="capitalize text-xl text-gray-800">
                    Tên sản phẩm
                  </h4>
                  <span className="text-gray-800 text-base font-medium capitalize mt-2">
                    {data?.details?.productId?.title}
                  </span>
                </div>

                <div>
                  <h4 className="capitalize text-xl text-gray-800 mt-2">
                    Địa chỉ giao hàng
                  </h4>
                  <div className="mt-2">
                    <span className="text-gray-800 capitalize block font-medium">
                      {data?.details?.address?.city} -{" "}
                      {data?.details?.address?.country} -{" "}
                      {data?.details?.address?.state}
                    </span>
                    {/* <span className="text-gray-800 capitalize block">
                      {data?.details?.address?.country}
                    </span>
                    <span className="text-gray-800 capitalize block">
                      {data?.details?.address?.state}
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};
export default OrderDetails;
