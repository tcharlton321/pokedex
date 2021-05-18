import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Pokemon, PokemonSearchResults } from './react-app-env';
import './App.css';

function App() {
  const limit:number = 151;
  const defaultPokemon:Pokemon[] = [];

  
  const [pokemons, setPokemonList]= useState(defaultPokemon);

  useEffect(() => {
    axios.get<PokemonSearchResults>('https://pokeapi.co/api/v2/pokemon?limit='+limit)
      .then(response_01 => {
        response_01.data.results?.map((re) => (
          axios.get<Pokemon>(re.url)
          .then(response_02 => {
            pokemons.push(response_02.data);
            if(response_02.data.id === limit){
              pokemons.sort((a, b) => a.id - b.id);
              console.log('setPokemonList');
              setPokemonList([...pokemons]);
            }
          })
        ))
      });
  }, []);

  return (
    <div className="App">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="card">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt='missingImage' width="100" height="100"></img>
          </div>
        ))}
    </div>
  );
}

export default App;
