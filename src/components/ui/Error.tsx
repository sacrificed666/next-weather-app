const Error = () => {
  return (
    <div className="p-4 md:p-5 flex flex-col justify-center items-center border border-red-500/50 rounded-xl bg-red-500/50 backdrop-blur-md shadow-md">
      <span className="text-xl font-bold">City not found</span>
      <span>Please try again</span>
    </div>
  );
};

export default Error;
