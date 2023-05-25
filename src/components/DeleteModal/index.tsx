function DeleteModal({ invoiceId, onDeleteButtonClick, setIsDeleteModalOpen }) {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex  items-center justify-center overflow-scroll bg-[#000005be] px-2 py-4 scrollbar-hide "
    >
      {/* Delete Modal  */}

      <div className=" bg-white text-black dark:text-white  mx-auto  my-auto max-h-[95vh] w-full max-w-md overflow-y-scroll rounded-xl px-8 py-8 font-bold  shadow-md shadow-[#364e7e1a]  scrollbar-hide dark:bg-[#2b2c37] ">
        <h3 className=" text-red-500 text-xl font-bold  ">Confirm Deletion</h3>

        <p className="text-gray-500 pt-6 text-xs font-[600] tracking-wide">
          Are you sure you want to delete invoice {invoiceId}? This action
          cannot be undone.
        </p>

        <div className=" mt-4 flex w-full items-center justify-center space-x-4 ">
          <button
            onClick={onDeleteButtonClick}
            className="text-white bg-red-500 w-full items-center rounded-full py-2 hover:opacity-75"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="dark:bg-white w-full items-center rounded-full bg-[#635fc71a] py-2  text-[#635fc7] hover:opacity-75"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
