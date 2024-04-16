import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import MFloat from "../components/Float";
import { useEffect, useState } from "react";
import axios from "axios";

function loadImage(url: string) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

export async function loader({ params }: LoaderFunctionArgs) {
  let nextChapterId: number | null = null;

  const { data: mangaDetails } = await axios.get(
    `http://localhost:3000/manga/${params.manga_id}`
  );

  const { data } = await axios.get(
    `http://localhost:3000/manga/${params.manga_id}/chapters/${params.chapter_id}`
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

  return { mangaFrames: data, nextChapterId };
}

const ReaderPage = () => {
  const { manga_id, chapter_id } = useParams();
  const navigate = useNavigate();
  const [frameIndex, setFrameIndex] = useState(0);
  const { mangaFrames, nextChapterId } = useLoaderData() as {
    mangaFrames: { url: string }[];
    nextChapterId: number | null;
  };

  // preload all images
  useEffect(() => {
    new Promise((resolve) => {
      for (let i = 0; i < mangaFrames.length; i++) {
        const frame = mangaFrames[i];
        loadImage(frame.url).then();
      }

      resolve(undefined);
    });
  }, [mangaFrames]);

  const handleNextFrame = () => {
    if (frameIndex + 1 < mangaFrames.length) {
      setFrameIndex(frameIndex + 1);
      return;
    }

    navigate(
      nextChapterId && nextChapterId !== Number(chapter_id)
        ? `/reader/${manga_id}/${nextChapterId}`
        : `/manga/${manga_id}`,

      {
        state: {},
      }
    );
  };

  useEffect(() => {
    setFrameIndex(0);
  }, [manga_id, chapter_id]);

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
        src={mangaFrames[frameIndex].url}
        alt={`frame #${frameIndex}`}
      />
    </>
  );
};

export default ReaderPage;
