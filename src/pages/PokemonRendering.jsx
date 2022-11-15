import { useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../components/pages/pokemonRendering/Pokemon";
import PokemonFinder from "../components/pages/pokemonRendering/PokemonFinder";
import DropDownMenu from "../components/pages/pokemonRendering/DropDownMenu";
import { useEffect } from "react";

function PokemonRendering({ pokemons, setPokemons, resetData, pokemonsNames }) {
  const [isDrop, setIsDrop] = useState(false);
  const [options, setOptions] = useState("Inferior number");

  useEffect(() => {
    document.title = "Pokédex | Pokemons";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  function handleSurprise() {
    setOptions("Inferior number");
    setPokemons(resetData.sort((a, b) => 0.5 - Math.random()));
    setIsDrop(!isDrop);
  }

  function setPokemonsData() {
    setPokemons([...resetData]);
  }

  const renderPokemons = pokemons.map((pokemon) => (
    <Link key={pokemon.name} to={`/pokemons/${pokemon.name}`}>
      <Pokemon pokemon={pokemon} />
    </Link>
  ));

  return (
    <div className="font-bold text-green-300 flex flex-col items-center">
      <p className="text-black text-7xl">Pokedex</p>
      <div>
        <PokemonFinder
          setPokemons={setPokemons}
          pokemonsNames={pokemonsNames}
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
            alt="reload"
            className="h-8"
            src="https://static.thenounproject.com/png/5651-200.png"
          />
          <p className="text-xl">Surprise Me !!!</p>
        </button>
        <div className="flex items-center space-x-3">
          <p className="text-xl text-black">Order by</p>
          <DropDownMenu
            resetData={resetData}
            setPokemons={setPokemons}
            setIsDrop={setIsDrop}
            isDrop={isDrop}
            options={options}
            setOptions={setOptions}
          />
        </div>
      </div>
      <div className="flex items-center">
        {pokemons.length > 0 ? (
          <div className="grid grid-cols-4 gap-8">{renderPokemons}</div>
        ) : (
          <img
            alt="loading pokemons..."
            src={
              "https://thumbs.gfycat.com/FrightenedAntiqueDaddylonglegs-size_restricted.gif"
            }
          />
        )}
      </div>
    </div>
  );
}

export default PokemonRendering;
