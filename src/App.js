import "./App.css";
import PokemonRendering from "./pages/PokemonRendering";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PokemonInfo from "./pages/PokemonInfo";
import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [resetData, setResetData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    for (let i = 1; i < 10; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      setPokemons((prevPokemons) => {
        return [...prevPokemons, data];
      });
      setResetData((prevResetData) => {
        return [...prevResetData, data];
      });
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pokemons"
          element={
            <PokemonRendering
              pokemons={pokemons}
              setPokemons={setPokemons}
              resetData={resetData}
            />
          }
        />
        <Route
          path="/pokemons/:name"
          element={<PokemonInfo pokemons={pokemons} />}
        />
      </Routes>
    </div>
  );
}

export default App;
