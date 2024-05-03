"use client";

import Link from "next/link";

interface Manga {
  id: number;
  title: string;
  cover: string;
  rating: number;
  link: string;
}

interface Props {
  manga: Manga;
}

const MangaCard = ({ manga }: Props) => {
  const url = new URL(manga.link);

  return (
    <div className="text-center">
      <div>
        <Link href={url.pathname}>
          <img
            className="rounded-md w-[110px] h-[150px] object-cover block m-auto"
            src={manga.cover}
            alt="manga cover"
          />
        </Link>
      </div>
      <Link href={url.pathname}>
        <h3 className="text-base font-bold truncate hover:text-primary">
          {manga.title}
        </h3>
      </Link>
    </div>
  );
};

export default MangaCard;
