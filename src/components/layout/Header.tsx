import Search from "../search/Search";

const Header = () => {
  return (
    <header className="sticky top-0 w-full p-4 md:p-5 flex justify-center items-center border-b border-white/5 bg-white/5 backdrop-blur-md shadow-md z-10">
      <Search />
    </header>
  );
};

export default Header;
