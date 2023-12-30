import { useCallback, useEffect, useState } from "react";
import { getDataApiJSON } from "../../../utils/globals/petitions";
import { IndividualProduct } from "../../../components/specificComponents/ProductsListing";
import { Product } from "../../../utils/reducers/shoppingCart";

interface CategoryProductsListingProps
  extends CategoryProductsListingLogicProps {}

export const CategoryProductsListing: React.FC<
  CategoryProductsListingProps
> = ({ id }) => {
  const renderThis: JSX.Element[] = [];
  const { categoryProducts } = useCategoryProductsListingLogic({ id });

  if (categoryProducts) {
    for (let product of categoryProducts) {
      renderThis.push(
        <IndividualProduct key={product.id} product={{ ...product }} />
      );
    }
  }

  return (
    <div className="products-container">
      <ul className="category-products-listing">{renderThis}</ul>
    </div>
  );
};

interface CategoryProductsListingLogicProps {
  id: number | null;
}

const useCategoryProductsListingLogic = ({
  id,
}: CategoryProductsListingLogicProps) => {
  const [categoryProducts, setCategoryProducts] = useState<null | Product[]>(
    null
  );

  const getData = useCallback(async () => {
    let data;
    if (id === 1) {
      data = await getDataApiJSON("/api/product/getAllProducts", {});
    } else {
      data = await getDataApiJSON("/api/product/getAllProducts", {
        where: { CategoryId: id },
      });
    }
    setCategoryProducts(data);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { categoryProducts };
};
