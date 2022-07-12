import React from 'react'

import { useDispatch } from "react-redux";
import { addProductToCart } from '../state/reducers/wizelineReducer';
import { useSelector } from 'react-redux';

import { Card, CardInfo, Image, Title, Paragraph, CardButtons, Button } 
  from '../styles/components/ProductItem.styles.js';

const ProductItem = (props) =>{
  const { id, name, images, price, categories } = props
  const { activeUser } = useSelector(state => state.storeData)
  const dispatch = useDispatch();

  return (
    <Card data-testid="product-card">
      <CardInfo>
        <Image src={(images && images[0]) || undefined} alt={ null }
           data-testid="product-image"
        />
        <Title data-testid="product-name">{name || "Not Available"}</Title>
        <Paragraph
          data-testid="product-category"
          >{(categories && categories[0]) || "Generic"}
        </Paragraph>
        <Paragraph $type="price"
          data-testid="product-price"
          >${price || "Not Available"}
        </Paragraph>
      </CardInfo>
      <CardButtons>
        <Button
          data-testid="product-btn-add_to_cart"
          onClick={() => dispatch(addProductToCart({id: activeUser, productId: id}))}
          >Add to cart
        </Button>
      </CardButtons>
    </Card>
  )
}

export default ProductItem