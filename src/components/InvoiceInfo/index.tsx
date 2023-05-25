import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/icon-arrow-l.svg";
import { AnimatePresence, motion } from "framer-motion";
import PaidStatus from "../PaidStatus";
import { useDispatch, useSelector } from "react-redux";
import invoiceSlice from "../../redux/invoiceSlice";
import formatDate from "../../utils/formatDate";
import DeleteModal from "../DeleteModal";
import CreateInvoice from "../CreateInvoice";
import { Invoice, Item } from "../../types/types";
import { RootState } from "../../redux/store";

interface InvoiceInfoProps {
  onDelete: (id: string) => void;
}

function InvoiceInfo({ onDelete }: InvoiceInfoProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const invoiceId = location.search.substring(1);
  const onMakePaidClick = () => {
    dispatch(
      invoiceSlice.actions.updateInvoiceStatus({
        id: invoiceId,
        status: "paid",
      })
    );
    dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
  };

  useEffect(() => {
    dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
  }, [invoiceId, onMakePaidClick]);

  const onDeleteButtonClick = () => {
    navigate("/");
    setIsDeleteModalOpen(false);
    onDelete(invoiceId);
  };

  const invoice = useSelector((state: RootState) => state.invoices.invoiceById);

  console.log(invoice);

  return (
    <div>
      {invoice ? (
        <motion.div
          key="invoice-info"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: "200%" }}
          transition={{ duration: 0.5 }}
          className="mx-auto min-h-screen max-w-3xl bg-[#f8f8fb] px-2 py-[34px] duration-300 dark:bg-[#141625] md:px-8 lg:px-12 lg:py-[72px] "
        >
          <div className="">
            <button
              onClick={() => navigate(-1)}
              className=" dark:text-white group flex  items-center  space-x-4 font-thin "
            >
              <img className="" src={leftArrow} />
              <p className=" group-hover:opacity-80">Go back</p>
            </button>

            <div className=" bg-white mt-8 flex w-full items-center justify-between rounded-lg px-6 py-6 dark:bg-[#1e2139]">
              <div className=" flex w-full items-center justify-between space-x-2 md:w-auto md:justify-start">
                <h1 className=" text-gray-600 dark:text-gray-400">Status</h1>
                <PaidStatus type={invoice.status} />
              </div>
              <div className=" hidden md:block">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className=" bg-slate-100 rounded-full p-3 px-7  text-center text-[#7e88c3] hover:opacity-80 dark:bg-[#252945] "
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className=" text-white bg-red-500  ml-3 rounded-full p-3 px-7 text-center hover:opacity-80"
                >
                  Delete
                </button>
                {invoice.status === "pending" && (
                  <button
                    onClick={onMakePaidClick}
                    className=" text-white ml-3  rounded-full bg-[#7c5dfa] p-3 px-7 text-center hover:opacity-80"
                  >
                    Make as Paid
                  </button>
                )}
              </div>
            </div>

            <div className=" bg-white mt-4 w-full  rounded-lg px-6 py-6 dark:bg-[#1e2139]">
              <div className=" flex w-full flex-col items-start justify-between md:flex-row ">
                <div>
                  <h1 className=" dark:text-white text-xl font-semibold">
                    <span className="text-[#7e88c3]">#</span>
                    {invoice.id}
                  </h1>
                  <p className=" text-gray-500 text-sm">{invoice.clientName}</p>
                </div>
                <div className=" text-gray-400 felx mt-4 flex-col items-center text-left text-sm md:mt-0 md:text-right">
                  <p>{invoice.senderAddress.street}</p>
                  <p>{invoice.senderAddress.city}</p>
                  <p>{invoice.senderAddress.postCode}</p>
                  <p>{invoice.senderAddress.country}</p>
                </div>
              </div>

              <div className=" mt-10 grid w-full grid-cols-2  md:grid-cols-3">
                <div className=" flex flex-col justify-between">
                  <div>
                    <h3 className=" text-gray-400 font-thin ">Invoice Date</h3>
                    <h1 className=" dark:text-white text-lg font-semibold">
                      {formatDate(Number(invoice.createdAt))}
                    </h1>
                  </div>
                  <div>
                    <h3 className=" text-gray-400 font-thin ">Payment Due</h3>
                    <h1 className=" dark:text-white text-lg font-semibold">
                      {formatDate(Number(invoice.paymentDue))}
                    </h1>
                  </div>
                </div>

                <div className="">
                  <p className=" text-gray-400 font-thin">Bill to</p>
                  <h1 className=" dark:text-white text-lg font-semibold">
                    {invoice.clientName}
                  </h1>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.street}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.city}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.postCode}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.country}
                  </p>
                </div>

                <div className=" mt-8 md:mt-0">
                  <p className=" text-gray-400 font-thin">Sent to</p>
                  <h1 className=" dark:text-white text-lg font-semibold">
                    {invoice.clientEmail}
                  </h1>
                </div>
              </div>

              {/* Last Section */}

              <div className=" mt-10 space-y-4 rounded-lg rounded-b-none bg-[#f9fafe] p-10 dark:bg-[#252945]  sm:hidden">
                {invoice.items.map((item: Item) => (
                  <div className=" dark:text-white flex justify-between text-lg">
                    <h1>{item.name}</h1>
                    <h1>${item.total}</h1>
                  </div>
                ))}
              </div>

              <div className=" mt-10 hidden space-y-4 rounded-lg rounded-b-none bg-[#f9fafe] p-10 dark:bg-[#252945]  sm:block">
                {invoice.items.map((item: Item) => (
                  <div key={item.name} className=" flex justify-around  ">
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Item name</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        {item.name}
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Qty.</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        {item.quantity}
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Item price</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        ${item.price}
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Total</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        ${item.total}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" text-white dark:bg-black bg-gray-700 flex justify-between rounded-lg rounded-t-none p-10 font-semibold ">
                <h3 className=" text-xl ">Amount Due</h3>

                <h1 className=" text-3xl">${invoice.total}</h1>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <p>Loading...</p>
      )}

      {isDeleteModalOpen && invoice?.id && (
        <DeleteModal
          onDeleteButtonClick={onDeleteButtonClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          invoiceId={invoice.id}
        />
      )}
      <AnimatePresence>
        {isEditOpen && invoice && (
          <CreateInvoice
            invoice={invoice as Invoice}
            type="edit"
            setOpenCreateInvoice={setIsEditOpen}
            // openCreateInvoice={isEditOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default InvoiceInfo;
