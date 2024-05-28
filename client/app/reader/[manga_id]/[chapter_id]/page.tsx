"use client";

import MFloat from "@/components/Float";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffectOnce } from "react-use";

interface Params {
  manga_id: string;
  chapter_id: string;
}

const loadImage = (url: string) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
};

async function getData({ params }: { params: Params }) {
  let nextChapterId: number | null = null;

  const { data: mangaDetails } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/${params.manga_id}`
  );

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/${params.manga_id}/chapters/${params.chapter_id}`
  );

  const reversedChapters = mangaDetails.chapters.reverse();
  const currentManga = reversedChapters.findIndex((chapter: any) =>
    chapter.link.includes(params.chapter_id)
  );

  if (currentManga !== -1 && currentManga + 1 < reversedChapters.length) {
    nextChapterId = reversedChapters[currentManga + 1].title
      .replace(/\s/g, "-")
      .toLowerCase();
  }

  return { mangaFrames: data.frames, nextChapterId };
}

const ReaderPage = ({ params }: { params: Params }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [mangaFrames, setMangaFrames] = useState<{ image: string }[]>([]);
  const [nextChapterId, setNextChapterId] = useState<number | null>(null);

  const router = useRouter();

  const handleNextFrame = () => {
    if (frameIndex + 1 < mangaFrames.length) {
      setFrameIndex(frameIndex + 1);

      // reset scroll position
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }

      return;
    }

    router.push(
      nextChapterId && nextChapterId !== Number(params.chapter_id)
        ? `/reader/${params.manga_id}/${nextChapterId}`
        : `/manga/${params.manga_id}`
    );
  };

  // reset frame index when changing chapter
  useEffect(() => {
    setFrameIndex(0);
  }, [params]);

  // preload all images
  useEffect(() => {
    new Promise((resolve) => {
      for (let i = 0; i < mangaFrames.length; i++) {
        const frame = mangaFrames[i];
        loadImage(frame.image).then();
      }

      resolve(undefined);
    });
  }, [mangaFrames]);

  // fetch data
  useEffectOnce(() => {
    getData({ params }).then(({ mangaFrames, nextChapterId }) => {
      setMangaFrames(mangaFrames);
      setNextChapterId(nextChapterId);
    });
  });

  if (!nextChapterId) {
    return <div>loading...</div>;
  }

  return (
    <>
      <MFloat position="bottom-center">
        <div className="flex gap-2 items-center bg-base-100 px-3 rounded-sm">
          <label htmlFor="page-selector">Page</label>
          <select
            id="page-selector"
            className="select w-full max-w-xs"
            value={frameIndex}
            onChange={(e) => setFrameIndex(Number(e.target.value))}
          >
            {mangaFrames.map((_, index) => (
              <option key={index} disabled={index === frameIndex} value={index}>
                {index + 1} of {mangaFrames.length}
              </option>
            ))}
          </select>
        </div>
      </MFloat>

      <img
        onClick={handleNextFrame}
        className="w-100 h-auto block mx-auto"
        src={mangaFrames[frameIndex].image}
        alt={`frame #${frameIndex}`}
      />
    </>
  );
};

export default ReaderPage;
