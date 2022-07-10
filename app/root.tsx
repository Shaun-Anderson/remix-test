import {
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
  GlobeIcon,
  CogIcon,
  ClipboardCheckIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { roundedConstant } from "./utils/style-constants";
import { PropsWithChildren } from "react";
import { ModalProvider } from "./hooks/Modal";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

interface CustomNavLinkProps {
  to: string;
}

const CustomNavLink: React.FC<PropsWithChildren<CustomNavLinkProps>> = (
  props
) => {
  return (
    <NavLink
      to={props.to}
      caseSensitive={false}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-white cursor-default active"
            : "bg-transparent hover:bg-gray-100 cursor-pointer"
        } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 ${roundedConstant} hover:bg-gray-50  hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
      }
    >
      <span className="flex-1 ml-1 whitespace-nowrap flex items-center">
        {props.children}
      </span>
    </NavLink>
  );
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
        <aside className="w-64 h-screen sticky top-0" aria-label="Sidebar">
          <div className="flex flex-col w-full md:w-64 text-gray-700 bg-transparent dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
            <div className="p-4 text-xl mt-9 ml-4 font-bold flex items-center">
              <GlobeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <span>Orbit</span>
            </div>
            <ul className="space-y-2 p-4">
              <CustomNavLink to="/waitlist">
                <ClipboardCheckIcon
                  className="h-4 w-4 mr-2"
                  aria-hidden="true"
                />
                Waitlist
              </CustomNavLink>
              <CustomNavLink to="/events">
                <CalendarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                Events
              </CustomNavLink>
              <CustomNavLink to="/settings">
                <CogIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                Settings
              </CustomNavLink>
            </ul>
          </div>
        </aside>
        <main className="grow p-5 bg-white m-1 rounded-lg flex justify-center items-center">
          <div className=" max-w-3xl h-full w-full">
            <ModalProvider>
              <Outlet />
            </ModalProvider>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
