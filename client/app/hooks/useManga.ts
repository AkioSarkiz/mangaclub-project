import { fetcher } from "@/app/lib/fetcher";
import useSWR from "swr";

export const useManga = (mangaId: string) => {
  const { data, error, isLoading, } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/manga/${mangaId}`,
    // custom fetcher to transform data.
    (url: string) =>
      fetcher(url).then((data) => {
        // sort chapters.
        data.chapters = data.chapters.sort(
          (a: any, b: any) => a.index - b.index
        );

        return data;
      })
  );

  return {
    manga: data,
    isLoading,
    isError: error,
  };
};
