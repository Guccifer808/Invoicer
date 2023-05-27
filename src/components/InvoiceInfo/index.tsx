import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import leftArrow from 'src/assets/icon-arrow-l.svg';
import { AnimatePresence, motion } from 'framer-motion';
import PaidStatus from '../PaidStatus';
import { useDispatch, useSelector } from 'react-redux';

import formatDate from 'src/utils/formatDate';
import DeleteModal from '../DeleteModal';
import CreateInvoice from '../CreateInvoice';
import { Invoice, Item } from 'src/types/types';
import { RootState } from 'src/redux/store';
import invoiceSlice from 'src/redux/invoiceSlice';

interface InvoiceInfoProps {
  onDelete: (id: string) => void;
}
const InvoiceInfo: React.FC<InvoiceInfoProps> = ({ onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const invoiceId = location.search.substring(1);
  const onMakePaidClick = () => {
    dispatch(
      invoiceSlice.actions.updateInvoiceStatus({
        id: invoiceId,
        status: 'Paid',
      })
    );
    dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
  };

  useEffect(() => {
    dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
  }, [invoiceId, onMakePaidClick]);

  const onDeleteButtonClick = () => {
    navigate('/');
    setIsDeleteModalOpen(false);
    onDelete(invoiceId);
  };

  const invoice = useSelector((state: RootState) => state.invoices.invoiceById);

  // console.log(invoice);

  return (
    <div>
      {invoice ? (
        <motion.div
          key='invoice-info'
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '200%' }}
          transition={{ duration: 0.5 }}
          className='mx-auto min-h-screen max-w-3xl bg-light px-2 py-[34px] duration-300 dark:bg-dark md:px-8 lg:px-12 lg:py-[72px] '
        >
          <div className=''>
            <button
              onClick={() => navigate(-1)}
              className='group flex items-center space-x-4 font-thin dark:text-light '
            >
              <img className='' src={leftArrow} />
              <p className='font-bold group-hover:opacity-80'>Go back</p>
            </button>

            <div className='mt-8 flex w-full items-center justify-between rounded-lg bg-light px-6 py-6 dark:bg-dark'>
              <div className='flex w-full items-center justify-between space-x-2 md:w-auto md:justify-start'>
                <h1 className='text-gray dark:text-light'>Status</h1>
                <PaidStatus type={invoice.status} />
              </div>
              <div className='hidden md:block'>
                <button
                  onClick={() => setIsEditOpen(true)}
                  className='rounded-full bg-slate p-3 px-7 text-center text-dark hover:opacity-80 dark:bg-darkSecondary dark:text-light '
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className='ml-3 rounded-full bg-red p-3 px-7 text-center text-light hover:opacity-80'
                >
                  Delete
                </button>
                {invoice.status === 'Pending' && (
                  <button
                    onClick={onMakePaidClick}
                    className='ml-3 rounded-full bg-accentColor p-3 px-7 text-center text-light hover:opacity-80'
                  >
                    Make as Paid
                  </button>
                )}
              </div>
            </div>

            <div className='mt-4 w-full rounded-lg bg-light px-6 py-6 dark:bg-dark'>
              <div className='flex w-full flex-col items-start justify-between md:flex-row '>
                <div>
                  <h1 className='text-xl font-semibold dark:text-light'>
                    <span className='text-accentColor'>#</span>
                    {invoice.id}
                  </h1>
                  <p className='text-sm text-gray dark:text-light'>
                    {invoice.clientName}
                  </p>
                </div>
                <div className='mt-4 flex flex-col text-left text-sm text-gray dark:text-light md:mt-0 md:text-right'>
                  <p>{invoice.senderAddress.street}</p>
                  <p>{invoice.senderAddress.city}</p>
                  <p>{invoice.senderAddress.postCode}</p>
                  <p>{invoice.senderAddress.country}</p>
                </div>
              </div>

              <div className='mt-10 grid w-full grid-cols-2 md:grid-cols-3'>
                <div className='flex flex-col justify-between'>
                  <div>
                    <h3 className='font-thin text-gray dark:text-light '>
                      Invoice Date
                    </h3>
                    <h1 className='text-lg font-semibold dark:text-light'>
                      {formatDate(Number(invoice.createdAt))}
                    </h1>
                  </div>
                  <div>
                    <h3 className='font-thin text-gray dark:text-light '>
                      Payment Due
                    </h3>
                    <h1 className='text-lg font-semibold dark:text-light'>
                      {formatDate(Number(invoice.paymentDue))}
                    </h1>
                  </div>
                </div>

                <div className=''>
                  <p className='font-thin text-gray dark:text-light'>Bill to</p>
                  <h1 className='text-lg font-semibold dark:text-light'>
                    {invoice.clientName}
                  </h1>
                  <p className='font-thin text-gray dark:text-light'>
                    {invoice.clientAddress.street}
                  </p>
                  <p className='font-thin text-gray dark:text-light'>
                    {invoice.clientAddress.city}
                  </p>
                  <p className='font-thin text-gray dark:text-light'>
                    {invoice.clientAddress.postCode}
                  </p>
                  <p className='font-thin text-gray dark:text-light'>
                    {invoice.clientAddress.country}
                  </p>
                </div>

                <div className='mt-8 md:mt-0'>
                  <p className='font-thin text-gray dark:text-light'>Sent to</p>
                  <h1 className='text-lg font-semibold dark:text-light'>
                    {invoice.clientEmail}
                  </h1>
                </div>
              </div>

              {/* Last Section */}

              <div className='mt-10 space-y-4 rounded-lg rounded-b-none bg-lightSecondary p-10 dark:bg-darkSecondary sm:hidden'>
                {invoice.items.map((item: Item) => (
                  <div
                    key={item.name}
                    className='flex justify-between text-lg dark:text-light'
                  >
                    <h1>{item.name}</h1>
                    <h1>${item.total}</h1>
                  </div>
                ))}
              </div>

              <div className='mt-10 hidden space-y-4 rounded-lg rounded-b-none bg-slate p-10 dark:bg-darkSecondary sm:block'>
                {invoice.items.map((item: Item) => (
                  <div key={item.name} className='flex justify-between'>
                    <div className='w-3/4'>
                      <div className='space-y-4'>
                        <p className='font-thin text-gray dark:text-light'>
                          Item name
                        </p>
                        <h1 className='text-base font-semibold dark:text-light'>
                          {item.name}
                        </h1>
                      </div>
                    </div>
                    <div className='w-1/4'>
                      <div className='space-y-4'>
                        <p className='font-thin text-gray dark:text-light'>
                          Qty.
                        </p>
                        <h1 className='text-base font-semibold dark:text-light'>
                          {item.quantity}
                        </h1>
                      </div>
                    </div>
                    <div className='w-1/4'>
                      <div className='space-y-4'>
                        <p className='font-thin text-gray dark:text-light'>
                          Item price
                        </p>
                        <h1 className='text-base font-semibold dark:text-light'>
                          ${item.price}
                        </h1>
                      </div>
                    </div>
                    <div className='w-1/4'>
                      <div className='space-y-4'>
                        <p className='font-thin text-gray dark:text-light'>
                          Total
                        </p>
                        <h1 className='text-base font-semibold dark:text-light'>
                          ${item.total}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex items-center justify-between rounded-lg rounded-t-none bg-darkSecondary p-10 font-semibold text-light'>
                <h3 className='text-xl'>Amount Due</h3>

                <h1 className='text-3xl'>${invoice.total}</h1>
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
            type='edit'
            setOpenCreateInvoice={setIsEditOpen}
            // openCreateInvoice={isEditOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoiceInfo;
