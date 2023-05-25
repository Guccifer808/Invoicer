import { TrashIcon } from "@heroicons/react/24/solid";
import {
  validateItemCount,
  validateItemName,
  validateItemPrice,
} from "../../utils/createInvoiceValidator";

function AddItem({
  itemDetails,
  setItem,
  isValidatorActive,
  onDelete,
  handelOnChange,
}) {
  return (
    <div>
      <div className=" dark:text-white flex items-center justify-between">
        <div className=" flex flex-wrap ">
          <div className="  flex flex-col items-start   px-2 py-2">
            <h1>Item Name</h1>
            <input
              name="name"
              onChange={(e) => {
                handelOnChange(itemDetails.id, e);
              }}
              value={itemDetails.name}
              type="text"
              className={` focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                isValidatorActive &&
                !validateItemName(itemDetails.name) &&
                "border-red-500 dark:border-red-500 outline-red-500 border-2"
              }   dark:border-gray-800`}
            />
          </div>

          <div className=" flex flex-col items-start  px-2 py-2">
            <h1>Qty.</h1>
            <input
              name="quantity"
              type="number"
              onChange={(e) => {
                handelOnChange(itemDetails.id, e);
              }}
              value={itemDetails.quantity}
              min={0}
              className={` focus:outline-purple-400 border-gray-300 max-w-[60px] rounded-lg border-[.2px]  px-4 py-2 focus:outline-none dark:bg-[#1e2139] ${
                isValidatorActive &&
                !validateItemCount(itemDetails.quantity) &&
                "border-red-500 dark:border-red-500 outline-red-500 border-2"
              }   dark:border-gray-800`}
            />
          </div>

          <div className=" flex flex-col items-start  px-2 py-2">
            <h1>Price</h1>
            <input
              name="price"
              type="number"
              onChange={(e) => {
                handelOnChange(itemDetails.id, e);
              }}
              value={itemDetails.price}
              min={0}
              className={` focus:outline-purple-400 border-gray-300 max-w-[100px] rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                isValidatorActive &&
                !validateItemPrice(itemDetails.price) &&
                "border-red-500 dark:border-red-500 outline-red-500 border-2"
              }   dark:border-gray-800`}
            />
          </div>

          <div className=" flex flex-col items-start  px-2 py-2">
            <h1>Total</h1>
            <div className=" focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white max-w-[100px] rounded-lg border-[.2px]   px-4 py-2 focus:outline-none dark:bg-[#1e2139]">
              {itemDetails.total}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            onDelete(itemDetails.id);
          }}
        >
          <TrashIcon className=" text-gray-500 hover:text-red-500 mt-4 h-6 w-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default AddItem;
