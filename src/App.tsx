import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Pokemon, PokemonSearchResults } from './react-app-env';
import Popup from 'reactjs-popup';

import './App.css';


function App() {
  const limit:number = 1;
  const defaultPokemon:Pokemon[] = [];

  
  const [pokemons, setPokemonList]= useState(defaultPokemon);

  useEffect(() => {
    var tempPokeList:Pokemon[] = [];
    axios.get<PokemonSearchResults>('https://pokeapi.co/api/v2/pokemon?limit='+limit)
      .then(response_01 => {
        response_01.data.results?.map((re) => (
          axios.get<Pokemon>(re.url)
          .then(response_02 => {
            tempPokeList.push(response_02.data);
            if(response_02.data.id === limit){
              tempPokeList.sort((a, b) => a.id - b.id);
              console.log('setPokemonList');
              setPokemonList([...tempPokeList]);
            }
          })
        ))
      });
  }, []);

  return (
    <div className="App">
        {pokemons.map((pokemon) => (
          <Popup className="poke-modal-container"
          key={pokemon.id}
          trigger={open => (
            <div key={pokemon.id} className="card">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} 
              alt='missingImage' width="100" height="100"></img>
          </div>
          )}
          modal
          position="center center">
            <div className="pokeModal_01">
              <div className="poke-top">
                <div className="poke-top-left">
                  <img 
                    src={pokemon.sprites.front_default} 
                    alt='missingImage' width="100" height="100">
                  </img>
                  <h3>No.{pokemon.id}</h3>
                </div>
                <div className="poke-top-right">
                  <h3>{pokemon.name}</h3>
                  <h3>species text</h3>
                  <h3>HT {pokemon.height}</h3>
                  <h3>WT {pokemon.weight}</h3>
                </div>
              </div>
            </div>
          </Popup>
        ))}
    </div>
  );
}

export default App;
