import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import ScreenHeader from "../../components/ScreenHeader";
import { Link, useNavigate } from "react-router-dom";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import { useCProductMutation } from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import ImagePreview from "../../components/ImagePreview";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../store/reducers/globalReducer";
const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();

  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    image1: "",
    image2: "",
    image3: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const [createNewProduct, response] = useCProductMutation();
  const createPro = (e) => {
    e.preventDefault();
    setState({ ...state, description: value });
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    formData.append("description", value);
    formData.append("image1", state.image1);
    formData.append("image2", state.image2);
    formData.append("image3", state.image3);
    createNewProduct(formData);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors?.map((err) => {
        return toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors, response.isSuccess]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess, dispatch, navigate, response?.data?.msg]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/products"
          className="btn btn btn-warning p-4 font-bold"
        >
          <i className="bi bi-arrow-left-short"></i>All Products
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex flex-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createPro}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">
                title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                placeholder="title..."
                onChange={handleInput}
                value={state.title}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="price" className="label">
                price
              </label>
              <input
                type="number"
                name="price"
                className="form-control"
                id="price"
                placeholder="price..."
                onChange={handleInput}
                value={state.price}
                min={0}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="discount" className="label">
                discount
              </label>
              <input
                type="number"
                name="discount"
                className="form-control"
                id="discount"
                placeholder="discount..."
                onChange={handleInput}
                value={state.discount}
                min={0}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="stock" className="label">
                stock
              </label>
              <input
                type="number"
                name="stock"
                className="form-control"
                id="stock"
                placeholder="stock..."
                onChange={handleInput}
                value={state.stock}
                min={0}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="categories" className="label">
                categories
              </label>
              {!isFetching ? (
                data?.categories?.length > 0 && (
                  <select
                    name="category"
                    id="categories"
                    className="form-control"
                    onChange={handleInput}
                    value={state.category}
                  >
                    <option value="">Choose category</option>
                    {data?.categories?.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <div className="w-full p-3">
              <label htmlFor="image1" className="label">
                Image 1
              </label>
              <input
                type="file"
                name="image1"
                id="image1"
                className="input-file"
                onChange={imageHandle}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="image2" className="label">
                Image 2
              </label>
              <input
                type="file"
                name="image2"
                id="image2"
                className="input-file"
                onChange={imageHandle}
              />
            </div>

            <div className="w-full p-3">
              <label htmlFor="image3" className="label">
                Image 3
              </label>
              <input
                type="file"
                name="image3"
                id="image3"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="description" className="label">
                Description
              </label>
              <ReactQuill
                theme="snow"
                id="description"
                value={value}
                onChange={setValue}
                placeholder="Description..."
                style={{ border: "1px solid black" }}
              />
            </div>
            <div className="w-full p-3">
              <input
                type="submit"
                value={response.isLoading ? "Loading..." : "Save Product"}
                disabled={response.isLoading ? true : false}
                className="btn btn-indigo"
              />
            </div>
          </div>
        </form>
        <div className="w-full xl:w-4/12 p-3">
          <ImagePreview url={preview.image1} heading="image 1" />
          <ImagePreview url={preview.image2} heading="image 2" />
          <ImagePreview url={preview.image3} heading="image 3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
