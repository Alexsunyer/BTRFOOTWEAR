import { useCallback, useEffect, useState } from "react";
import "./productSearchList.sass";
import { getDataApiJSON } from "../../../../utils/globals/petitions";
import { IndividualProduct } from "../../../specificComponents/ProductsListing";
import { Product } from "../../../../utils/reducers/shoppingCart";

interface ProductSearchListProps extends ProductSearchListLogicProps {
  name: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductSearchList: React.FC<ProductSearchListProps> = ({
  name,
  setOpen,
}) => {
  const { nameProducts } = useProductSearchListLogic({ name });
  const renderThis: JSX.Element[] = [];

  if (!nameProducts) {
    return null;
  }

  for (let product of nameProducts) {
    renderThis.push(<IndividualProduct product={product} setOpen={setOpen} />);
  }

  return <ul className="product-search-list">{renderThis}</ul>;
};

interface ProductSearchListLogicProps {
  name: string;
}

const useProductSearchListLogic = ({ name }: ProductSearchListLogicProps) => {
  const [nameProducts, setNameProducts] = useState<null | Product[]>(null);

  const getData = useCallback(async () => {
    let data;
    if (name === "") {
      data = await getDataApiJSON("/api/product/getAllProducts", {});
    } else {
      data = await getDataApiJSON("/api/product/getAllProductsByName", {
        name,
      });
    }
    setNameProducts(data);
  }, [name]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { nameProducts };
};

export default ProductSearchList;
