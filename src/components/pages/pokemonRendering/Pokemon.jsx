import { v4 as uuid } from "uuid";

function Pokemon({ pokemon, types }) {
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
          <div key={uuid()}>
            {/* <p
              key={uuid()}
              className={`text-xs border rounded px-4 py-0.5 ${
                types[elem.type.name].color
              }`}
            >
              {elem.type.name[0].toUpperCase() + elem.type.name.slice(1)}
            </p> */}
            <img
              src={types[elem.type.name].image}
              className="w-8"
              alt={types[elem.type.name].name}
              // onMouseEnter={() => console.log(types[elem.type.name].name)}
              title={types[elem.type.name].name.toUpperCase()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
