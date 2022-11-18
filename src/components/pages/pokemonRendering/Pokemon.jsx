import { v4 as uuid } from "uuid";

function Pokemon({ pokemon }) {
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

  return (
    <div className="flex flex-col items-center justify-center hover:scale-105">
      <img
        className="rounded p-4 bg-gray-100 h-[200px] w-[200px]"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <p className="text-gray-300 text-xs text-left w-3/4 mb-4">
        N.°{pokemon.id}
      </p>
      <p className="text-black text-xl">
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </p>
      <div className="text-black flex space-x-3">
        {pokemon.types.map((elem) => (
          <p
            key={uuid()}
            className={`text-xs border rounded px-4 py-0.5 ${
              types[elem.type.name]
            }`}
          >
            {elem.type.name[0].toUpperCase() + elem.type.name.slice(1)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
