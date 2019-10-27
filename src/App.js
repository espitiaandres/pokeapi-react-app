import React, { useState, useEffect } from 'react'; //parameters in { useState, useEffect } are called "hooks"
import PokemonList from './PokemonList';
import axios from 'axios'; //axios lets you call apis much easier than the built-in fetch funciton in React.js
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]) //this can't be empty, must have at least an empty array...
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")  
  const [nextPageUrl, setNextPageUrl] = useState()  
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [fullPokemon, setFullPokemon] = useState([])
  const [fullPokemonUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=965")

  useEffect(() => {
    setLoading(true) //sets the loading variable to true when first starting to load the app
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
    <> {/* The empty <> is just an empty object that wraps the items you want to return, kinda like a react fragment */}
      <PokemonList pokemon={pokemon} fullPokemon={fullPokemon}/>  
      <Pagination
      gotoNextPage={nextPageUrl ? gotoNextPage : null} //ternary operator
      gotoPrevPage={previousPageUrl ? gotoPrevPage: null}
      />
    </>
  );
}

export default App;
