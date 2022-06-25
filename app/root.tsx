import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import stylesUrl from "~/styles/tailwind.css";
import type { LinksFunction } from "remix";
import "regenerator-runtime/runtime";
import {
  FilterIcon,
  GlobeIcon,
  UserGroupIcon,
  CogIcon,
  ClipboardCheckIcon,
  CalendarIcon,
} from "@heroicons/react/outline";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="sm:flex flex-col sm:flex-row sm:min-h-screen w-full bg-gray-100">
        <aside className="w-64 h-screen" aria-label="Sidebar">
          <div className="flex flex-col w-full md:w-64 text-gray-700 bg-transparent dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
            <div className="p-4 text-xl mt-9 ml-4 font-bold flex items-center">
              <GlobeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <span>Orbit</span>
            </div>
            <ul className="space-y-2 p-4">
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white cursor-default active"
                      : "bg-transparent hover:bg-gray-100 cursor-pointer"
                  } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
                }
              >
                <span className="flex-1 ml-1 whitespace-nowrap flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  Teams
                </span>
                <span className="inline-flex justify-center items-center px-2 ml-3 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-500 dark:text-gray-200">
                  Pro
                </span>
              </NavLink>
              <NavLink
                to="/tasks"
                caseSensitive={false}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white cursor-default active"
                      : "bg-transparent hover:bg-gray-100 cursor-pointer"
                  } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg  hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
                }
              >
                <span className="flex-1 ml-1 whitespace-nowrap flex items-center">
                  <ClipboardCheckIcon
                    className="h-4 w-4 mr-2"
                    aria-hidden="true"
                  />
                  Tasks
                </span>
              </NavLink>
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white cursor-default active"
                      : "bg-transparent hover:bg-gray-100 cursor-pointer"
                  } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
                }
              >
                <span className="flex-1 ml-1 whitespace-nowrap flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  Events
                </span>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white cursor-default active"
                      : "bg-transparent hover:bg-gray-100 cursor-pointer"
                  } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
                }
              >
                <span className="flex-1 ml-1 whitespace-nowrap flex items-center">
                  <CogIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  Settings
                </span>
              </NavLink>
            </ul>
          </div>
        </aside>
        <main className="grow p-5 bg-white m-1 rounded-lg flex justify-center items-center">
          <div className=" max-w-3xl h-full w-full">
            <Outlet />
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
