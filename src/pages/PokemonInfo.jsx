import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Evolution from "../components/pages/pokemonInfo/evolution";
import PokemonData from "../components/pages/pokemonInfo/PokemonData";

function PokemonInfo({ pokemons, setPokemons, resetData }) {
  const [pokemonData, setPokemonData] = useState();
  const { name } = useParams();
  const pokemon = pokemons.filter((pokemon) => pokemon.name.includes(name));
  const id = pokemon.length > 0 && pokemon[0].id;

  useEffect(() => {
    document.title = `${name[0].toUpperCase() + name.slice(1)} | Pokédex`;
    id && getPokemonSpecies(id);
  }, [name, id]);

  async function getPokemonSpecies(id) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const pokemonSpecies = await response.json();
    setPokemonData({
      evolution:
        pokemonSpecies.evolution_chain && pokemonSpecies.evolution_chain.url,
      evolvesFrom: pokemonSpecies.evolves_from_species,
      name: pokemonSpecies.name,
      species: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      varieties: pokemonSpecies.varieties,
      habitat:
        pokemonSpecies.habitat === null
          ? "unknown"
          : pokemonSpecies.habitat.name,
      category: pokemonSpecies.genera,
      description: pokemonSpecies.flavor_text_entries.filter(
        (elem) => elem.language.name === "en"
      )[0].flavor_text,
    });
  }
  // console.log(pokemons);
  // console.log(JSON.stringify(pokemons));

  return (
    <>
      {pokemon.length > 0 && pokemonData ? (
        <div className="flex flex-col items-center space-y-10 py-8">
          <PokemonData
            name={name}
            pokemon={pokemon}
            pokemons={pokemons}
            setPokemons={setPokemons}
            resetData={resetData}
            pokemonData={pokemonData}
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
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img
            className="bg-transparent"
            alt="loading pokemons..."
            src={require("../images/pokeball.gif")}
          />
        </div>
      )}
    </>
  );
}

export default PokemonInfo;
