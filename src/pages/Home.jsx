import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="opacity-90 h-screen flex flex-col justify-center items-center bg-[url('https://wallpaper.dog/large/743396.jpg')] bg-cover">
      <p className="text-9xl font-bold text-gray-900">Pokedex</p>
      <div className="font-bold text-4xl flex flex-col items-center space-x-2 ">
        <p>Go and check the</p>{" "}
        <Link className="" to="/pokemons">
          <p className="animate-bounce mt-4 text-red-600 font-bold">Pokemons</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
