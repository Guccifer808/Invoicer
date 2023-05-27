import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddItem from '../AddItem';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import invoiceSlice from 'src/redux/invoiceSlice';
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
} from 'src/utils/createInvoiceValidator';
import { Invoice, InvoiceItem, ItemDetails } from 'src/types/types';

interface CreateInvoiceProps {
  // openCreateInvoice?: boolean;
  setOpenCreateInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  invoice?: Invoice;
  type?: string;
}

const CreateInvoice: React.FC<CreateInvoiceProps> = ({
  // openCreateInvoice,
  setOpenCreateInvoice,
  invoice,
  type,
}) => {
  const dispatch = useDispatch();

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isValidatorActive, setIsValidatorActive] = useState<boolean>(false);
  // const [isValid, setIsValid] = useState(true);

  const [filterValue] = useState('');
  const deliveryTimes = [
    { text: 'Next 1 day', value: 1 },
    { text: 'Next 7 day', value: 7 },
    { text: 'Next 14 day', value: 14 },
    { text: 'Next 30 day', value: 30 },
  ];
  const [senderStreet, setSenderStreet] = useState<string>('');
  const [senderCity, setSenderCity] = useState<string>('');
  const [senderPostCode, setSenderPostCode] = useState<string>('');
  const [senderCountry, setSenderCountry] = useState<string>('');

  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');

  const [clientStreet, setClientStreet] = useState<string>('');
  const [clientCity, setClientCity] = useState<string>('');
  const [clientPostCode, setClientPostCode] = useState<string>('');
  const [clientCountry, setClientCountry] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [selectDeliveryDate, setSelectDeliveryDate] = useState<string>('');
  const [paymentTerms, setpaymentTerms] = useState(deliveryTimes[0].value);

  const [item, setItem] = useState<ItemDetails[]>([
    {
      name: '',
      quantity: 1,
      price: 0,
      total: 0,
      id: uuidv4(),
    },
  ]);
  //DELETE
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
      if (e.target.name === 'quantity' || e.target.name === 'price') {
        foundData[e.target.name as keyof typeof foundData] = Number(
          e.target.value
        ) as never;
        foundData.total = Number(foundData.quantity) * Number(foundData.price);
      } else {
        foundData[e.target.name as keyof typeof foundData] = e.target
          .value as never;
      }

      setItem(data);
    }
  };

  const onSubmit = () => {
    // console.log("submitted");
    if (type === 'edit' && invoice) {
      const updatedItemsArray: InvoiceItem[] = item.map((obj) => ({
        ...obj,
        total: Number(obj.total),
      }));

      dispatch(
        invoiceSlice.actions.editInvoice({
          description,
          paymentTerms,
          clientName,
          clientEmail,
          senderStreet,
          senderCity,
          senderPostCode,
          senderCountry,
          clientStreet,
          clientCity,
          clientPostCode,
          clientCountry,
          item: updatedItemsArray,
          id: invoice.id,
        })
      );
      setOpenCreateInvoice(false);
    } else {
      const invoiceItems: InvoiceItem[] = item.map((obj) => ({
        ...obj,
        total: Number(obj.total),
      }));

      dispatch(
        invoiceSlice.actions.addInvoice({
          description,
          paymentTerms,
          clientName,
          clientEmail,
          senderStreet,
          senderCity,
          senderPostCode,
          senderCountry,
          clientStreet,
          clientCity,
          clientPostCode,
          clientCountry,
          item: invoiceItems,
        })
      );
      dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }));
    }
  };
  if (type === 'edit' && isFirstLoad && invoice) {
    const updatedItemsArray = invoice.items.map((obj, index) => {
      return { ...obj, id: (index + 1).toString() };
    });

    setClientName(invoice.clientName);
    setClientCity(invoice.clientAddress.city);
    setClientStreet(invoice.clientAddress.street);
    setClientPostCode(invoice.clientAddress.postCode);
    setClientCountry(invoice.clientAddress.country);
    setClientEmail(invoice.clientEmail);
    setpaymentTerms(invoice.paymentTerms);
    setDescription(invoice.description);
    setSenderCity(invoice.senderAddress.city);
    setSenderStreet(invoice.senderAddress.street);
    setSenderCountry(invoice.senderAddress.country);
    setSenderPostCode(invoice.senderAddress.postCode);
    setItem(updatedItemsArray);

    setIsFirstLoad(false);
  }

  function itemsValidator() {
    const itemName = item.map((i) => validateItemName(i.name));
    const itemCount = item.map((i) => validateItemCount(i.quantity));
    const itemPrice = item.map((i) => validateItemPrice(i.price));

    const allItemsElement = itemCount.concat(itemPrice, itemName);

    return allItemsElement.includes(false) === true ? false : true;
  }

  function validator() {
    if (
      validateSenderStreetAddress(senderStreet) &&
      validateSenderPostCode(senderPostCode) &&
      validateSenderCity(senderCity) &&
      validateClientEmail(clientEmail) &&
      validateClientName(clientName) &&
      validateClientCity(clientCity) &&
      validateClientPostCode(clientPostCode) &&
      validateClientStreetAddress(clientStreet) &&
      validateSenderCountry(senderCountry) &&
      validateClientCountry(clientCountry) &&
      itemsValidator()
    ) {
      return true;
    }

    return false;
  }

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenCreateInvoice(false);
      }}
      className='fixed bottom-0 left-0 right-0 top-0  bg-[#000005be]'
    >
      <motion.div
        key='createInvoice-sidebar'
        initial={{ x: -500, opacity: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 40,
            duration: 0.4,
          },
        }}
        exit={{ x: -700, transition: { duration: 0.2 } }}
        className='flex h-screen flex-col bg-light px-6 py-16 scrollbar-hide dark:bg-dark dark:text-light md:w-[768px] md:rounded-r-3xl md:pl-[150px]'
      >
        <h1 className='text-3xl font-semibold text-dark dark:text-light'>
          {type == 'edit' ? 'Edit' : 'Create'} Invoice
        </h1>

        <div className='my-14 overflow-y-scroll scrollbar-hide'>
          <h1 className='mb-4 font-medium text-accentColor'>Bill From</h1>

          <div className='mx-1 grid grid-cols-3  space-y-4 '>
            <div className='col-span-3 flex flex-col'>
              <label className='text-gray-400 font-light'>Street Address</label>
              <input
                value={senderStreet}
                id='senderStreet'
                onChange={(e) => setSenderStreet(e.target.value)}
                type='text'
                className={`border-gray-300 dark:border-gray-800 rounded-lg border-[.2px] px-4  py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateSenderStreetAddress(senderStreet) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }`}
              />
            </div>

            <div className='col-span-1 mr-4 flex flex-col'>
              <label className='text-gray-400 font-light'>City</label>
              <input
                type='text'
                value={senderCity}
                onChange={(e) => setSenderCity(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateSenderCity(senderCity) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                } dark:border-gray-800`}
              />
            </div>
            <div className='col-span-1 mr-4 flex flex-col'>
              <label className='text-gray-400 font-light'>Post Code</label>
              <input
                type='text'
                value={senderPostCode}
                onChange={(e) => setSenderPostCode(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2 focus:outline-none  focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateSenderPostCode(senderPostCode) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                } dark:border-gray-800`}
              />
            </div>
            <div className='col-span-1 flex flex-col'>
              <label className='text-gray-400 font-light'>Country</label>
              <input
                type='text'
                value={senderCountry}
                onChange={(e) => setSenderCountry(e.target.value)}
                className={`rounded-lg border-[.2px] px-4 py-2 focus:outline-none  focus:outline-accentColor  dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateSenderCountry(senderCountry) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                } border-gray-300 dark:border-gray-800`}
              />
            </div>
          </div>

          {/* Bill to Section */}

          <h1 className='my-4 mt-10 font-medium text-accentColor'>Bill To</h1>

          <div className='mx-1 grid grid-cols-3 space-y-4 '>
            <div className='col-span-3 flex flex-col'>
              <label className='text-gray-400 font-light'>Client Name</label>
              <input
                type='text'
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateClientName(clientName) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }   dark:border-gray-800`}
              />
            </div>

            <div className='col-span-3 flex flex-col'>
              <label className='text-gray-400 font-light'>Client Email</label>
              <input
                type='text'
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateClientEmail(clientEmail) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }   dark:border-gray-800`}
              />
            </div>

            <div className='col-span-3 flex flex-col'>
              <label className='text-gray-400 font-light'>Street Address</label>
              <input
                type='text'
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateClientStreetAddress(clientStreet) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }   dark:border-gray-800`}
              />
            </div>

            <div className='col-span-1 mr-4 flex flex-col'>
              <label className='text-gray-400 font-light'>City</label>
              <input
                type='text'
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateClientCity(clientCity) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }   dark:border-gray-800`}
              />
            </div>
            <div className='col-span-1 mr-4 flex flex-col'>
              <label className='text-gray-400 font-light'>Post Code</label>
              <input
                type='text'
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateClientPostCode(clientPostCode) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }   dark:border-gray-800`}
              />
            </div>
            <div className='col-span-1 flex flex-col'>
              <label className='text-gray-400 font-light'>Country</label>
              <input
                type='text'
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
                className={`border-gray-300 rounded-lg border-[.2px] px-4 py-2  focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                  isValidatorActive &&
                  !validateClientCountry(clientCountry) &&
                  'border-red-500 dark:border-red-500 outline-red-500 border-2'
                }   dark:border-gray-800`}
              />
            </div>
          </div>

          <div className='mx-1 mt-8 grid grid-cols-2 '>
            <div className='flex flex-col '>
              <label className='text-gray-400 font-light'>Invoice Date</label>
              <input
                type='date'
                value={selectDeliveryDate}
                onChange={(e) => setSelectDeliveryDate(e.target.value)}
                className='border-gray-300 dark:border-gray-800 mr-4 rounded-lg border-[.2px] px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary dark:text-light'
              />
            </div>

            <div className='mx-auto w-full'>
              <label className='text-gray-400 font-light'>Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setpaymentTerms(Number(e.target.value))}
                // onChange={(e) => setpaymentTerms(e.target.value)}
                className='dark:border-gray-800 border-gray-300 select-terms w-full appearance-none rounded-lg border-[.2px] px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary dark:text-light'
              >
                {deliveryTimes.map((time) => (
                  <option value={time.value} key={time.value}>
                    {time.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='mx-1 mt-4 flex flex-col '>
            <label className='text-gray-400 font-light'>Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              className='border-gray-300 dark:border-gray-800 rounded-lg border-[.2px] px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary dark:text-light'
            />
          </div>

          {/* Item List Section */}

          <h2 className='text-gray-500 mt-10 text-2xl '>Item List</h2>
          {item.map((itemDetails) => (
            <div
              className='border-gray-300 mb-4 border-b pb-2'
              key={itemDetails.id}
            >
              <AddItem
                isValidatorActive={isValidatorActive}
                handelOnChange={handelOnChange}
                // setItem={setItem}
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
                  name: '',
                  quantity: 1,
                  price: 0,
                  total: 0,
                  id: uuidv4(),
                },
              ]);
            }}
            className='bg-gray-200 mx-auto mt-6 w-full items-center justify-center rounded-xl py-2 hover:opacity-80 dark:bg-darkSecondary dark:text-light'
          >
            + Add New Item
          </button>
        </div>

        <div className='flex justify-between'>
          <div>
            <button
              onClick={() => {
                setOpenCreateInvoice(false);
              }}
              className='bg-gray-200 mx-auto items-center justify-center rounded-full px-8 py-4 hover:opacity-80 dark:bg-darkSecondary dark:text-light '
            >
              Discard
            </button>
          </div>

          <div>
            <button
              className='mx-auto items-center justify-center rounded-full bg-accentColor px-8 py-4 text-light hover:opacity-80 '
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
