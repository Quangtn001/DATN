import React, { useState, useEffect } from "react";
import NavBar from "../../../components/Home/NavBar";
import Header from "../../../components/Home/Header";
import { motion } from "framer-motion";
import { useForgotPasswordMutation } from "../../../store/services/authService";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, isSuccess, isError }] =
    useForgotPasswordMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };
  useEffect(() => {
    if (isSuccess || isError) {
      setEmail("");
    }
  }, [isSuccess, isError]);

  const goback = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quên mật khẩu</title>
      </Helmet>
      <NavBar />
      <div className="mt-[70px] pb-[80px]">
        <Header>Forgot Password</Header>
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
              <div className="flex items-center justify-between font-bold text-3xl cursor-pointer">
                <h1 className="heading mb-5">Forgot Password</h1>
                <MdKeyboardBackspace onClick={goback} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder="Please enter your email to reset password..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    Check your email for password reset instructions.
                  </div>
                )}
                {isError && (
                  <div>
                    <div
                      class="font-bold p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      Email is not resgited! Please try again?
                    </div>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
