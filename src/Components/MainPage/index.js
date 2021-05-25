import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import DisplayProduct from "./DisplayProducts";
import { brandsWithCategories } from "../../redux/mockData";
import {
  filterBrandAction,
  showAllProductsAction,
  sortByAcion,
} from "../../redux/ducks/catalouge";
import NavBar from "./NavBar";
const HomePage = () => {
  const { productData, displayProducts } = useSelector(
    (state) => state.reducer
  );
  const dispatch = useDispatch();
  const renderData = displayProducts || productData;

  //react element
  const DispayData = renderData.map((product) => {
    return <DisplayProduct productData={product} key={product.id} />;
  });

  //states
  const [category, setCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState({});
  const [lowToHigh, settLowToHigh] = useState(false);
  const [highToLow, setHighToLow] = useState(false);
  //handler Functions

  const handleCheckBoxChange = (e) => {
    const value = e.target.checked;
    const brand = e.target.name;
    setSelectedBrand((prev) => {
      return {
        ...prev,
        [brand]: value,
      };
    });

    const obj = {
      ...selectedBrand,
      [brand]: value,
    };
    const trueBrands = [];
    for (let key in obj) {
      if (obj[key]) {
        trueBrands.push(key);
      }
    }
    dispatch(filterBrandAction(trueBrands));
    console.log("trueBrands", trueBrands);
  };

  const handleLowToHigh = (e) => {
    setHighToLow(false);
    settLowToHigh(true);
    dispatch(sortByAcion(e.target.name));
  };
  const handleHighToLow = (e) => {
    settLowToHigh(false);
    setHighToLow(true);
    dispatch(sortByAcion(e.target.name));
  };

  const handleReset = (e) => {
    setHighToLow(false);
    settLowToHigh(false);
    dispatch(sortByAcion(e.target.name));
  };
  //helper functions

  //useEffects

  useEffect(() => {
    dispatch(showAllProductsAction(category));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <NavBar setSelectedBrand={setSelectedBrand} setCategory={setCategory} />
      <ControlsContainer className="category">
        <FormElements>
          {brandsWithCategories[category].map((brand) => {
            return (
              <div className="brandDiv" key={brand}>
                <input
                  key={brand}
                  type="checkbox"
                  id={brand}
                  name={brand}
                  value={brand}
                  checked={selectedBrand[brand]}
                  onChange={handleCheckBoxChange}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            );
          })}
        </FormElements>

        <FormElements>
          <div className="sortDiv">
            <button
              onClick={handleLowToHigh}
              name="lowToHigh"
              disabled={lowToHigh}
            >
              Low To High
            </button>
            <button
              onClick={handleHighToLow}
              name="highToLow"
              disabled={highToLow}
            >
              High To Low
            </button>
            <button
              onClick={handleReset}
              name="reset"
              disabled={!(lowToHigh || highToLow)}
            >
              Popular
            </button>
          </div>
        </FormElements>
      </ControlsContainer>
      <DataContainer>{DispayData}</DataContainer>
    </Container>
  );
};

export default HomePage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const DataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ControlsContainer = styled.div`
  border: 3px solid black;
  padding: 10px;
  font-size: 2rem;
  text-align: center;
  display: flex;
  justify-content: flex-start;
`;
const FormElements = styled.div`
  padding: 5px;
  border: 1px solid gray;
  margin: 10px;
  display: flex;
  button {
    margin: 2px;
  }
  & > div {
    padding: 10px;
    padding: 0 10px;
    font-size: 1rem;
  }
  .brandDiv {
    & > * {
      font-size: 1rem;
      padding: 0 10px;
      font-weight: 600;
    }
  }
  .sortDiv {
    & > * {
      font-size: 1rem;
      padding: 0 10px;
      font-weight: 600;
      cursor: pointer;
    }
    .reset-disable {
      cursor: ;
    }
  }
`;
