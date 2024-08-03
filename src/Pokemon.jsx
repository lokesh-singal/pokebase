import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=48";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const eachPokemon = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const eachPokemonData = await Promise.all(eachPokemon);
      console.log(eachPokemonData);

      setPokemon(eachPokemonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search functionality
  const searchData = pokemon.filter((cur) =>
    cur.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h2>{`Error: ${error.message}`}</h2>;
  }
  return (
    <>
      <header>
        <h1>Let's catch Pokémon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <ul>
        {searchData.map((curElem) => {
          return <PokemonCards key={curElem.id} pokemonData={curElem} />;
        })}
      </ul>
    </>
  );
};
