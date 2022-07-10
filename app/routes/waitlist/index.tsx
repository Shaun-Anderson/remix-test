import { Task } from ".prisma/client";
import {
  BriefcaseIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { Form, useActionData, useLoaderData, useTransition } from "remix";
import { action as NewTaskAction, NewTaskActionData } from "../api/task/new";
import {
  action as DeleteTaskAction,
  DeleteTaskActionData,
} from "../api/task/delete";
import { loader as TaskLoader } from "../api/task/get";
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

export const loader = TaskLoader;
export const action = NewTaskAction;

function TaskList() {
  const todos = useLoaderData<Task[]>();
  const addAction = useActionData<NewTaskActionData>();
  const deleteAction = useActionData<DeleteTaskActionData>();

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
          Cell: ({ row }: Cell) => (
            <>
              <button
                className="relative rounded-md inline-flex items-center px-2 py-2  text-sm font-medium text-rose-400 hover:bg-rose-50"
                onClick={() => showModal({ data: row.original })}
              >
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <Menu />
            </>
          ),
        },
      ] as Column<Task>[],
    []
  );

  const DeleteModal = memo(
    ({
      isOpen,
      onClose,
      title,
      data,
    }: {
      isOpen: boolean;
      onClose: () => void;
      title: string;
      data: Task;
    }) => {
      const deleteAction = useActionData<DeleteTaskActionData>();

      return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
          <form method="post" action="/api/task/delete" key={data.id}>
            {deleteAction?.formError && (
              <p className="text-red-500">{addAction?.formError}</p>
            )}
            <p>{data.name}</p>
            <label>
              <input name="taskId" type="text" value={data.id} />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      );
    }
  );

  const [showModal, _hideModal] = useModal(DeleteModal, {
    title: "Delete",
    description: "Are you sure you want to delete this?",
  });

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
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 p-3 bg-opacity-50">
          <span className="text-sm text-white block">New sign ups</span>
          <span className="text-xl text-white opacity-80">100</span>
        </Card>
        <Card className=" grow border border-green-500 p-3">Test</Card>
      </div>

      <div className="bg-white border border-gray-100 rounded-md">
        <Table<Task> data={todos} columns={columns} pagination />
      </div>
    </>
  );
}

export default TaskList;
