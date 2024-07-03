"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Failed to fetch pokemon data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-list">
      <h1>포켓몬 도감</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemons/${pokemon.id}`}>
            <div className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h2>{pokemon.korean_name}</h2>
              <p>도감번호: {pokemon.id}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
