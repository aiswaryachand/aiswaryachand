import  { useEffect,useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID= useGetUserID();

    useEffect(() => {
    
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mernreceipebackend.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data.SavedRecipes)
          } catch (err) {
        console.error(err);
      }
    };
    
    fetchSavedRecipes();
  }, [userID]); 

  
  
  return (
    <div>
      <h1 > Diet Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
          <div>
             <h2>{recipe.name}</h2> </div>
                       
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