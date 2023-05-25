import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import arrowDown from "../../assets/icon-arrow-d.svg";
import plus from "../../assets/plus.png";
import InvoiceCard from "../InvoiceCard";
import { useDispatch, useSelector } from "react-redux";
import invoiceSlice from "../../redux/invoiceSlice";
import CreateInvoice from "../CreateInvoice";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
interface Invoice {
  id: string;
  // Add other properties from your invoice type
}

const Main: React.FC = () => {
  const location = useLocation();
  const controls = useAnimation();
  const dispatch = useDispatch();
  const filter: string[] = ["paid", "pending", "draft"];
  const [isDropdown, setIsDropdown] = useState(false);
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);

  const [filterValue, setFilterValue] = useState("");

  const invoices: Invoice[] = useSelector(
    (state: RootState) => state.invoices.filteredInvoice
  );

  useEffect(() => {
    dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }));
  }, [filterValue, dispatch]);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    });
  }, [controls]);

  const transition = {
    stiffness: 200,
  };

  const variants = {
    open: { opacity: 1, x: -20, duration: 200, transition },
    close: { opacity: 0, x: -100, duration: 500, transition },
  };

  return (
    <div>
      <div className="min-h-screen bg-[#f8f8fb] px-2 py-[34px] duration-300 scrollbar-hide dark:bg-[#141625] md:px-8 lg:px-12 lg:py-[72px]">
        <motion.div
          key={location.pathname}
          initial={{ x: "0" }}
          animate={{ x: 0 }}
          exit={{ x: "-150%" }}
          transition={{ duration: 0.5 }}
          className="mx-auto my-auto flex max-w-3xl flex-col"
        >
          {/* Center Header */}

          <div className="flex max-h-[64px] min-w-full items-center justify-between">
            <div>
              <h1 className="dark:text-white text-xl font-semibold tracking-wide md:text-2xl lg:text-4xl">
                Invoices
              </h1>
              <p className="text-gray-500 font-light">
                There are {invoices.length} total invoices.
              </p>
            </div>

            <div className="flex max-h-full items-center">
              <div className="flex items-center">
                <p className="dark:text-white hidden font-medium md:block">
                  Filter by status
                </p>
                <p className="dark:text-white font-medium md:hidden">Filter</p>
                <div
                  onClick={() => {
                    setIsDropdown((state) => !state);
                  }}
                  className="ml-3 cursor-pointer"
                >
                  {
                    <motion.img
                      src={arrowDown}
                      animate={
                        isDropdown
                          ? { transition, rotate: -180 }
                          : { transition, rotate: 0 }
                      }
                    />
                  }
                </div>
              </div>
              {isDropdown && (
                <motion.div
                  // initial="open" // CHECK IF WORKS !!!
                  as="select"
                  variants={variants}
                  animate={isDropdown ? "open" : "close"}
                  className="absolute top-[160px] z-50 flex w-40 flex-col space-y-2 rounded-xl bg-light px-6 py-4 shadow-2xl dark:bg-dark dark:text-light lg:top-[120px]"
                >
                  {/* <select> */}
                  {filter.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        item === filterValue
                          ? setFilterValue("")
                          : setFilterValue(item);
                      }}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <input
                        value={item}
                        checked={filterValue === item ? true : false}
                        type="checkbox"
                        className="accent-[#7c5dfa] hover:accent-[#7c5dfa]"
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                  {/* </select> */}
                </motion.div>
              )}

              <button
                onClick={() => setOpenCreateInvoice(true)}
                className="ml-4 flex items-center space-x-2 rounded-full bg-[#7c5dfa] px-2 py-2 hover:opacity-80 md:ml-10 md:space-x-3"
              >
                <img src={plus} alt="" />
                <p className="text-white hidden text-lg font-semibold md:block">
                  New
                </p>
                {/* <p className="text-white block text-base font-semibold md:hidden"></p> */}
              </button>
            </div>
          </div>

          {/* Invoice Cards */}

          <div className="mt-10 space-y-4">
            {invoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 },
                }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <InvoiceCard invoice={invoice} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {openCreateInvoice && (
          <CreateInvoice
            openCreateInvoice={openCreateInvoice}
            setOpenCreateInvoice={setOpenCreateInvoice}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
