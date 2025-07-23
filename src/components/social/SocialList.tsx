const SocialList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex justify-center items-center gap-2 md:gap-2.5">{children}</ul>;
};

export default SocialList;
