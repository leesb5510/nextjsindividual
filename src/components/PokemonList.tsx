"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/Types/pokemon";

const PokemonList: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        setPokemonData(data);
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
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <Link key={pokemon.id} href={`/pokemons/${pokemon.id}`}>
          <div className="p-4 m-4 rounded-lg bg-[#333333] text-white flex flex-col justify-start item-center">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
              className="mx-auto"
            />
            <h2>{pokemon.korean_name}</h2>
            <p>도감번호: {pokemon.id}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
