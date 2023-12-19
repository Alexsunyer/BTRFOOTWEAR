import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderRight from "./HeaderRight";
import "./header.sass";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProductSearchList from "./ProductSearchList";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="header-container">
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </div>
  );
};

interface HeaderLeftProps {}

const HeaderLeft: React.FC<HeaderLeftProps> = () => {
  return (
    <div className="header-left">
      <ProductSearch />
    </div>
  );
};

interface HeaderCenterProps {}

const HeaderCenter: React.FC<HeaderCenterProps> = () => {
  return (
    <div className="header-center">
      <Link to="/">
        <img className="logo" src="/logo.png" alt="logo" />
      </Link>
    </div>
  );
};

interface ProductSearchProps {}

const ProductSearch: React.FC<ProductSearchProps> = () => {
  const { open, setOpen } = useProductSearchLogic();
  return (
    <div className="product-search">
      <FontAwesomeIcon icon={faSearch} onClick={() => setOpen((old) => !old)} />
      {open ? <ProductSearchModal setOpen={setOpen} /> : null}
    </div>
  );
};

const useProductSearchLogic = () => {
  const [open, setOpen] = useState(false);
  return { setOpen, open };
};

interface ProductSearchModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductSearchModal: React.FC<ProductSearchModalProps> = ({ setOpen }) => {
  const [name, setName] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="product-search-modal">
      <input
        className="product-search-list-input"
        type="search"
        placeholder="search your product here"
        name="product-search-list-input"
        value={name}
        onChange={handleChange}
      />
      <ProductSearchList name={name} setOpen={setOpen} />
    </div>
  );
};
