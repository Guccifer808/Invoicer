import { TrashIcon } from '@heroicons/react/24/solid';
import { ItemDetails } from 'src/types/types';
import {
  validateItemCount,
  validateItemName,
  validateItemPrice,
} from 'src/utils/createInvoiceValidator';

type AddItemProps = {
  itemDetails: ItemDetails;
  // setItem: React.Dispatch<React.SetStateAction<ItemDetails[]>>;
  // setItem: (item: ItemDetails[]) => void;
  isValidatorActive: boolean;
  onDelete: (id: string) => void;
  handelOnChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
};
const AddItem: React.FC<AddItemProps> = ({
  itemDetails,
  // setItem,
  isValidatorActive,
  onDelete,
  handelOnChange,
}) => {
  return (
    <div>
      <div className='dark:text-white flex items-center justify-between'>
        <div className='flex flex-wrap'>
          <div className='flex flex-col items-start px-2 py-2'>
            <h1>Item Name</h1>
            <input
              name='name'
              onChange={(e) => {
                handelOnChange(itemDetails.id, e);
              }}
              value={itemDetails.name}
              type='text'
              className={`rounded-lg border-[.2px] border-gray px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                isValidatorActive &&
                !validateItemName(itemDetails.name) &&
                'border-2 border-red outline-red dark:border-red'
              }   dark:border-gray`}
            />
          </div>

          <div className='flex flex-col items-start px-2 py-2'>
            <h1>Qty.</h1>
            <input
              name='quantity'
              type='number'
              onChange={(e) => {
                handelOnChange(itemDetails.id, e);
              }}
              value={itemDetails.quantity}
              min={0}
              className={`max-w-[60px] rounded-lg border-[.2px] border-gray px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                isValidatorActive &&
                !validateItemCount(itemDetails.quantity) &&
                'border-2 border-red outline-red dark:border-red'
              }   dark:border-gray`}
            />
          </div>

          <div className='flex flex-col items-start px-2 py-2'>
            <h1>Price</h1>
            <input
              name='price'
              type='number'
              onChange={(e) => {
                handelOnChange(itemDetails.id, e);
              }}
              value={itemDetails.price}
              min={0}
              className={`max-w-[100px] rounded-lg border-[.2px] border-gray px-4 py-2 focus:outline-none focus:outline-accentColor dark:bg-darkSecondary ${
                isValidatorActive &&
                !validateItemPrice(itemDetails.price) &&
                'border-2 border-red outline-red dark:border-red'
              }   dark:border-gray`}
            />
          </div>

          <div className='flex flex-col items-start px-2 py-2'>
            <h1>Total</h1>
            <div className='dark:text-white max-w-[100px] rounded-lg border-[.2px] border-gray px-4 py-2 focus:outline-none focus:outline-accentColor dark:border-gray dark:bg-darkSecondary'>
              {itemDetails.total}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            onDelete(itemDetails.id);
          }}
        >
          <TrashIcon className='mt-4 h-6 w-6 cursor-pointer text-red duration-300 hover:scale-105 hover:text-red' />
        </button>
      </div>
    </div>
  );
};

export default AddItem;
