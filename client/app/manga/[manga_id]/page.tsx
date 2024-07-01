import { MangaDetails } from "@/app/manga/[manga_id]/manga-details";
import { Manga } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { manga_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchData = async (mangaId: string): Promise<{ manga: Manga }> => {
  const manga = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/${mangaId}`
  ).then((res) => res.json());

  return { manga };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const manga_id = params.manga_id;

  const { manga } = await fetchData(manga_id);

  return {
    title: `${manga.title} - Mangaclub`,
    description: manga.description,
    openGraph: {
      images: manga.cover,
      description: manga.description,
      title: `${manga.title} - Mangaclub`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { manga } = await fetchData(params.manga_id);

  return <MangaDetails params={{ ...params, manga }} />;
}
