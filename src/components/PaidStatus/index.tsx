type Props = {
  type: string;
};

function PaidStatus({ type }: Props) {
  const classNames = {
    paid: ['text-green bg-[#33d69f0f]', 'bg-green'],
    pending: ['text-orange bg-[#ff8f000f]', 'bg-orange'],
    draft: ['bg-[#dfe3fa8f] text-[#8a99ed] dark:text-bluish', 'bg-bluish'],
  };
  return (
    <div
      className={`${
        type === 'Paid'
          ? classNames.paid[0]
          : type === 'Pending'
          ? classNames.pending[0]
          : classNames.draft[0]
      } flex items-center justify-center space-x-2 rounded-lg px-4 py-2`}
    >
      <div
        className={`h-3 w-3 rounded-full ${
          type === 'Paid'
            ? classNames.paid[1]
            : type === 'Pending'
            ? classNames.pending[1]
            : classNames.draft[1]
        } `}
      />
      <p>{type}</p>
    </div>
  );
}

export default PaidStatus;
