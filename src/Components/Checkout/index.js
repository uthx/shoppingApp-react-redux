import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { checkoutAction } from "../../redux/ducks/catalouge";
import { Link } from "react-router-dom";
const Checkout = () => {
  const { productsInCart } = useSelector((state) => state.reducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const dispatch = useDispatch();
  const checkoutHandler = () => {
    setCheckout((prev) => !prev);
    dispatch(checkoutAction());
  };
  useEffect(() => {
    let total = 0;
    console.log("something");
    productsInCart.forEach((el) => {
      console.log(el.price);
      total += el.price;
    });
    console.log(total);
    setTotalPrice(total);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainContaier>
      <CheckoutTitle>
        <p>Chekout</p>
      </CheckoutTitle>
      {productsInCart.map((product) => (
        <Container>
          <ProductDetails>
            <div className="brandName">
              <p>{product.brand}:</p>
            </div>
            <div className="productTitle">
              <p>{product.title}</p>
            </div>
          </ProductDetails>
          <ProductImage>
            <img src={product.image} alt={product.title} />
          </ProductImage>
          <ProductPrice>
            <p className="productPrice">Price: ${product.price}</p>
          </ProductPrice>
        </Container>
      ))}
      <ChekcoutAction>
        <div>
          <p>Total: ${totalPrice}</p>
        </div>
        <div>
          <button onClick={checkoutHandler}>
            {checkout ? "Ordered" : "Checkout"}
          </button>
        </div>
      </ChekcoutAction>
      {checkout && (
        <div className="postCheckout">
          <p>We Have More Stuff for You!</p>
          <Link to="/">
            <p>Visit Home</p>
          </Link>
        </div>
      )}
    </MainContaier>
  );
};

export default Checkout;
const MainContaier = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  .postCheckout {
    padding: 10px;
    text-align: center;
    border: 1px solid black;
    p {
      font-size: 1rem;
      padding: 10px;
      font-weight: 600;
    }
  }
`;
const ChekcoutAction = styled.div`
  padding: 10px;
  display: flex;
  p {
    font-size: 1rem;
    padding: 10px;
    font-weight: 600;
    text-align: center;
  }
  button {
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    background: #00f260; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #0575e6,
      #00f260
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #0575e6,
      #00f260
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;
const CheckoutTitle = styled.div`
  padding: 10px;
  p {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  width: 20%;
  max-width: 20rem;
  margin: 0 auto;
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
  /* img {
    height: 95%;
    width: 95%;
  } */
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


