import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import IndexPage, { loader as IndexPageLoader } from "./pages/index";
import { ClerkProvider } from "@clerk/clerk-react";
import DefaultLayout from "./layouts/default";
import MangaInfoPage, { loader as mangaLoader } from "./pages/manga";
import ReaderPage, { loader as readerLoader } from "./pages/reader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <IndexPage />, loader: IndexPageLoader },
      {
        path: "/manga/:manga_id",
        element: <MangaInfoPage />,
        loader: mangaLoader,
      },
      {
        path: "reader/:manga_id/:chapter_id",
        element: <ReaderPage />,
        loader: readerLoader,
      },
    ],
  },
]);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
