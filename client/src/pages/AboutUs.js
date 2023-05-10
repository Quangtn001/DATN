import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const AboutUs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Về chúng tôi</title>
      </Helmet>
      <NavBar />
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-16 bg-blueGray-50 mt-10"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-800">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-4xl font-bold text-white">ABOUT US</h4>
                  <p className="text-md font-light mt-2 text-white">
                    Chào mừng bạn đến với chúng tôi - nơi tạo nên những không
                    gian sống đích thực và ấm cúng. Tại đây, chúng tôi tin rằng
                    ngôi nhà là nơi mang đến cảm giác hạnh phúc, nơi bạn có thể
                    tìm thấy sự yên bình và động lực để làm việc, sáng tạo và
                    tận hưởng cuộc sống.
                  </p>
                </blockquote>
              </div>
            </div>
            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="bi bi-1-circle text-3xl" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Sứ mệnh</h6>
                      <p className="mb-4 text-blueGray-500">
                        Với sứ mệnh mang đến những sản phẩm nội thất chất lượng
                        cao và độc đáo, chúng tôi tận tâm xây dựng một không
                        gian sống đẹp đẽ, thể hiện cá nhân bạn và tạo nên những
                        kỷ niệm đáng nhớ. Từ những bộ sofa thoải mái và bàn ăn
                        sang trọng, đến những chiếc đèn trang trí tinh tế và các
                        vật trang trí độc đáo, chúng tôi mang đến sự lựa chọn đa
                        dạng và phong cách đa dạng để bạn tạo nên không gian
                        riêng của mình.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="bi bi-2-circle text-3xl" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Nguồn cảm hứng
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Trang web của chúng tôi được tạo ra với mục tiêu chia sẻ
                        những ý tưởng sáng tạo, các xu hướng thiết kế nội thất
                        mới nhất và những gợi ý trang trí độc đáo. Chúng tôi
                        mong muốn truyền cảm hứng cho bạn để bạn có thể tạo ra
                        không gian sống mà bạn mơ ước - một không gian phản ánh
                        cá nhân và mang đến sự thoải mái, sự hài lòng và sự hài
                        lòng cho bạn và gia đình.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="bi bi-3-circle text-3xl" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Mục tiêu</h6>
                      <p className="mb-4 text-blueGray-500">
                        Trang web của chúng tôi không chỉ là một nguồn thông
                        tin, mà còn là một cộng đồng nơi bạn có thể chia sẻ ý
                        tưởng, trao đổi thông tin và nhận được sự khuyến khích
                        từ những người có chung đam mê với không gian sống và
                        trang trí nội thất.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="bi bi-4-circle text-3xl" />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Kỳ Vọng</h6>
                      <p className="mb-4 text-blueGray-500">
                        Hãy khám phá trang web của chúng tôi và để cảm hứng lan
                        tỏa vào không gian sống của bạn. Chúng tôi hy vọng rằng
                        bạn sẽ tìm thấy những ý tưởng và thông tin hữu ích, và
                        bạn sẽ tận hưởng việc tạo ra một không gian sống đẹp đẽ
                        và đáng yêu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative bg-blueGray-50 pt-8 pb-6 mt-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Hãy liên hệ với chúng tôi!{" "}
                  <Link
                    className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
      <Footer />
    </>
  );
};

export default AboutUs;
