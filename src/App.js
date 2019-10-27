import React, { useState, useEffect } from 'react'; 
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")  
  const [nextPageUrl, setNextPageUrl] = useState()  
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [fullPokemon, setFullPokemon] = useState([])
  const [fullPokemonUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=965")

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })
    axios.get(fullPokemonUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setFullPokemon(res.data.results.map(p => p.name))
    })

    return() => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(previousPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <> 
      <PokemonList pokemon={pokemon} fullPokemon={fullPokemon}/>  
      <Pagination
      gotoNextPage={nextPageUrl ? gotoNextPage : null} //ternary operator
      gotoPrevPage={previousPageUrl ? gotoPrevPage: null}
      />
    </>
  );
}

export default App;
