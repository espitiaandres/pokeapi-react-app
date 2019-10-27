import React from 'react'

export default function PokemonList({ pokemon, fullPokemon }) {
    return (
        <div>
            {pokemon.map(p => (
                <div key={p}>Pokemon #{fullPokemon.indexOf(p) + 1}: {p}</div>
            ))}
        </div>
    )
}
