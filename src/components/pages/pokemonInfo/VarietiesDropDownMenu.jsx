import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function VarietiesDropDownMenu({
  varieties,
  setPokemons,
  pokemons,
  name,
  resetData,
}) {
  const [newPokemon, setNewPokemon] = useState([]);
  const [isChange, SetisChange] = useState(false);

  useEffect(() => {
    function getPokemon() {
      varieties.map(async (variety) => {
        const response = await fetch(variety.pokemon.url);
        const pokemon = await response.json();
        if (
          pokemons.find((pokemon) => pokemon.name === variety.pokemon.name) ===
          undefined
        ) {
          setNewPokemon((prevNewPokemon) => [
            ...prevNewPokemon,
            {
              abilities: pokemon.abilities,
              name: pokemon.name,
              sprites: pokemon.sprites,
              stats: pokemon.stats,
              types: pokemon.types,
              id: pokemon.id,
              height: pokemon.height,
              weight: pokemon.weight,
            },
          ]);
        }
      });
    }
    getPokemon();
    setPokemons([...resetData, ...newPokemon]);
  }, [isChange]);

  const varietiesToRender = varieties.map((variety, i) => {
    const RandomId = uuid();
    return (
      <div key={i}>
        <Menu.Item>
          {({ active }) => (
            <Link to={`/pokemons/${variety.pokemon.name}`}>
              <div
                onMouseEnter={() => SetisChange(!isChange)}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block w-full px-4 py-2 text-center font-bold text-sm"
                )}
              >
                {variety.pokemon.name[0].toUpperCase() +
                  variety.pokemon.name.slice(1)}
              </div>
            </Link>
          )}
        </Menu.Item>
      </div>
    );
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {
            <div className="flex items-center space-x-2">
              <img
                alt="pokeball"
                className={`h-[25px]`}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
              />{" "}
              <p>{name[0].toUpperCase() + name.slice(1)}</p>
            </div>
          }
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{varietiesToRender}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default VarietiesDropDownMenu;
