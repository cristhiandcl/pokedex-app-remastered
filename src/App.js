import "./App.css";
import PokemonRendering from "./pages/PokemonRendering";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PokemonInfo from "./pages/PokemonInfo";
import { useState, useEffect } from "react";
import { pokemonsData } from "./pokemonsData";
import { types } from "./types";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [resetData, setResetData] = useState([]);
  const [pokemonsNames, setPokemonsNames] = useState([]);

  useEffect(() => {
    setPokemons([...pokemonsData]);
    setResetData([...pokemonsData]);
    setPokemonsNames(pokemonsData.map((pokemon) => pokemon.name));
  }, []);

  // let tempData = [];
  // for (let i = 1; i < 906; i++) {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  //   const data = await response.json();
  //   tempData = [
  //     ...tempData,
  //     {
  //       abilities: data.abilities,
  //       name: data.name,
  //       sprites: data.sprites,
  //       stats: data.stats,
  //       types: data.types,
  //       id: data.id,
  //       height: data.height,
  //       weight: data.weight,
  //     },
  //   ];
  // }
  // setPokemons([...tempData]);
  // setResetData([...tempData]);
  // setPokemonsNames(tempData.map((pokemon) => pokemon.name));
  // }

  // console.log(JSON.stringify(pokemons));

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pokemons"
          element={
            <PokemonRendering
              types={types}
              pokemons={pokemons}
              setPokemons={setPokemons}
              resetData={resetData}
              pokemonsNames={pokemonsNames}
            />
          }
        />
        <Route
          path="/pokemons/:name"
          element={
            <PokemonInfo
              types={types}
              pokemons={pokemons}
              resetData={resetData}
              setPokemons={setPokemons}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
