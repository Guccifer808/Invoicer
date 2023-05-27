import { DeleteModalProps } from 'src/types/types';

const DeleteModal: React.FC<DeleteModalProps> = ({
  invoiceId,
  onDeleteButtonClick,
  setIsDeleteModalOpen,
}) => {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center overflow-scroll bg-[#000005be] px-2 py-4 scrollbar-hide '
    >
      {/* Delete Modal  */}

      <div className='text-black mx-auto my-auto  max-h-[95vh]  w-full max-w-md overflow-y-scroll rounded-xl bg-light px-8 py-8 font-bold shadow-md  shadow-[#364e7e1a] scrollbar-hide  dark:bg-dark dark:text-light '>
        <h3 className='text-xl font-bold text-red'>Confirm Deletion</h3>

        <p className='text-gray-500 pt-6 text-xs font-[600] tracking-wide'>
          Are you sure you want to delete invoice {invoiceId}? This action
          cannot be undone.
        </p>

        <div className='mt-4 flex w-full items-center justify-center space-x-4'>
          <button
            onClick={onDeleteButtonClick}
            className='w-full items-center rounded-full bg-red py-2 text-light hover:opacity-75'
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className='w-full items-center rounded-full bg-darkSecondary py-2 text-light hover:opacity-75 dark:text-light'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
