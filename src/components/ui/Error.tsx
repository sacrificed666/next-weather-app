const Error = () => {
  return (
    <div className="p-4 md:p-5 center flex-col border border-red-500/50 rounded-xl bg-red-500/50 glassmorphism">
      <span className="text-xl font-bold">City not found</span>
      <span>Please try again</span>
    </div>
  );
};

export default Error;
