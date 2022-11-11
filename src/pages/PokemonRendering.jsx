import { useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../components/pages/pokemonRendering/Pokemon";
import PokemonFinder from "../components/pages/pokemonRendering/PokemonFinder";
import DropDownMenu from "../components/pages/pokemonRendering/DropDownMenu";

function PokemonRendering({ pokemons, setPokemons, resetData }) {
  const [isDrop, setIsDrop] = useState(false);

  function handleSurprise() {
    setPokemons([...resetData]);
    setPokemons(pokemons.sort((a, b) => 0.5 - Math.random()));
    setIsDrop(!isDrop);
    console.log(pokemons);
  }

  function setPokemonsData() {
    setPokemons([...resetData]);
  }

  const renderPokemons = pokemons.map((pokemon) => (
    <Link key={pokemon.name} to={`/pokemons/${pokemon.name}`}>
      <Pokemon pokemon={pokemon} />
    </Link>
  ));

  console.log("rendered", pokemons, resetData);

  return (
    <div className="font-bold text-green-300 flex flex-col items-center">
      <p className="text-black text-7xl">Pokedex</p>
      <div>
        <PokemonFinder
          setPokemons={setPokemons}
          pokemons={pokemons}
          getPokemonsData={setPokemonsData}
        />
      </div>
      <div className="flex items-center mb-8 space-x-24">
        <button
          onClick={handleSurprise}
          className="flex items-center space-x-5 border px-20 py-2.5 rounded-full bg-blue-400 text-black hover:scale-105"
        >
          <img
            className="h-8"
            src="https://static.thenounproject.com/png/5651-200.png"
          />
          <p className="text-xl">Surprise Me !!!</p>
        </button>
        <div className="flex items-center space-x-3">
          <p className="text-xl text-black">Order by</p>
          <DropDownMenu
            pokemons={pokemons}
            setData={setPokemonsData}
            setIsDrop={setIsDrop}
            isDrop={isDrop}
          />
        </div>
      </div>
      {/* <Link to="/">Go back home</Link> */}
      <div className="grid grid-cols-4 gap-8">
        {pokemons.length > 0 && renderPokemons}
      </div>
    </div>
  );
}

export default PokemonRendering;
