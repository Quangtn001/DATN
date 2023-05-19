import { useParams, Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useGetOrdersQuery } from "../../store/services/orderService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
const Orders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { data, isFetching } = useGetOrdersQuery(page);
  return (
    <Wrapper>
      <ScreenHeader>
        <p className="text-2xl uppercase font-bold">Quản lý đơn hàng</p>
      </ScreenHeader>
      {!isFetching ? (
        data?.orders?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">Tên</th>
                    <th className="dashboard-th">Số lượng</th>
                    <th className="dashboard-th">Hình ảnh</th>
                    <th className="dashboard-th">Tình trạng nhận</th>
                    <th className="dashboard-th">Tình trạng đơn</th>
                    <th className="dashboard-th">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr
                      key={order._id}
                      className="odd:bg-gray-100 even:bg-gray-200"
                    >
                      <td className="dashboard-td">{order.productId?.title}</td>
                      <td className="dashboard-td">{order.quantities}</td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${order.productId?.image1}`}
                          alt="image_name"
                          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover"
                        />
                      </td>
                      <td className="dashboard-td">
                        {order.received ? "Đã nhận" : "Chưa nhận"}
                      </td>
                      <td
                        className={`${
                          order.status === "Chưa xử lý"
                            ? "text-red-600"
                            : order.status === "Hủy"
                            ? "text-red-600"
                            : order.status === "Đang xử lý"
                            ? "text-blue-600"
                            : "text-green-600"
                        } dashboard-td font-medium`}
                      >
                        {order.status}
                      </td>
                      <td className="dashboard-td">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="btn btn-warning bg-indigo-600 text-xs font-bold"
                        >
                          Chi tiết
                        </Link>
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
              path="dashboard/orders"
            />
          </>
        ) : (
          "Không có đơn hàng nào!"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Orders;
