"use client";

import Image from "next/image";
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
  const redirectLink = `manga/${url.pathname}`;

  return (
    <div className="text-center">
      <div>
        <Link href={redirectLink}>
          <Image
            width={110}
            height={150}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0WwEAAUoA+OJtThAAAAAASUVORK5CYII="
            className="rounded-md object-cover block m-auto"
            src={manga.cover}
            placeholder="blur"
            alt="manga cover"
          />
        </Link>
      </div>
      <Link href={redirectLink}>
        <h3 className="text-base font-bold truncate hover:text-primary">
          {manga.title}
        </h3>
      </Link>
    </div>
  );
};

export default MangaCard;
