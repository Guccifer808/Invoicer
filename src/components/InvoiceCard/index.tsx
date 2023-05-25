import PaidStatus from "../PaidStatus";
import rightArrow from "src/assets/icon-arrow-r.svg";
import { Link } from "react-router-dom";

import { Invoice } from "src/types/types";

type Props = {
  invoice: Invoice;
};

const InvoiceCard = ({ invoice }: Props) => {
  return (
    <Link to={`invoice?${invoice.id}`}>
      {/* Desktop */}
      <div className="border-transparent rouded-lg hidden cursor-pointer items-center justify-between bg-light px-6 py-4 shadow-sm duration-300 ease-in-out hover:border hover:border-accentColor dark:bg-dark md:flex">
        <div className="flex items-center">
          <h2 className="dark:text-light">
            <span className="text-sky-500">#</span>
            {invoice.id}
          </h2>
          <h2 className=" text-gray-400 ml-6 text-sm font-light">
            Due {invoice.paymentDue}
          </h2>

          <h2 className=" text-gray-400 ml-10 text-sm font-light">
            {invoice.clientName}
          </h2>
        </div>
        <div className="  flex  items-center ">
          <h1 className=" dark:text-white mr-8  text-xl">$ {invoice.total}</h1>

          <PaidStatus type={invoice.status} />

          <img src={rightArrow} className=" ml-4" />
        </div>
      </div>

      {/* Phone Screen */}
      <div className=" border-purple-500 bg-white flex cursor-pointer items-center justify-between rounded-lg px-6 py-4 shadow-sm hover:border  dark:bg-[#1E2139] md:hidden">
        <div className=" flex flex-col">
          <h2 className=" dark:text-white ">
            <span className=" text-[#7e88c3]">#</span>
            {invoice.id}
          </h2>

          <h2 className=" text-gray-400 mt-3 text-sm font-light ">
            Due {invoice.paymentDue}
          </h2>
          <h1 className=" dark:text-white  text-xl">$ {invoice.total}</h1>
        </div>

        <div className=" flex   flex-col">
          <h2 className=" text-gray-400 mb-4 text-right text-sm  font-light  ">
            {invoice.clientName}
          </h2>

          <PaidStatus type={invoice.status} />
        </div>
      </div>
    </Link>
  );
};

export default InvoiceCard;
