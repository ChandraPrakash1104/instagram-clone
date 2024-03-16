const AlertMessage = ({
  type = 'succuss',
  label,
}: {
  type?: 'succuss' | 'warning';
  label: string;
}) => {
  return (
    <div>
      {type === 'warning' && (
        <div
          className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 '
          role='alert'
        >
          {label}
        </div>
      )}
      {type === 'succuss' && (
        <div
          className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 '
          role='alert'
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default AlertMessage;
