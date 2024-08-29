import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mernreceipebackend.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the saved recipes.");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchSavedRecipes();
    }
  }, [userID]);

  if (loading) {
    return <p>Login to save a recipe</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (savedRecipes.length === 0) {
    return <p>No saved recipes found.</p>;
  }

  return (
    <div>
      <h1>Diet Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
