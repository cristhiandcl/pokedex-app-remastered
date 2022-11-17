import "./App.css";
import PokemonRendering from "./pages/PokemonRendering";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PokemonInfo from "./pages/PokemonInfo";
import { useState, useEffect } from "react";
import { pokemonsData } from "./pokemonsData";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [resetData, setResetData] = useState([]);
  const [pokemonsNames, setPokemonsNames] = useState([]);

  useEffect(() => {
    // getData();
    setPokemons([...pokemonsData]);
    setResetData([...pokemonsData]);
    setPokemonsNames(pokemonsData.map((pokemon) => pokemon.name));
  }, []);

  // async function getData() {
  //   // for (let i = 1; i < 500; i++) {
  //   //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  //   //   const data = await response.json();
  //   //   setPokemons((prevPokemons) => {
  //   //     return [...prevPokemons, data];
  //   //   });
  //   //   setResetData((prevResetData) => {
  //   //     return [...prevResetData, data];
  //   //   });
  //   // }

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
              pokemons={pokemons}
              setPokemons={setPokemons}
              resetData={resetData}
              pokemonsNames={pokemonsNames}
            />
          }
        />
        <Route
          path="/pokemons/:name"
          element={<PokemonInfo pokemons={resetData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
