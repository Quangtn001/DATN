import React, { useEffect, useState } from "react";
import NavBar from "../../../components/Home/NavBar";
import Header from "../../../components/Home/Header";
import { motion } from "framer-motion";
import { useResetPasswordMutation } from "../../../store/services/authService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ token, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login"); // chuyển hướng đến trang /login sau 3s
      }, 1500);
    }
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset</title>
      </Helmet>
      <NavBar />
      <div className="mt-[70px] pb-[80px]">
        <Header>Reset Password</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg -mt-12 border border-gray-200 p-10"
            >
              <h1 className="heading mb-5">Reset Password</h1>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  New password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Please fill your new password to reset password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="token" className="form-label">
                  Your token key
                </label>
                <input
                  type="text"
                  name="token"
                  id="token"
                  className="form-input"
                  placeholder="Please fill your token to reset password..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <button
                  className="btn btn-indigo w-full "
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                {isSuccess && (
                  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 font-bold">
                    Password reset successful.
                  </div>
                )}
                {isError && <div>Error: {error.message}</div>}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
