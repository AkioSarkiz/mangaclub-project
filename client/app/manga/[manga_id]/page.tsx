"use client";

import { Manga } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffectOnce } from "react-use";

interface GetDataProps {
  manga_id: string;
}

const getData = async (params: GetDataProps) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/${params.manga_id}`
  );

  return { manga: data, mangaId: params.manga_id };
};

const MangaInfoPage = ({ params }: { params: GetDataProps }) => {
  const [manga, setManga] = useState<Manga | null>(null);
  const [mangaId, setMangaId] = useState<string | null>(null);

  useEffectOnce(() => {
    getData(params).then(({ manga, mangaId }) => {
      setManga(manga);
      setMangaId(mangaId);
    });
  });

  if (!manga) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className="w-[90%] flex flex-col gap-3 m-auto">
        <div>
          <Image
            className="w-[350px] h-auto block m-auto rounded-md"
            src={manga.cover}
            width={350}
            height={500}
            alt="cover"
          />
        </div>

        <Link className="btn btn-primary" href={`/reader/${mangaId}/chapter-1`}>
          Read now
        </Link>

        <h3 className="text-xl font-semibold">{manga.title}</h3>

        <div className="flex gap-3 mt-2 flex-wrap">
          {manga.genres.map((genre: string) => (
            <div key={genre} className="badge badge-primary badge-lg">
              {genre}
            </div>
          ))}
        </div>

        <h4 className="text-base font-bold mt-3">Description</h4>
        <p className="text-base">{manga.description}</p>

        <div className="mt-3">
          <div className="text-lg font-bold">Chapters</div>
        </div>

        {manga.chapters.map((chapter) => {
          const chapterId = chapter.title.replace(/\s/g, "-").toLowerCase();

          return (
            <Link key={chapter.link} href={`/reader/${mangaId}/${chapterId}`}>
              <span className="text-base hover:text-primary">
                {chapter.title}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MangaInfoPage;
