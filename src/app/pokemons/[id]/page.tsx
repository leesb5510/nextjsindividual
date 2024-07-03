import React from "react";
import axios from "axios";

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

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const response = await axios.get(
    `http://localhost:3000/api/pokemons/${params.id}`
  );
  const pokemon: Pokemon = response.data;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.korean_name}</h1>
      <p>No. {pokemon.id.toString().padStart(4, "0")}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>이름: {pokemon.korean_name}</p>
      <p>
        키: {pokemon.height / 10} m, 몸무게: {pokemon.weight / 10} kg
      </p>
      <p>타입: {pokemon.types.map((t) => t.type.korean_name).join(", ")}</p>
      <p>기술:</p>
      <ul>
        {pokemon.moves.map((m) => (
          <li key={m.move.name}>{m.move.korean_name}</li>
        ))}
      </ul>
      <button onClick={() => window.history.back()}>뒤로 가기</button>
    </div>
  );
};

export default PokemonDetail;
