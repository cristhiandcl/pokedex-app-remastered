import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";

function PokemonData({ name, pokemon, pokemonData }) {
  const [pokemonWeakness, setPokemonWeakness] = useState([]);

  const types = {
    normal: "bg-stone-500",
    fighting: "bg-red-800",
    flying: "bg-blue-200",
    poison: "bg-fuchsia-500",
    ground: "bg-yellow-100",
    rock: "bg-yellow-600",
    bug: "bg-lime-500",
    ghost: "bg-violet-600",
    steel: "bg-slate-400",
    fire: "bg-red-500",
    water: "bg-sky-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-300",
    ice: "bg-sky-400",
    dragon: "bg-purple-600",
    dark: "bg-amber-900",
    fairy: "bg-pink-200",
  };

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

  useEffect(() => {
    async function getPokemonWeakness() {
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
  }, []);

  const tempVar = pokemonWeakness.map((weakness) => weakness.name);
  const WeaknessToRender = [...new Set(tempVar)];

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="text-5xl font-bold">
        {name[0].toUpperCase() + name.slice(1)}{" "}
        <span className="text-gray-300">N.° {pokemon[0].id}</span>
      </div>
      <div className="flex space-x-6 justify-center items-center px-20">
        <img
          alt={name}
          className="rounded-xl p-4 bg-gray-100 w-[350px] h-[400px]"
          src={pokemon[0].sprites.other["official-artwork"].front_default}
        />
        <div className=" w-2/6 space-y-8 px-4">
          <p className="">{pokemonData && pokemonData.description}</p>
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
      <div className="flex w-4/6 items-center justify-center space-x-16 text-white">
        <div className="space-y-4 flex items-center flex-col w-2/5 border bg-gray-100 p-6 rounded-2xl">
          <p className="text-3xl font-bold text-black">Stats</p>
          {data !== undefined && (
            <div className="flex flex-col w-5/6 space-y-4">
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
        <div className="space-y-6 3/5">
          <div className="flex flex-col space-y-6">
            <p className="text-3xl font-bold text-black">Type</p>
            <div className="grid gap-x-2 grid-cols-2 w-fit">
              {pokemon[0].types.map((elem) => (
                <p
                  key={elem.type.name}
                  className={`text-xl text-center border font-bold rounded-xl px-4 py-0.5 ${
                    types[elem.type.name]
                  }`}
                >
                  {elem.type.name[0].toUpperCase() + elem.type.name.slice(1)}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-3xl font-bold text-black">Weakness</p>
            <div className="grid gap-x-2 grid-cols-3 gap-y-3 w-fit">
              {pokemonWeakness !== undefined &&
                WeaknessToRender.map((weakness) => (
                  <p
                    key={weakness}
                    className={`text-xl text-center border font-bold rounded-xl px-4 py-0.5 ${types[weakness]}`}
                  >
                    {weakness[0].toUpperCase() + weakness.slice(1)}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonData;
