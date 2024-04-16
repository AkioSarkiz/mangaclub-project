import { useAtom } from "jotai";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { isDrawerOpened } from "../atoms/drawer";

// interface DrawerListItem {
//   label: string;
//   to: { name?: string; path?: string };
//   external?: boolean;
// }

const Drawer: React.FC = () => {
  const [isChecked, setIsChecked] = useAtom(isDrawerOpened);
  const location = useLocation();

  const list = React.useMemo(
    () => {
      // if (user) {
      //   return [
      //     { label: "Home", to: { name: "index" } },
      //     { label: "Log out", to: { path: "/api/logout" }, external: true },
      //   ];
      // }

      return [
        { label: "Home", to: { name: "index" } },
        { label: "Log in", to: { path: "/api/login" }, external: true },
        {
          label: "Registration",
          to: { path: "/api/register" },
          external: true,
        },
      ];
    },
    [] /**[user]*/
  );

  const handleToggle = () => setIsChecked(!isChecked);

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {list.map((listItem) => (
            <li key={listItem.label}>
              {listItem.external ? (
                <a href={listItem.to.path} target="_blank" rel="noreferrer">
                  {listItem.label}
                </a>
              ) : (
                <Link
                  to={listItem.to.path || ""}
                  replace={location.pathname === listItem.to.path}
                >
                  {listItem.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
