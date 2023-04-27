import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import AccountList from "../../components/Home/AccountList";
import NavBar from "../../components/Home/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/services/authService";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserByIdQuery(id);
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    if (data) {
      setState({
        name: data.name,
        email: data.email,
      });
    }
  }, [data]);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [updateUser, response] = useUpdateUserMutation();
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ id, name: state.name, email: state.email });
  };
  useEffect(() => {
    if (response?.isSuccess) {
      navigate(`/`);
    }
  }, [response?.isSuccess, dispatch, navigate, response?.data?.message]);
  return (
    <div>
      <NavBar />
      <div className="mt-[70px]">
        <Header>my account</Header>
        <div className="my-container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            {!isFetching ? (
              <>
                <div className="w-full md:w-8/12 p-6">
                  <h1 className="heading">My profile</h1>
                  <div className="h-full">
                    <div className="border-b-2 block md:flex">
                      <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                        <div className="rounded  shadow p-6">
                          <form onSubmit={handleUpdate}>
                            <div className="pb-6">
                              <label
                                htmlFor="name"
                                className="font-semibold text-gray-700 block pb-1"
                              >
                                Name
                              </label>
                              <div className="flex">
                                <input
                                  disabled=""
                                  id="username"
                                  name="name"
                                  className="border  rounded-r px-4 py-2 w-full"
                                  type="text"
                                  onChange={handleInput}
                                  value={state.name}
                                />
                              </div>
                            </div>

                            <div className="pb-4">
                              <label
                                htmlFor="about"
                                className="font-semibold text-gray-700 block pb-1"
                              >
                                Email
                              </label>
                              <input
                                disabled=""
                                id="email"
                                name="email"
                                className="border  rounded-r px-4 py-2 w-full"
                                type="email"
                                onChange={handleInput}
                                value={state.email}
                              />
                              <span className="text-gray-600 pt-4 block opacity-70 mt-2">
                                <button
                                  type="submit"
                                  className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                                >
                                  Update
                                </button>
                              </span>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
