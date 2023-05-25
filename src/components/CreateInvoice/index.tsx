import { useState } from "react";
import { motion } from "framer-motion";
import AddItem from "../AddItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import invoiceSlice from "src/redux/invoiceSlice";
import {
  validateSenderStreetAddress,
  validateSenderPostCode,
  validateSenderCity,
  validateClientEmail,
  validateClientName,
  validateClientCity,
  validateClientPostCode,
  validateClientStreetAddress,
  validateItemCount,
  validateItemName,
  validateItemPrice,
  validateSenderCountry,
  validateClientCountry,
} from "src/utils/createInvoiceValidator";

interface Props {
  openCreateInvoice: boolean;
  setOpenCreateInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  invoice: Invoice;
  type: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
  id: string;
}

interface Invoice {
  id: string;
  clientName: string;
  clientAddress: {
    city: string;
    street: string;
    postCode: string;
    country: string;
  };
  clientEmail: string;
  paymentTerms: number;
  description: string;
  senderAddress: {
    city: string;
    street: string;
    postCode: string;
    country: string;
  };
  items: Item[];
}

const CreateInvoice: React.FC<Props> = ({
  openCreateInvoice,
  setOpenCreateInvoice,
  invoice,
  type,
}) => {
  const dispatch = useDispatch();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValidatorActive, setIsValidatorActive] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [filterValue, setfilterValue] = useState("");
  const deliveryTimes = [
    { text: "Next 1 day", value: 1 },
    { text: "Next 7 day", value: 7 },
    { text: "Next 14 day", value: 14 },
    { text: "Next 30 day", value: 30 },
  ];
  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostCode, setSenderPostCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");

  const [selectDeliveryDate, setSelectDeliveryDate] = useState("");
  const [paymentTerms, setpaymentTerms] = useState(deliveryTimes[0].value);

  const [item, setItem] = useState<Item[]>([
    {
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
      id: uuidv4(),
    },
  ]);
  const onDelete = (id: string) => {
    setItem((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handelOnChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let data = [...item];

    let foundData = data.find((el) => el.id === id);

    if (foundData) {
      if (e.target.name === "name") {
        foundData.name = e.target.value;
      } else if (e.target.name === "quantity") {
        foundData.quantity = parseInt(e.target.value);
        foundData.total = foundData.quantity * foundData.price;
      } else if (e.target.name === "price") {
        foundData.price = parseInt(e.target.value);
        foundData.total = foundData.quantity * foundData.price;
      }
    }

    setItem(data);
  };

  const handleAddItem = () => {
    setItem((prevState) => [
      ...prevState,
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
        id: uuidv4(),
      },
    ]);
  };

  const handleCreateInvoice = () => {
    setIsValidatorActive(true);

    // Validate inputs
    const isSenderStreetValid = validateSenderStreetAddress(senderStreet);
    const isSenderCityValid = validateSenderCity(senderCity);
    const isSenderPostCodeValid = validateSenderPostCode(senderPostCode);
    const isSenderCountryValid = validateSenderCountry(senderCountry);

    const isClientNameValid = validateClientName(clientName);
    const isClientEmailValid = validateClientEmail(clientEmail);
    const isClientStreetValid = validateClientStreetAddress(clientStreet);
    const isClientCityValid = validateClientCity(clientCity);
    const isClientPostCodeValid = validateClientPostCode(clientPostCode);
    const isClientCountryValid = validateClientCountry(clientCountry);

    const isItemCountValid = validateItemCount(item.length);
    const isItemNameValid = item.every((el) => validateItemName(el.name));
    const isItemPriceValid = item.every((el) => validateItemPrice(el.price));

    const isValid =
      isSenderStreetValid &&
      isSenderCityValid &&
      isSenderPostCodeValid &&
      isSenderCountryValid &&
      isClientNameValid &&
      isClientEmailValid &&
      isClientStreetValid &&
      isClientCityValid &&
      isClientPostCodeValid &&
      isClientCountryValid &&
      isItemCountValid &&
      isItemNameValid &&
      isItemPriceValid;

    setIsValid(isValid);

    if (isValid) {
      const newInvoice: Invoice = {
        id: invoice.id,
        clientName: clientName,
        clientAddress: {
          city: clientCity,
          street: clientStreet,
          postCode: clientPostCode,
          country: clientCountry,
        },
        clientEmail: clientEmail,
        paymentTerms: paymentTerms,
        description: description,
        senderAddress: {
          city: senderCity,
          street: senderStreet,
          postCode: senderPostCode,
          country: senderCountry,
        },
        items: item,
      };

      dispatch(invoiceSlice.actions.updateInvoice(newInvoice));
      setOpenCreateInvoice(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenCreateInvoice(false);
      }}
      className="  fixed bottom-0 left-0 right-0 top-0  bg-[#000005be]"
    >
      <motion.div
        key="createInvoice-sidebar"
        initial={{ x: -500, opacity: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 40,
            duration: 0.4,
          },
        }}
        exit={{ x: -700, transition: { duration: 0.2 } }}
        className="dark:text-white bg-white flex h-screen flex-col px-6 py-16 scrollbar-hide dark:bg-[#141625] md:w-[768px] md:rounded-r-3xl md:pl-[150px]"
      >
        <h1 className="dark:text-white text-3xl font-semibold">
          {type == "edit" ? "Edit" : "Create"} Invoice
        </h1>

        <div className=" my-14 overflow-y-scroll scrollbar-hide">
          <h1 className=" mb-4 font-medium text-[#7c5dfa]">Bill From</h1>

          <div className=" mx-1 grid grid-cols-3  space-y-4 ">
            <div className=" col-span-3 flex flex-col">
              <label className=" text-gray-400 font-light">
                Street Address
              </label>
              <input
                value={senderStreet}
                id="senderStreet"
                onChange={(e) => setSenderStreet(e.target.value)}
                type="text"
                className={`focus:outline-purple-400 border-gray-300 dark:border-gray-800 rounded-lg border-[.2px]  px-4 py-2 focus:outline-none  dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateSenderStreetAddress(senderStreet) &&
                  " border-red-500 dark:border-red-500 outline-red-500 border-2"
                }`}
              />
            </div>

            <div className="col-span-1 mr-4 flex flex-col">
              <label className=" text-gray-400 font-light">City</label>
              <input
                type="text"
                value={senderCity}
                onChange={(e) => setSenderCity(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4 py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateSenderCity(senderCity) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                } dark:border-gray-800`}
              />
            </div>
            <div className="col-span-1 mr-4 flex flex-col">
              <label className="text-gray-400 font-light">Post Code</label>
              <input
                type="text"
                value={senderPostCode}
                onChange={(e) => setSenderPostCode(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateSenderPostCode(senderPostCode) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                } dark:border-gray-800`}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <label className="text-gray-400 font-light">Country</label>
              <input
                type="text"
                value={senderCountry}
                onChange={(e) => setSenderCountry(e.target.value)}
                className={`focus:outline-purple-400 rounded-lg border-[.2px] px-4 py-2  focus:outline-none  dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateSenderCountry(senderCountry) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                } border-gray-300 dark:border-gray-800`}
              />
            </div>
          </div>

          {/* Bill to Section */}

          <h1 className="my-4 mt-10 font-medium text-[#7c5dfa]">Bill To</h1>

          <div className="mx-1 grid grid-cols-3 space-y-4 ">
            <div className="col-span-3 flex flex-col">
              <label className=" text-gray-400 font-light">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateClientName(clientName) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                }   dark:border-gray-800`}
              />
            </div>

            <div className="col-span-3 flex flex-col">
              <label className=" text-gray-400 font-light">Client Email</label>
              <input
                type="text"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateClientEmail(clientEmail) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                }   dark:border-gray-800`}
              />
            </div>

            <div className="col-span-3 flex flex-col">
              <label className="text-gray-400 font-light">Street Address</label>
              <input
                type="text"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateClientStreetAddress(clientStreet) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                }   dark:border-gray-800`}
              />
            </div>

            <div className="col-span-1 mr-4 flex flex-col">
              <label className="text-gray-400 font-light">City</label>
              <input
                type="text"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateClientCity(clientCity) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                }   dark:border-gray-800`}
              />
            </div>
            <div className="col-span-1 mr-4 flex flex-col">
              <label className="text-gray-400 font-light">Post Code</label>
              <input
                type="text"
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateClientPostCode(clientPostCode) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                }   dark:border-gray-800`}
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <label className="text-gray-400 font-light">Country</label>
              <input
                type="text"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
                className={`focus:outline-purple-400 border-gray-300 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139] ${
                  isValidatorActive &&
                  !validateClientCountry(clientCountry) &&
                  "border-red-500 dark:border-red-500 outline-red-500 border-2"
                }   dark:border-gray-800`}
              />
            </div>
          </div>

          <div className="mx-1 mt-8 grid grid-cols-2 ">
            <div className="flex flex-col ">
              <label className="text-gray-400 font-light">Invoice Date</label>
              <input
                type="date"
                value={selectDeliveryDate}
                onChange={(e) => setSelectDeliveryDate(e.target.value)}
                className="focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white mr-4 rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139]"
              />
            </div>

            <div className="mx-auto w-full">
              <label className="text-gray-400 font-light">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setpaymentTerms(e.target.value)}
                className="dark:text-white dark:border-gray-800 focus:outline-purple-400 border-gray-300 select-status w-full appearance-none  rounded-lg border-[.2px] px-4  py-2 focus:outline-none dark:bg-[#1e2139]"
              >
                {deliveryTimes.map((time) => (
                  <option value={time.value}>{time.text}</option>
                ))}
              </select>
            </div>
          </div>

          <div className=" mx-1 mt-4 flex flex-col ">
            <label className=" text-gray-400 font-light">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className=" focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white rounded-lg border-[.2px]   px-4 py-2 focus:outline-none dark:bg-[#1e2139]"
            />
          </div>

          {/* Item List Section */}

          <h2 className=" text-gray-500 mt-10 text-2xl ">Item List</h2>
          {item.map((itemDetails, index) => (
            <div className=" border-gray-300 mb-4 border-b pb-2 ">
              <AddItem
                isValidatorActive={isValidatorActive}
                key={index}
                handelOnChange={handelOnChange}
                setItem={setItem}
                onDelete={onDelete}
                itemDetails={itemDetails}
              />
            </div>
          ))}

          <button
            onClick={() => {
              setItem((state) => [
                ...state,
                {
                  name: "",
                  quantity: 1,
                  price: 0,
                  total: 0,
                  id: uuidv4(),
                },
              ]);
            }}
            className=" bg-gray-200  dark:text-white mx-auto mt-6 w-full items-center justify-center rounded-xl py-2  hover:opacity-80 dark:bg-[#252945]"
          >
            + Add New Item
          </button>
        </div>

        <div className=" flex  justify-between">
          <div>
            <button
              onClick={() => {
                setOpenCreateInvoice(false);
              }}
              className=" bg-gray-200  dark:text-white mx-auto items-center justify-center rounded-full  px-8 py-4  hover:opacity-80 dark:bg-[#252945] "
            >
              Discard
            </button>
          </div>

          <div>
            <button
              className=" text-white  mx-auto items-center justify-center rounded-full bg-[#7c5dfa] px-8  py-4 hover:opacity-80 "
              onClick={() => {
                const isValid = validator();
                setIsValidatorActive(true);
                if (isValid) {
                  onSubmit();
                  setOpenCreateInvoice(false);
                }
              }}
            >
              Save & Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateInvoice;
