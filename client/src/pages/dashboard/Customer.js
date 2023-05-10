import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { useParams } from "react-router-dom";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../store/services/authService";
import Spinner from "../../components/Spinner";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import { useDispatch, useSelector } from "react-redux";
const Customer = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { success } = useSelector((state) => state.globalReducer);
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    data = [],
    isFetching,
    refetch,
  } = useAllUsersQuery(page, {
    enabled: !isDeleted, // disable the query when isDeleted is true
  });
  console.log("Data", data);
  const dispatch = useDispatch();

  const [removeUser, response] = useDeleteUserMutation();
  console.log(response);
  const deleteUser = (id) => {
    if (window.confirm("Are you really want to delete the category?")) {
      removeUser(id).then(() => setIsDeleted(true));
    }
  };

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  }, [response?.data?.message, dispatch, response.isSuccess]);

  useEffect(() => {
    if (isDeleted) {
      refetch();
      setIsDeleted(false);
    }
  }, [isDeleted, refetch]);
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);
  return (
    <Wrapper>
      <ScreenHeader>
        <h1 className="btn-dark w-[150px]">All customers</h1>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.users?.length > 0 ? (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-sm font-medium text-gray-100">
                      name
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-100">
                      Email
                    </th>

                    <th className="p-3 uppercase text-sm font-medium text-gray-100">
                      <i className="bi bi-trash"></i>delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((users) => (
                    <tr key={users._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {users.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {users.email}
                      </td>

                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(users._id)}
                        >
                          <i className="bi bi-trash"></i> delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          "No user"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Customer;
