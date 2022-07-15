import React from "react";
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading
} from "../redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function usePosts() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectAllProducts);

  return { loading, error, products };
}