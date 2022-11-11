import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Evolution from "../components/pages/pokemonInfo/evolution";
import PokemonData from "../components/pages/pokemonInfo/PokemonData";

function PokemonInfo({ pokemons }) {
  const [pokemonData, setPokemonData] = useState();
  // const [pokemonCategory, setPokemonCategory] = useState();
  const { name } = useParams();
  const pokemon = pokemons.filter((pokemon) => pokemon.name === name);

  useEffect(() => {
    getPokemonSpecies(name);
  }, []);

  async function getPokemonSpecies(name) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}/`
    );
    const pokemonSpecies = await response.json();
    setPokemonData({
      evolution: pokemonSpecies.evolution_chain.url,
      varieties: pokemonSpecies.varieties,
      habitat:
        pokemonSpecies.habitat === null
          ? "unknown"
          : pokemonSpecies.habitat.name,
      category: pokemonSpecies.genera,
    });
    // setPokemonCategory(pokemonSpecies.genera);
  }

  console.log(name);
  console.log(pokemon);
  // console.log("category", setPokemonCategory);
  // console.log("species", pokemonData.category);
  // console.log("weakness", pokemonWeakness);

  return (
    <>
      {pokemon.length > 0 && pokemonData && (
        <div className="flex flex-col items-center space-y-10 py-8">
          <PokemonData
            name={name}
            pokemon={pokemon}
            pokemonData={pokemonData}
            // pokemonCategory={pokemonCategory}
          />
          <div>
            <Evolution pokemonEvolution={pokemonData} />
          </div>
          <Link to="/pokemons">
            <div className="px-4 py-2 text-center rounded-2xl bg-black text-white font-bold hover:scale-105">
              <p>Go back to the Pokedex</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default PokemonInfo;
