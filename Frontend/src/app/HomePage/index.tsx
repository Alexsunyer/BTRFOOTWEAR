import CategoriesListing from "../../components/specificComponents/CategoriesListing";
import ProductsListing from "../../components/specificComponents/ProductsListing";
import "./homePage.sass";

const HomePage = () => {
  return (
    <div className="homePage">
      <CategoriesListing itemClass="categoryHome" />
      <AdvImg name={"Adv-img"} url={"/Adv_img.jpg"} />
      <ProductsListing
        productType="last"
        url="/api/product/getAllProducts"
        queryParams={{ limit: 8, order: [["createdAt", "DESC"]] }}
      />
      <AdvImg name={"Adv-img2"} url={"/Adv_img3.jpg"} />
      <ProductsListing
        productType="popular"
        url="/api/product/getMostSelledProducts"
      />
    </div>
  );
};

interface AdvImgProps {
  name: string;
  url: string;
}

const AdvImg: React.FC<AdvImgProps> = ({ name, url }) => {
  return (
    <div className="adv-img-container">
      <img className="adv-img" src={url} alt={name} />
    </div>
  );
};

export default HomePage;
