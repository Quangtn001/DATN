import { motion } from "framer-motion";
const Header = ({ children }) => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="header"
    >
      <div className="header-cover">
        <div className="my-container flex-y h-[400px]">
          <h1 className="header-heading">{children}</h1>
        </div>
        <hr />
      </div>
    </motion.header>
  );
};
export default Header;
