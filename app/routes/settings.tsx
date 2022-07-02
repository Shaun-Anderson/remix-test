import { Task } from ".prisma/client";
import {
  BriefcaseIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import {
  Form,
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { action as NewTaskAction, NewTaskActionData } from "./api/task/new";
import { loader as TaskLoader } from "./api/task/get";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "~/components/Card";
import { Menu } from "~/components/Menu";
import Table from "~/components/Table";
import { Column } from "react-table";
import { Button } from "~/components/Button";
import { Tab } from "@headlessui/react";
import {
  AdjustmentsIcon,
  DocumentIcon,
  KeyIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { Input } from "~/components/Input";

export const loader = TaskLoader;
export const action = NewTaskAction;

function TaskList() {
  const todos = useLoaderData<Task[]>();
  const addAction = useActionData<NewTaskActionData>();
  const ref = useRef<HTMLFormElement>(null);
  const transition = useTransition();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (transition.state == "submitting") {
      ref.current && ref.current.reset();
    }
  }, [transition]);

  return (
    <div className="">
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold mt-5">Settings</h1>
          <h2 className=" text-xs text-gray-500 mt-2">
            Effect how you program is set up.
          </h2>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex ">
        <ul className=" space-y-1 mr-5 grow-0 shrink-0 w-56 sticky top-16 h-fit">
          <NavLink
            to="/settings/program"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-gray-100 cursor-default active"
                  : "text-gray-300 hover:bg-white/[0.12] hover:text-gray-400"
              } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg  hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
            }
          >
            <span className="flex-1 whitespace-nowrap flex items-center justify-center">
              <KeyIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Program
            </span>
          </NavLink>
          <NavLink
            to="/settings/features"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-gray-100 cursor-default active"
                  : "text-gray-300 hover:bg-white/[0.12] hover:text-gray-400"
              } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg  hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
            }
          >
            <span className="flex-1 whitespace-nowrap flex items-center justify-center">
              <AdjustmentsIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Features
            </span>
          </NavLink>
          <NavLink
            to="/settings/onboarding"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-gray-100 cursor-default active"
                  : "text-gray-300 hover:bg-white/[0.12] hover:text-gray-400"
              } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg  hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
            }
          >
            <span className="flex-1 whitespace-nowrap flex items-center justify-center">
              <PhotographIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Onboarding
            </span>
          </NavLink>
          <NavLink
            to="/settings/branding"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-gray-100 cursor-default active"
                  : "text-gray-300 hover:bg-white/[0.12] hover:text-gray-400"
              } flex px-4 py-2 mt-2 text-sm font-semibold text-gray-800 rounded-lg  hover:text-gray-900 focus:text-gray-900  focus:bg-gray-200 focus:outline-none focus:shadow-outline`
            }
          >
            <span className="flex-1 whitespace-nowrap flex items-center justify-center">
              <PhotographIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Branding
            </span>
          </NavLink>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default TaskList;
