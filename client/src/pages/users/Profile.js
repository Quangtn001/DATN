import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../store/services/authService";
import AccountList from "../../components/Home/AccountList";
import Header from "../../components/Home/Header";
import NavBar from "../../components/Home/NavBar";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetUserByIdQuery(id);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thông tin cá nhân</title>
      </Helmet>
      <NavBar />
      <div className="mt-[70px]">
        <Header>my account</Header>
        <div className="my-container mt-[40px]">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full md:w-4/12 p-6">
              <AccountList />
            </div>
            <div className="w-full md:w-8/12 p-6">
              <h1 className="heading">My profile</h1>
              <div className="h-full">
                <div className="border-b-2 block md:flex">
                  <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                    <div className="rounded  shadow p-6">
                      <div className="pb-6">
                        <label
                          htmlFor="name"
                          className="font-semibold text-gray-700 block pb-1"
                        >
                          Name
                        </label>
                        <div className="flex">
                          <input
                            disabled
                            id="username"
                            className="border  rounded-r px-4 py-2 w-full"
                            type="text"
                            value={data.name}
                            readOnly
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
                          disabled
                          id="email"
                          className="border  rounded-r px-4 py-2 w-full"
                          type="email"
                          value={data.email}
                          readOnly
                        />
                        <span className="text-gray-600 pt-4 block opacity-70 mt-2">
                          <Link
                            to={`/profile-edit/${data._id}`}
                            className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                          >
                            Edit
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
