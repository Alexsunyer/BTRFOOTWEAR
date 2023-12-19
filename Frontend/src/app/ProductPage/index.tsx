import {
  faCartShopping,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductsListing from "../../components/specificComponents/ProductsListing";
import CategoriesListing from "../../components/specificComponents/CategoriesListing";
import { getDataApiJSON } from "../../utils/globals/petitions";
import "./productPage.sass";
import { addToCart } from "../../utils/reducers/reduxDispatch";
import toast from "react-hot-toast";
import { Product } from "../../utils/reducers/shoppingCart";

const ProductPage = () => {
  const { productInfo } = useProductPageLogic();

  if (!productInfo) {
    return null;
  }
  return (
    <div className="product-page">
      <CategoriesListing itemClass="categoryHome" />
      <ProductCard productInfo={productInfo} />
      <ProductsListing
        productType="last"
        url="/api/product/getAllProducts"
        queryParams={{ limit: 8, order: [["createdAt", "DESC"]] }}
      />
    </div>
  );
};

const useProductPageLogic = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const paramsID = id ? parseInt(id) : 0;

  const getData = useCallback(async () => {
    const result = await getDataApiJSON("/api/product/getProductInstance", {
      id: paramsID,
    });
    setProductInfo(result);
  }, [paramsID]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { productInfo };
};

interface ProductCardProps extends ProductCardLogicProps {}

const ProductCard: React.FC<ProductCardProps> = ({
  productInfo,
}: ProductCardProps) => {
  const { quantityPrice, handleMinusQuantity, handlePlusQuantity } =
    useProductCardLogic({
      productInfo,
    });
  return (
    <div className="product-card">
      <img src={productInfo.url} alt={productInfo.name} />
      <div className="product-info">
        <h2>BTRFOOTWEAR</h2>
        <h1>{productInfo.name}</h1>
        <div className="quantity-price">
          <div className="select-quantity">
            <button onClick={handleMinusQuantity}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              min={1}
              max={100}
              value={quantityPrice.quantity}
              readOnly
            />
            <button onClick={handlePlusQuantity}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <span>{Math.round(quantityPrice.totalPrice * 100) / 100}€</span>
        </div>
        <p>{productInfo.description}</p>
        <button
          className="addToCart"
          onClick={() => {
            addToCart({
              ProductId: productInfo.id,
              price: quantityPrice.totalPrice,
              Product: productInfo,
              quantity: quantityPrice.quantity,
            });
            toast.success("Successfully added to your shopping cart!");
          }}
        >
          {<FontAwesomeIcon icon={faCartShopping} />} ADD TO CART
        </button>
      </div>
    </div>
  );
};

interface ProductCardLogicProps {
  productInfo: Product;
}

const useProductCardLogic = ({ productInfo }: ProductCardLogicProps) => {
  const [quantityPrice, setQuantityPrice] = useState({
    quantity: 1,
    totalPrice: productInfo.price,
  });
  const handlePlusQuantity = useCallback(() => {
    if (quantityPrice.quantity >= 1) {
      setQuantityPrice((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
        totalPrice: parseFloat(
          String(productInfo.price * (quantityPrice.quantity + 1))
        ),
      }));
    }
  }, [productInfo, quantityPrice]);

  const handleMinusQuantity = useCallback(() => {
    if (quantityPrice.quantity > 1) {
      setQuantityPrice((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
        totalPrice: parseFloat(
          String(productInfo.price * (quantityPrice.quantity - 1))
        ),
      }));
    }
  }, [productInfo, quantityPrice]);
  return {
    quantityPrice,
    setQuantityPrice,
    handlePlusQuantity,
    handleMinusQuantity,
  };
};

export default ProductPage;
