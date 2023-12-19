import {
  faArrowLeft,
  faCartShopping,
  faCreditCard,
  faEraser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AllReduxPayloads } from "../../../../../utils/reducers";
import { ConnectedProps, connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ShoppingCartPayload,
  ShoppingCartProduct,
} from "../../../../../utils/reducers/shoppingCart";
import {
  deleteFromCart,
  deleteShoppingCartProducts,
} from "../../../../../utils/reducers/reduxDispatch";
import { useState } from "react";
import "./shoppingCartHeader.sass";

interface ShoppingCartHeaderProps extends ReduxCart {}

const ShoppingCartHeader: React.FC<ShoppingCartHeaderProps> = ({
  shoppingCart,
}) => {
  const { open, setOpen } = useShoppingCartLogic();
  return (
    <div className="shopping-cart">
      <FontAwesomeIcon
        icon={faCartShopping}
        onClick={() => setOpen((old) => !old)}
      />
      {open ? (
        <ShoppingCartHeaderModal
          shoppingCart={shoppingCart}
          setOpen={setOpen}
        />
      ) : null}
      <span>
        {shoppingCart?.price
          ? Math.round(shoppingCart?.price * 100) / 100
          : "0.00"}{" "}
        €
      </span>
    </div>
  );
};

const useShoppingCartLogic = () => {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
};

interface ShoppingCartHeaderModalProps {
  shoppingCart: ShoppingCartPayload;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingCartHeaderModal: React.FC<ShoppingCartHeaderModalProps> = ({
  shoppingCart,
  setOpen,
}) => {
  const renderThis: JSX.Element[] = [];
  const productQuantities: number[] = [];
  const shoppingCartProducts = shoppingCart?.ShoppingCartProducts;

  if (shoppingCartProducts) {
    if (shoppingCartProducts.length > 0) {
      for (let product of shoppingCartProducts) {
        if (product.quantity) {
          productQuantities.push(product.quantity);
        }
        renderThis.push(
          <IndividualShoppingCartProduct
            key={product.ProductId}
            product={{ ...product }}
          />
        );
      }
    } else {
      renderThis.push(
        <p className="italic my-4 p-2 border-2 border-dashed opacity-60">
          Your shopping cart is empty
        </p>
      );
    }
  }
  let totalProductQuantity = productQuantities.reduce((a, b) => a + b, 0);
  return (
    <div className="shopping-cart-modal">
      <h3>
        <button
          id="deleteShopingCart"
          onClick={async () => {
            if (shoppingCart && shoppingCart.ShoppingCartProducts.length > 0) {
              if (window.confirm("Are you sure?")) {
                await deleteShoppingCartProducts({ ...shoppingCart });
              }
            }
          }}
        >
          {<FontAwesomeIcon icon={faTrash} />}
        </button>
        My shopping cart
        <p>
          {totalProductQuantity === 1
            ? `${totalProductQuantity} item`
            : `${totalProductQuantity} items`}
        </p>
      </h3>
      <ul className="shopping-cart-products-list">{renderThis}</ul>
      <div className="shopping-cart-header-actions">
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Continue shopping
        </button>
        <Link to="/order">
          <button
            className="checkout"
            onClick={() => {
              setOpen(false);
            }}
          >
            Checkout <FontAwesomeIcon icon={faCreditCard} />
          </button>
        </Link>
      </div>
    </div>
  );
};

interface IndividualShoppingCartProductProps {
  product: ShoppingCartProduct;
}

const IndividualShoppingCartProduct: React.FC<
  IndividualShoppingCartProductProps
> = ({ product }) => {
  const productInfo = product.Product;
  return (
    <li className="individual-SP-product">
      <span className="SP-product-quantity">{product.quantity}</span>
      <Link to={"/product/" + productInfo.id}>
        <img src={productInfo.url} alt={productInfo.name} />
      </Link>
      <Link to={"/product/" + productInfo.id}>
        <h2>{productInfo.name}</h2>
      </Link>
      <div className="price_AddToCart">
        <span>{Math.round(product.price * 100) / 100}€</span>
        <button
          onClick={() => {
            deleteFromCart({
              ProductId: productInfo.id,
              price: parseFloat(String(product.price)),
              Product: productInfo,
              quantity: parseFloat(String(product.quantity)),
            });
          }}
        >
          {<FontAwesomeIcon icon={faEraser} />}
        </button>
      </div>
    </li>
  );
};

const cartDispatch = {};

const mapCartConnector = (state: AllReduxPayloads) => ({
  shoppingCart: state.shoppingCart,
});
const cartConnect = connect(mapCartConnector, cartDispatch);
export type ReduxCart = ConnectedProps<typeof cartConnect>;

const ShoppingCartConnect = cartConnect(ShoppingCartHeader);

export default ShoppingCartConnect;
