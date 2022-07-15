import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { useDispatch } from 'react-redux/es/exports';
import { getProducts } from '../state/reducers/apiStoreReducer';
import usePosts from './customHooks/useProducts';

import { ProductsGrid } 
  from '../styles/components/ProductList.styles.js';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = usePosts();
  const [productsApiList, setProductsApiList] = useState([]);  
  const productsList = productsApiList.map(item => {
    return <ProductItem {...item} key={item.id}/>
  })

  useEffect(() => {
    dispatch(getProducts());
    setProductsApiList(products);
  }, [])
  
  return (
    <ProductsGrid data-testid="products-grid">
      {productsList}
    </ProductsGrid>
  )
}

export default ProductList