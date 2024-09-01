import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";  



export const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      alert("You need to be logged in to create a recipe.");
      navigate("/login");
    }
  }, [userID, navigate]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  });

  const [loading, setLoading] = useState(false);

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
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const validateRecipe = () => {
    if (!recipe.name || !recipe.instructions || recipe.ingredients.length === 0) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!/^https?:\/\/\S+\.\S+$/.test(recipe.imageUrl)) {
      alert("Please enter a valid image URL.");
      return false;
    }
    if (recipe.cookingTime <= 0) {
      alert("Please enter a valid cooking time.");
      return false;
    }
    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateRecipe()) return;

    setLoading(true);
    try {
      await axios.post(`https://mernreceipebackend.onrender.com/recipes/${userID}/`, {
        ...recipe,
        userOwner: userID,
      });
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error.response ? error.response.data : error.message);
      alert("An error occurred while creating the recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} required />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
            required
          />
        ))}
        <button onClick={addIngredient} type="button" className="add-ingredient-btn">
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          required
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
};
