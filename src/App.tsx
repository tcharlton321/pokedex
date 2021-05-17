import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Pokemon, PokemonSearchResults } from './react-app-env';
import './App.css';

function App() {
  const defaultPokemon:Pokemon[] = [];

  
  const [pokemons, setPokemonList]= useState(defaultPokemon);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  const addPokemon = (poke:Pokemon) => {
    pokemons.push(poke);
    pokemons.sort((a, b) => a.id - b.id)
    setPokemonList([...pokemons]);
  }

  useEffect(() => {
    setLoading(true);
    axios.get<PokemonSearchResults>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response_01 => {
        response_01.data.results?.map((re) => (
          axios.get<Pokemon>(re.url)
          .then(response_02 => {
            addPokemon(response_02.data)
          })
          .catch(ex => {
            const error =
            ex.response.status === 404
              ? "Resource Not found"
              : "An unexpected error has occurred";
            setError(error);
            setLoading(false);
          })
        ))
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource Not found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
        {pokemons.map((pokemon) => (
          <div className="card">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt='missingImage' width="100" height="100"></img>
          </div>
        ))}
    </div>
  );
}

export default App;
