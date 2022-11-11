import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Evolution({ pokemonEvolution }) {
  const [evolution, setEvolution] = useState();

  useEffect(() => {
    settingEvolutions();
  }, []);

  async function settingEvolutions() {
    const response = await fetch(pokemonEvolution.evolution);
    const incomingData = await response.json();
    if (incomingData.chain.evolves_to.length > 0) {
      if (incomingData.chain.evolves_to[0].evolves_to.length > 0) {
        setEvolution([
          incomingData.chain.species,
          incomingData.chain.evolves_to[0].species,
          incomingData.chain.evolves_to[0].evolves_to[0].species,
        ]);
      } else {
        setEvolution([
          incomingData.chain.species,
          incomingData.chain.evolves_to[0].species,
        ]);
      }
    } else {
      setEvolution([incomingData.chain.species]);
    }
  }
  console.log(evolution);
  return (
    <div className="flex flex-col border-2 bg-gray-100 rounded-md rounded-bl-3xl p-16 space-y-7">
      <p className="font-bold text-3xl text-center">Evolutions</p>
      <div className="flex space-x-4 ">
        {evolution !== undefined &&
          evolution.map((evo, i) => {
            const id = evo.url.slice(42, evo.url.length - 1);
            return (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center border-4 border-black w-[220px] h-[220px] rounded-full">
                    <Link to={`/pokemons/${evo.name}`}>
                      <img
                        key={evo.name}
                        className="w-[150px]"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                      />
                    </Link>
                  </div>
                  <p className="font-bold text-gray-600 text-xl">
                    <span className="text-black">
                      {evo.name[0].toUpperCase() + evo.name.slice(1)}
                    </span>{" "}
                    N.° {id}
                  </p>
                </div>
                {i < evolution.length - 1 && (
                  <p className="text-8xl font-bold">{">"}</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Evolution;