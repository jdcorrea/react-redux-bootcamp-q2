import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { useDispatch } from 'react-redux/es/exports';
import { getProducts } from '../state/reducers/apiStoreReducer';
import useProducts from './customHooks/useProducts';

import { ProductsGrid } 
  from '../styles/components/ProductList.styles.js';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useProducts();
  const [productsApiList, setProductsApiList] = useState([]);
  const [productsUpdate, setProductsUpdate] = useState(false);
  const productsList = productsApiList.map(item => {
    return <ProductItem {...item} key={item.id}/>
  })

  useEffect(() => {
    if (!productsUpdate) {
      dispatch(getProducts());
      setProductsApiList(products);
      setProductsUpdate(true);
    }
  }, [productsUpdate, products, dispatch])
  
  return (
    <ProductsGrid data-testid="products-grid">
      {productsList}
    </ProductsGrid>
  )
}

export default ProductList