import { useState } from "react";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import styles from "./App.css?inline";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";

function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState("");

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
        <InnerContainer>
          <FoodList foodData={foodData} setFoodId={setFoodId} />
        </InnerContainer>
        <InnerContainer>
          {foodId && <FoodDetails foodId={foodId} />}
        </InnerContainer>
      </Container>
    </div>
  );
}

export default App;
