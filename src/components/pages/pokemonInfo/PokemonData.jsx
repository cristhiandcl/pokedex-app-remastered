import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import VarietiesDropDownMenu from "./VarietiesDropDownMenu";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function PokemonData({
  name,
  pokemon,
  setPokemons,
  pokemonData,
  pokemons,
  resetData,
  types,
}) {
  const [pokemonWeakness, setPokemonWeakness] = useState([]);

  const data = {
    stats: [
      pokemon[0].stats[0].stat.name.toUpperCase(),
      pokemon[0].stats[1].stat.name[0].toUpperCase() +
        pokemon[0].stats[1].stat.name.slice(1),
      pokemon[0].stats[2].stat.name[0].toUpperCase() +
        pokemon[0].stats[2].stat.name.slice(1),
      pokemon[0].stats[3].stat.name[0].toUpperCase() +
        pokemon[0].stats[3].stat.name.slice(1, 8) +
        pokemon[0].stats[3].stat.name[8].toUpperCase() +
        pokemon[0].stats[3].stat.name.slice(9),
      pokemon[0].stats[5].stat.name[0].toUpperCase() +
        pokemon[0].stats[5].stat.name.slice(1),
      pokemon[0].stats[4].stat.name[0].toUpperCase() +
        pokemon[0].stats[4].stat.name.slice(1, 8) +
        pokemon[0].stats[4].stat.name[8].toUpperCase() +
        pokemon[0].stats[4].stat.name.slice(9),
    ],
    value: [
      pokemon[0].stats[0].base_stat,
      pokemon[0].stats[1].base_stat,
      pokemon[0].stats[2].base_stat,
      pokemon[0].stats[3].base_stat,
      pokemon[0].stats[5].base_stat,
      pokemon[0].stats[4].base_stat,
    ],
  };

  const tempVar = pokemonWeakness.map((weakness) => weakness.name);
  const WeaknessToRender = [...new Set(tempVar)];

  useEffect(() => {
    async function getPokemonWeakness() {
      setPokemonWeakness([]);
      for (let i = 0; i < pokemon[0].types.length; i++) {
        const response2 = await fetch(
          `https://pokeapi.co/api/v2/type/${pokemon[0].types[i].type.name}/`
        );
        const Weakness = await response2.json();
        setPokemonWeakness((prevPokemonWeakness) => [
          ...prevPokemonWeakness,
          ...Weakness.damage_relations.double_damage_from,
        ]);
      }
    }
    getPokemonWeakness();
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-2xl sm:text-5xl font-bold text-center">
        {name[0].toUpperCase() + name.slice(1)}{" "}
        <span className="text-gray-300">N.?? {pokemon[0].id}</span>
      </div>
      {pokemonData.varieties.length > 1 && (
        <VarietiesDropDownMenu
          varieties={pokemonData.varieties}
          name={name}
          resetData={resetData}
          pokemons={pokemons}
          setPokemons={setPokemons}
        />
      )}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 sm:w-full lg:w-3/4 px-4 sm:px-12 sm:space-x-8">
        <img
          alt={name}
          className="rounded-xl p-4 bg-gray-100 w-[350px] h-[400px]"
          src={
            pokemon[0].sprites.other["official-artwork"].front_default
              ? pokemon[0].sprites.other["official-artwork"].front_default
              : pokemon[0].sprites.front_default
          }
        />
        <div className="w-3/4 space-y-8">
          <p className="text-center">
            {pokemonData && pokemonData.description}
          </p>
          <div className="grid grid-cols-2 p-3 gap-y-6 bg-blue-400 font-bold rounded-xl">
            <div className="flex flex-col space-y-3">
              <p className="text-white">Height</p>
              <p>{pokemon[0].height / 10} m</p>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-white">Category</p>

              <p>
                {pokemonData &&
                  pokemonData.category.find(
                    (elem) => elem.language.name === "en"
                  ).genus}
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-white">Weight</p>
              <p>{pokemon[0].weight / 10} Kg</p>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-white">Abilities</p>
              <div className="grid grid-cols-1 gap-y-2 gap-x-2 w-fit">
                {pokemon[0].abilities.map((abil) => (
                  <p
                    key={abil.ability.name}
                    className="text-center font-bold bg-white rounded-xl px-4 py-0.5"
                  >
                    {abil.ability.name[0].toUpperCase() +
                      abil.ability.name.slice(1)}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-white">Habitat</p>

              <p>
                {pokemonData &&
                  pokemonData.habitat[0].toUpperCase() +
                    pokemonData.habitat.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-16 w-full px-16 items-center justify-center text-white space-y-6">
        <div className="space-y-4 flex items-center flex-col mt-10 w-full border bg-gray-100 p-6 rounded-2xl order-2 md:order-1">
          <p className="text-3xl font-bold text-black">Stats</p>
          {data !== undefined && (
            <div className="flex flex-col space-y-4 w-full">
              {data.stats.map((elem, i) => (
                <div key={i} className="">
                  <p className="text-black font-bold">{elem}</p>
                  <ProgressBar
                    completed={data.value[i].toString()}
                    maxCompleted={Math.max(...data.value)}
                    bgColor="#aedf78"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6 order-1 md:order-2 w-full">
          <div className="flex flex-col space-y-6">
            <p className="text-3xl font-bold text-black text-center">Type</p>
            <div className="flex justify-around">
              {pokemon[0].types.map((elem) => (
                <Link to="/pokemons" key={uuid()}>
                  <img
                    src={types[elem.type.name].image}
                    className="w-14"
                    alt={types[elem.type.name].name}
                    title={types[elem.type.name].name.toUpperCase()}
                    onClick={() =>
                      setPokemons(
                        resetData.filter((pokemon) =>
                          pokemon.types
                            .map((types) => types.type.name)
                            .includes(elem.type.name)
                        )
                      )
                    }
                  />
                  {/* <p
                    key={uuid()}
                    className={`text-xl text-center border font-bold rounded-xl px-4 py-0.5 ${
                      types[elem.type.name]
                    }`}
                    
                  >
                    {elem.type.name[0].toUpperCase() + elem.type.name.slice(1)}
                  </p> */}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-3xl font-bold text-black text-center">
              Weakness
            </p>
            <div className="flex justify-around">
              {pokemonWeakness !== undefined &&
                WeaknessToRender.map((weakness) => (
                  <Link to="/pokemons" key={uuid()}>
                    <img
                      src={types[weakness].image}
                      className="w-14"
                      alt={types[weakness].name}
                      // onMouseEnter={() => console.log(types[elem.type.name].name)}
                      title={types[weakness].name.toUpperCase()}
                      onClick={() =>
                        setPokemons(
                          resetData.filter((pokemon) =>
                            pokemon.types
                              .map((types) => types.type.name)
                              .includes(weakness)
                          )
                        )
                      }
                    />
                    {/* <p
                      key={uuid()}
                      onClick={() =>
                        setPokemons(
                          resetData.filter((pokemon) =>
                            pokemon.types
                              .map((types) => types.type.name)
                              .includes(weakness)
                          )
                        )
                      }
                      className={`text-xl text-center border font-bold rounded-xl px-4 py-0.5 ${types[weakness]}`}
                    >
                      {weakness[0].toUpperCase() + weakness.slice(1)}
                    </p> */}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonData;
