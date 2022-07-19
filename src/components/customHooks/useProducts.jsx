import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading
} from "../../state/reducers/apiStoreReducer";
import { useSelector } from "react-redux";

export default function useProducts() {
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectAllProducts);

  return { loading, error, products };
}