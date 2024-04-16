import {
  Link,
  LoaderFunctionArgs,
  NavLink,
  useLoaderData,
} from "react-router-dom";
import { Manga } from "../types";
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
  const { data } = await axios.get(
    `http://localhost:3000/manga/${params.manga_id}`
  );

  // prefetch cover
  if (data.cover) {
    await loadImage(data.cover);
  }

  return { manga: data, mangaId: params.manga_id };
}

const MangaInfoPage = () => {
  const { manga, mangaId } = useLoaderData() as {
    manga: Manga;
    mangaId: string;
  };

  return (
    <>
      <div className="w-[90%] flex flex-col gap-3 m-auto">
        <div>
          <img
            className="w-[350px] h-auto block m-auto rounded-md"
            src={manga.cover}
          />
        </div>

        <NavLink
          className="btn btn-primary"
          to={`/reader/${mangaId}/chapter-1`}
        >
          Read now
        </NavLink>

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
            <Link key={chapter.link} to={`/reader/${mangaId}/${chapterId}`}>
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
