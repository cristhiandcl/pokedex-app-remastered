import { useEffect, useState } from "react";
import { Hint } from "react-autocomplete-hint";

const PokemonFinder = ({
  setPokemons,
  pokemons,
  getPokemonsData,
  pokemonsNames,
}) => {
  const [pokemonName, setPokemonName] = useState("");

  useEffect(() => {}, []);

  const handleChange = (event) => {
    event.target.name === "pokemonName" && setPokemonName(event.target.value);
    pokemonName.length < 1 && getPokemonsData();
  };

  const handleSend = (e) => {
    e.preventDefault();
    pokemonName !== "" &&
      setPokemons(
        pokemons.filter((pokemon) => pokemon.name === pokemonName.toLowerCase())
      );
  };

  const isInvalid = pokemonName === "";

  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8 md:space-y-0 md:flex-row md:space-x-20">
      <form onSubmit={handleSend}>
        <div className="flex justify-center items-center space-x-4">
          <Hint options={pokemonsNames} allowTabFill={true}>
            <input
              className="text-xs rounded w-fit p-4 border"
              aria-label="Enter Pokemon name"
              type="text"
              placeholder="Pokemon Name"
              value={pokemonName}
              onChange={handleChange}
              name="pokemonName"
            />
          </Hint>
          <button type="submit">
            <img
              alt="Pokeball button"
              className={`h-[50px] ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
            />
          </button>
        </div>
      </form>

      <p className="w-2/5 text-center text-xl bg-green-300 text-white p-2 rounded">
        Find any Pokemon you want as also some of its stats
      </p>
    </div>
  );
};

export default PokemonFinder;
