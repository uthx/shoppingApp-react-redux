import React, { useState } from "react";
import styled from "styled-components";
import { addToCartAction, removeFromCart } from "../../redux/ducks/catalouge";
import { useDispatch } from "react-redux";
const DisplayProduct = ({ productData }) => {
  const { title, id, image, price, brand } = productData;
  const dispatch = useDispatch();
  const [productInCart, setProductInCart] = useState(false);
  // console.log(productData);
  const cartHandler = () => {
    if (!productInCart) {
      dispatch(addToCartAction(id));
    } else {
      dispatch(removeFromCart(id));
    }
    setProductInCart((prev) => !prev);
  };

  return (
    <Container>
      <ProductDetails>
        <div className="brandName">
          <p>{brand}:</p>
        </div>
        <div className="productTitle">
          <p>{title}</p>
        </div>
      </ProductDetails>
      <ProductImage>
        <img src={image} alt={title} />
      </ProductImage>
      <ProductPrice>
        <p className="productPrice">Price: ${price}</p>
      </ProductPrice>
      <ProductAction>
        <div>
          <button
            className={`${productInCart ? "removeFromCart" : "addToCart "}`}
            onClick={cartHandler}
          >
            {productInCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </ProductAction>
    </Container>
  );
};

export default DisplayProduct;
const Container = styled.div`
  border: 1px solid black;
  display: flex;
  padding: 10px;
  flex-direction: column;
  width: 20%;
  max-width: 20rem;

  p {
    font-size: 0.8rem;
    line-height: 1.4;
    font-weight: 500;
    color: #292828;
  }
`;

const ProductDetails = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  padding: 2px;

  .brandName p {
    font-size: 0.9rem;
  }
  & > div {
    padding: 3px;
  }
`;

const ProductImage = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  text-align: center;

  img {
    height: 10rem;
    width: 10rem;
  }
`;
const ProductPrice = styled.div`
  border: 1px solid black;
  text-align: center;
  padding: 5px;
  & .productPrice {
    font-size: 1rem;
  }
`;

const ProductAction = styled.div`
  border: 1px solid white;
  display: flex;
  padding: 8px;
  justify-content: space-around;
  button {
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
  .buyNow,
  .addToCart {
    &:hover {
    }
    color: white;
    background: #fc354c; /* fallback for old browsers */
    background: #24c6dc; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #514a9d,
      #24c6dc
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #514a9d,
      #24c6dc
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .removeFromCart {
    color: white;
    background: #fe8c00; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;
