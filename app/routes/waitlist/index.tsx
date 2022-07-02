import { Task } from ".prisma/client";
import {
  BriefcaseIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { Form, useActionData, useLoaderData, useTransition } from "remix";
import { action as NewTaskAction, NewTaskActionData } from "../api/task/new";
import { loader as TaskLoader } from "../api/task/get";
import { useEffect, useMemo, useRef } from "react";
import { Card } from "~/components/Card";
import { Menu } from "~/components/Menu";
import Table from "~/components/Table";
import { Column } from "react-table";
import { Button } from "~/components/Button";

export const loader = TaskLoader;
export const action = NewTaskAction;

function TaskList() {
  const todos = useLoaderData<Task[]>();
  const addAction = useActionData<NewTaskActionData>();
  const ref = useRef<HTMLFormElement>(null);
  const transition = useTransition();

  useEffect(() => {
    if (transition.state == "submitting") {
      ref.current && ref.current.reset();
    }
  }, [transition]);

  // interface Task {
  //   id: number;
  //   text: string;
  // }

  const tasks: Task[] = [
    { id: "1", name: "test", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    {
      id: "2",
      name: "2123123test",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "2 tes1231t",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 tes3t", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 2321", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    {
      id: "2",
      name: "2 te214st",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    {
      id: "2",
      name: "2 te2141st",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { id: "2", name: "2 test", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "2 123", createdAt: new Date(), updatedAt: new Date() },
    {
      id: "2",
      name: "2 123test",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "2 tes4124t",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

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
        },
        {
          Header: "Actions",
          accessor: "actions",
          width: 60,
          align: "right",
          disableSortBy: true,
          Cell: () => <Menu />,
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
      </div>
      <hr className="my-5" />
      <div className="flex gap-2 mb-2">
        <div className="rounded-lg bg-gray-100 p-5 w-1/2">
          <span className="text-sm text-gray-500 block">New sign ups</span>
          <span className="text-lg">100</span>
        </div>
        <div className="rounded bg-gray-100 p-2 grow"></div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <Table<Task> data={tasks} columns={columns} pagination />
      </div>
    </>
  );
}

export default TaskList;
