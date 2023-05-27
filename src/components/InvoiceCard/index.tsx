import PaidStatus from '../PaidStatus';
import rightArrow from 'src/assets/icon-arrow-r.svg';
import { Link } from 'react-router-dom';

import { Invoice } from 'src/types/types';

type InvoiceCardProps = {
  invoice: Invoice;
};
const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  return (
    <Link to={`invoice?${invoice.id}`}>
      {/* Desktop */}
      <div className='border-transparent hidden cursor-pointer items-center justify-between rounded-lg bg-light px-6 py-4 shadow-sm duration-300 ease-in-out hover:border hover:border-accentColor dark:bg-dark dark:shadow-darkSecondary md:flex'>
        <div className='flex w-1/2 items-center'>
          <h2 className='dark:text-light'>
            <span className='text-accentColor dark:text-bluish'>#</span>
            {invoice.id}
          </h2>
          <h2 className='ml-6 text-sm font-light text-gray dark:text-light'>
            Due {invoice.paymentDue}
          </h2>
          <h2 className='ml-10 text-sm font-light text-gray dark:text-light'>
            {invoice.clientName}
          </h2>
        </div>
        <div className='flex w-1/3 items-center justify-between'>
          <h1 className='mr-8 text-xl dark:text-light'>$ {invoice.total}</h1>

          <PaidStatus type={invoice.status} />

          <img src={rightArrow} className='ml-4' />
        </div>
      </div>

      {/* Phone Screen */}
      <div className='flex cursor-pointer items-center justify-between rounded-lg border-accentColor bg-light px-6 py-4 shadow-sm hover:border  dark:bg-darkSecondary md:hidden'>
        <div className='flex flex-col'>
          <h2 className='dark:text-light'>
            <span className='text-accentColor'>#</span>
            {invoice.id}
          </h2>

          <h2 className='mt-3 text-sm font-light text-gray dark:text-light'>
            Due {invoice.paymentDue}
          </h2>
          <h1 className='text-xl dark:text-light'>$ {invoice.total}</h1>
        </div>

        <div className='flex flex-col'>
          <h2 className='mb-4 text-right text-sm font-light text-gray dark:text-light  '>
            {invoice.clientName}
          </h2>

          <PaidStatus type={invoice.status} />
        </div>
      </div>
    </Link>
  );
};

export default InvoiceCard;
