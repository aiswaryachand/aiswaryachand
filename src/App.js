import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { NavbarComponent } from './components/navbar';
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";
import { Chart } from "./components/Chart";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">  
      <Router>
        
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/Chart" element={<Chart />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;