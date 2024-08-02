import  { useEffect,useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID= useGetUserID();

    useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("https://mernreceipebackend.onrender.com/recipes");
        setRecipes(response.data);
          } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mernreceipebackend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
          } catch (err) {
        console.error(err);
      }
    };
    
    fetchRecipe();
    fetchSavedRecipes();
  }, [userID]); 

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mernreceipebackend.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes || [])
      console.log(response.data.savedRecipes);
        } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => Array.isArray(savedRecipes) && savedRecipes.includes(id);

  return (
    <div>
      <h1 > Diet Recipes</h1>
      <ul>
        {
        recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id)}
            <div>
             <h2>{recipe.name}</h2> </div>
             <button onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}> 
               {isRecipeSaved(recipe._id) ? "Saved" : "Save"} 
              </button>
            
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};