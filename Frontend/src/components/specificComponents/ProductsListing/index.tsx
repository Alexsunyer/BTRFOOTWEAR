import { useCallback, useEffect, useState } from "react";
import { getDataApiJSON } from "../../../utils/globals/petitions";
import { Link } from "react-router-dom";
import { faGift, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./productsListing.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../../../utils/reducers/reduxDispatch";
import { Product } from "../../../utils/reducers/shoppingCart";
import toast from "react-hot-toast";

interface ProductsListingProps extends ProductsListingLogicProps {
  productType: string;
}

const ProductsListing: React.FC<ProductsListingProps> = ({
  productType,
  url,
  queryParams,
}: ProductsListingProps) => {
  const { products } = useProductsListingLogic({ url, queryParams });
  const renderThis: JSX.Element[] = [];
  if (products) {
    const last8 = products.slice(0, 8);
    for (let product of last8) {
      renderThis.push(
        <IndividualProduct key={product.id} product={{ ...product }} />
      );
    }
  }
  return (
    <div className={`products-container ` + productType}>
      <h1>{`Our ${productType} products`}</h1>
      <ul className={`products-listing ` + productType}>{renderThis}</ul>
    </div>
  );
};

interface ProductsListingLogicProps {
  url: string;
  queryParams?: object;
}

const useProductsListingLogic = ({
  url,
  queryParams,
}: ProductsListingLogicProps) => {
  const [products, setProducts] = useState<null | Product[]>(null);

  const getData = useCallback(async () => {
    const data = await getDataApiJSON(url, queryParams);
    setProducts(data);
  }, [url, queryParams]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { products };
};

interface IndividualProductProps {
  product: Product;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const IndividualProduct: React.FC<IndividualProductProps> = ({
  product,
  setOpen,
}) => {
  return (
    <li className="individual-product">
      <div className="product-listing-image">
        <button
          onClick={() => {
            addToCart({
              ProductId: product.id,
              price: product.price,
              Product: product,
              quantity: 1,
            });
            toast.success("Successfully added to your shopping cart!");
          }}
          id="plus"
        >
          {<FontAwesomeIcon icon={faPlus} />}
        </button>
        <Link
          to={"/product/" + product.id}
          onClick={setOpen ? () => setOpen(false) : undefined}
        >
          <img src={product.url} alt={product.name} />
        </Link>
      </div>
      <div className="product-listing-info">
        <Link
          to={"/product/" + product.id}
          onClick={setOpen ? () => setOpen(false) : undefined}
        >
          <h2>{product.name}</h2>
        </Link>
        <div className="price_AddToCart">
          <span>{product.price}€</span>
          <button>{<FontAwesomeIcon icon={faGift} />}</button>
        </div>
      </div>
    </li>
  );
};

export default ProductsListing;
