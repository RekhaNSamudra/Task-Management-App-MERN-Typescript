interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="mb-4 rounded-xl bg-red-100 p-4 text-red-700 shadow">
      {message}
    </div>
  );
};

export default ErrorAlert;
