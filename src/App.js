import "./App.css";
import PokemonRendering from "./pages/PokemonRendering";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PokemonInfo from "./pages/PokemonInfo";
import { useState, useEffect } from "react";
import { pokemonsData } from "./pokemonsData";

function App() {
  const types = {
    normal: {
      name: "normal",
      color: "bg-stone-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg",
    },
    fighting: {
      name: "fighting",
      color: "bg-red-800",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg",
    },
    flying: {
      name: "flying",
      color: "bg-blue-200",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg",
    },
    poison: {
      name: "poison",
      color: "bg-fuchsia-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg",
    },
    ground: {
      name: "ground",
      color: "bg-yellow-100",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg",
    },
    rock: {
      name: "rock",
      color: "bg-yellow-600",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg",
    },
    bug: {
      name: "bug",
      color: "bg-lime-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg",
    },
    ghost: {
      name: "ghost",
      color: "bg-violet-600",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg",
    },
    steel: {
      name: "steel",
      color: "bg-slate-400",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg",
    },
    fire: {
      name: "fire",
      color: "bg-red-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg",
    },
    water: {
      name: "water",
      color: "bg-sky-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg",
    },
    grass: {
      name: "grass",
      color: "bg-green-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg",
    },
    electric: {
      name: "electric",
      color: "bg-yellow-500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg",
    },
    psychic: {
      name: "psychic",
      color: "bg-pink-300",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg",
    },
    ice: {
      name: "ice",
      color: "bg-sky-400",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg",
    },
    dragon: {
      name: "dragon",
      color: "bg-purple-600",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg",
    },
    dark: {
      name: "dark",
      color: "bg-amber-900",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg",
    },
    fairy: {
      name: "fairy",
      color: "bg-pink-200",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg",
    },
  };

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
