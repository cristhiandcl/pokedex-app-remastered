import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className={`opacity-90 h-screen flex flex-col justify-center items-center bg-[url('./images/45634.png')] bg-center space-y-96 sm:space-y-80`}
    >
      <p className="text-7xl sm:text-9xl font-bold text-white">Pokedex</p>
      <div className="font-bold text-3xl sm:text-5xl flex flex-col items-center space-x-2 ">
        <p>Go and check the</p>{" "}
        <Link className="" to="/pokemons">
          <p className="animate-bounce mt-4 text-red-600 font-bold">Pokemons</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
