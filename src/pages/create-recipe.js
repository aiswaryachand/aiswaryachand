import React, {useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";


export const CreateRecipe = () => {
  const userID = useGetUserID();
  
  const [recipe, setRecipe] = useState({
    name: "",
     ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner:0,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    
    setRecipe({ ...recipe, ingredients : [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://mernreceipebackend.onrender.com/recipes",recipe)
           alert("Recipe Created");
      navigate("/");
    } catch (error) {
    
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        />
       
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          // value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};