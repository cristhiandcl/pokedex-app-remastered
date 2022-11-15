import { useState } from "react";

const PokemonFinder = ({ setPokemons, pokemons, getPokemonsData }) => {
  const [pokemonName, setPokemonName] = useState("");

  const handleChange = (event) => {
    event.target.name === "pokemonName" && setPokemonName(event.target.value);
    pokemonName.length < 2 && getPokemonsData();
  };

  const handleSend = (e) => {
    e.preventDefault();
    pokemonName !== "" &&
      setPokemons(
        pokemons.filter((pokemon) => pokemon.name === pokemonName.toLowerCase())
      );
    console.log(pokemons);
  };

  const isInvalid = pokemonName === "";

  return (
    <div className="flex items-center space-x-20 justify-center my-8">
      <div>
        <form onSubmit={handleSend}>
          <div className="flex justify-center items-center space-x-4">
            <input
              className="text-xs rounded text-center w-fit p-4 border"
              aria-label="Enter Pokemon name"
              type="text"
              placeholder="Pokemon Name"
              value={pokemonName}
              onChange={handleChange}
              name="pokemonName"
            />
            <button type="submit">
              <img
                className={`h-[50px] ${
                  isInvalid && "cursor-not-allowed opacity-50"
                }`}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
              />
            </button>
          </div>
        </form>
      </div>
      <p className="w-2/5 text-center text-xl bg-green-300 text-white p-2 rounded">
        Find any Pokemon you want as also some of its stats
      </p>
    </div>
  );
};

export default PokemonFinder;
