import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6); // Adjust the number of recipes per page as needed
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://mernreceipebackend.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        setError("Failed to fetch recipes. Please try again later.");
        console.error(err);
      }
      setLoading(false);
    };

    const fetchSavedRecipes = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `https://mernreceipebackend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        setError("Failed to fetch saved recipes. Please try again later.");
        console.error(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://mernreceipebackend.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes || []);
      console.log(response.data.savedRecipes);
    } catch (err) {
      setError("Failed to save the recipe. Please try again later.");
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => {
    if (Array.isArray(savedRecipes)) {
      return savedRecipes.includes(id);
    }
    return false;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Diet Recipes</h1>


      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <ul>
          {currentRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          ))}
        </ul>
      )}

<div className="pagination">
        {Array.from(
          { length: Math.ceil(recipes.length / recipesPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};