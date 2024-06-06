import { Pokemon } from "@/pokemons";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, name } = await getPokemon(params.id);
  return {
    title: `#${id} - ${name}`,
    description: `Página del pokemón ${name}`,
  };
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "force-cache", //TODO: Cambiar esto en un futuro
    // next: {
    //   revalidate: 60 * 60 * 30 * 6,
    // }
  }).then((resp) => resp.json());

  console.log("Se cargo: ", pokemon.name);

  return pokemon;
};

export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id);

  return (
    <div>
      <h1>Pokemón {params.id}</h1>
      <div>{pokemon.name}</div>
    </div>
  );
}
