const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <img src="/loading.svg" alt="Loading..." fetchPriority="high" className="max-w-32 md:max-w-40 w-full opacity-50" />
    </div>
  );
};

export default Loading;
