import { toast } from "react-hot-toast";

const Quantity = ({ quantity, inc, dec, theme, setQuantity, max }) => {
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= max) {
      setQuantity(value);
    } else {
      toast.error("Hết hàng trong kho!");
    }
  };
  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>
      <div className="flex items-center border border-gray-200 rounded">
        <button
          type="button"
          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={dec}
        >
          −
        </button>
        <input
          type="number"
          id="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          max={max}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={inc}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
