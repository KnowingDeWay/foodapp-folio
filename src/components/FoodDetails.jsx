import { useEffect, useState } from "react";

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
      <div>
        <h1>{foodDetails.title}</h1>
        <img src={foodDetails.image} alt="" />
        <div>
          <span>
            <strong>🕔 {foodDetails.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👪<strong>Serves: {foodDetails.servings}</strong>
          </span>
          <span>
            {foodDetails.vegetarian ? "🥕 Vegetarian" : "🥩 Non-Vegetarian"}
          </span>
          <span>{foodDetails.vegan ? "🐮 Vegan" : ""}</span>
        </div>
        <div>
          $<span>{foodDetails.pricePerServing / 100} Per Serving</span>
        </div>
      </div>
      <div>
        <h2>Instructions</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          foodDetails.analyzedInstructions[0].steps.map((step) => (
            <li>{step.step}</li>
          ))
        )}
      </div>
    </div>
  );
}
