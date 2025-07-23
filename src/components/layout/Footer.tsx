import SocialItem from "../social/SocialItem";
import SocialList from "../social/SocialList";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center items-center border-t border-white/5 bg-white/5 backdrop-blur-md shadow-md">
      <div className="max-w-7xl w-full p-4 md:p-5 flex justify-between items-center">
        <span>© 2025 Illia Movchko</span>
        <SocialList>
          <SocialItem link="https://github.com/sacrificed666" icon="github" alt="GitHub" />
          <SocialItem link="https://www.linkedin.com/in/illiamovchko/" icon="linkedin" alt="LinkedIn" />
          <SocialItem link="mailto:illia.movchko.concept@gmail.com" icon="email" alt="Email" />
        </SocialList>
      </div>
    </footer>
  );
};

export default Footer;
