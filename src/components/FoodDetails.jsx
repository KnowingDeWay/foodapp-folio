import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

const BASE_URL = process.env.REACT_APP_RECIPE_DETAILS_BASE_URL;
const SUFFIX_URL = process.env.REACT_APP_RECIPE_DETAILS_SUFFIX_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function FoodDetails({ foodId }) {
  const detailsUrl = `${BASE_URL}${foodId}${SUFFIX_URL}`;
  const [foodDetails, setFoodDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchFoodDetails() {
      const res = await fetch(`${detailsUrl}?apiKey=${API_KEY}`);
      const data = await res.json();
      setFoodDetails(data);
      setIsLoading(false);
    }
    fetchFoodDetails();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{foodDetails.title}</h1>
        <img className={styles.recipeImage} src={foodDetails.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>🕔 {foodDetails.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👪<strong>Serves: {foodDetails.servings}</strong>
          </span>
          <span>
            <strong>
              {foodDetails.vegetarian ? "🥕 Vegetarian" : "🥩 Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{foodDetails.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          $<span>{foodDetails.pricePerServing / 100} Per Serving</span>
        </div>
        <h2>Ingredients</h2>
        <ItemList foodDetails={foodDetails} isLoading={isLoading} />
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              foodDetails.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
