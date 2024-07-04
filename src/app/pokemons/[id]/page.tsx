import React from "react";
import Image from "next/image";
import { Pokemon } from "@/Types/pokemon";
import Link from "next/link";

const fetchPokemonData = async (id: string) => {
  const apiUrl = "http://localhost:3000";
  const response = await fetch(`${apiUrl}/api/pokemons/${id}`);
  return response.json();
};

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const pokemonData: Pokemon = await fetchPokemonData(params.id);

  return (
    <div className="item-center text-lg">
      <h1>{pokemonData.korean_name}</h1>
      <p>No. {pokemonData.id.toString().padStart(4, "0")}</p>
      <Image
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        width={150}
        height={150}
        className="m-auto"
      />
      <p>이름: {pokemonData.korean_name}</p>
      <p>
        키: {pokemonData.height / 10} m, 몸무게: {pokemonData.weight / 10} kg
      </p>
      <p>타입: {pokemonData.types.map((t) => t.type.korean_name).join(", ")}</p>
      <p>기술:</p>
      <ul>
        {pokemonData.moves.map((m) => (
          <li key={m.move.name}>{m.move.korean_name}</li>
        ))}
      </ul>
      <Link
        href="/"
        className="bg-[#333333] hover:bg-blue-700 text-white border-none px-4 py-2 mt-5 cursor-pointer"
      >
        뒤로 가기
      </Link>
    </div>
  );
};

export default PokemonDetail;
