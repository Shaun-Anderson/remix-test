import { Task } from ".prisma/client";
import {
  BriefcaseIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
  useTransition,
} from "remix";
import { action as NewTaskAction, NewTaskActionData } from "./api/task/new";
import {
  action as DeleteTaskAction,
  DeleteTaskActionData,
} from "./api/task/delete";
import { loader as TaskLoader } from "./api/task/get";
import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "~/components/Card";
import { Menu } from "~/components/Menu";
import Table from "~/components/Table";
import { Cell, CellProps, Column } from "react-table";
import { Button } from "~/components/Button";
import { roundedConstant } from "~/utils/style-constants";
import { TrashIcon } from "@heroicons/react/outline";
import { useModal } from "~/hooks/Modal";
import { Dialog, Transition } from "@headlessui/react";
import { Modal } from "~/components/Modal";
import { Menu as BaseMenu } from "@headlessui/react";

export const loader = TaskLoader;
export const action = NewTaskAction;

function Waitlist() {
  const todos = useLoaderData<Task[]>();
  const addAction = useActionData<NewTaskActionData>();
  const deleteAction = useActionData<DeleteTaskActionData>();
  const navigate = useNavigate();

  // interface Task {
  //   id: number;
  //   text: string;
  // }

  const columns = useMemo(
    () =>
      [
        {
          Header: "ID",
          accessor: "id",
          maxWidth: 60,
          minWidth: 60,
          width: 60,
        },

        {
          Header: "Name",
          accessor: "name",
          maxWidth: 200,
          minWidth: 100,
        },
        {
          Header: "Name",
          accessor: "n",
          maxWidth: 200,
          minWidth: 100,
        },
        {
          Header: "Actions",
          accessor: "actions",
          width: 80,
          align: "right",
          disableSortBy: true,
          Cell: ({ row }: Cell) => (
            <>
              <button
                className="relative rounded-md inline-flex items-center px-2 py-2  text-sm font-medium text-rose-400 hover:bg-rose-50"
                onClick={() => navigate(`${row.original.id}/delete`)}
              >
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <Menu>
                <BaseMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate(`${row.original.id}/edit`)}
                      className={`${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Edit
                    </button>
                  )}
                </BaseMenu.Item>
                <BaseMenu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Duplicate
                    </button>
                  )}
                </BaseMenu.Item>
              </Menu>
            </>
          ),
        },
      ] as Column<Task>[],
    []
  );

  return (
    <>
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold mt-5">Waitlist</h1>
          <h2 className=" text-xs text-gray-500 mt-2">
            User sign ups for this project.
          </h2>
        </div>
        <div className="ml-auto flex items-center">
          <button
            className="inline-flex mt-5 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => navigate("new")}
          >
            Add
          </button>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex gap-2 mb-2">
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 p-3 bg-opacity-50">
          <span className="text-sm text-white block">New sign ups</span>
          <span className="text-xl text-white opacity-80">100</span>
        </Card>
        <Card className=" grow border border-green-500 p-3">Test</Card>
      </div>

      <div className="bg-white border border-gray-100 rounded-md">
        <Table<Task> data={todos} columns={columns} pagination />
      </div>
      <Outlet />
    </>
  );
}

export default Waitlist;
