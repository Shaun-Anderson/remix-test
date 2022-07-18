import { Task } from ".prisma/client";
import { XIcon } from "@heroicons/react/solid";
import {
  Form,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
  useTransition,
} from "remix";
import {
  action as TaskAction,
  DeleteTaskActionData,
} from "../../api/task/delete";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { Menu } from "~/components/Menu";
import { Column } from "react-table";
import { Transition, Dialog } from "@headlessui/react";
import { Input } from "~/components/Input";

export const action = TaskAction;

const DeleteModal = () => {
  const params = useParams();
  const id = params.id;
  const addAction = useActionData<DeleteTaskActionData>();
  const ref = useRef<HTMLFormElement>(null);
  const transition = useTransition();
  const navigate = useNavigate();

  useEffect(() => {
    if (transition.state == "submitting") {
      ref.current && ref.current.reset();
    }
  }, [transition]);

  // interface Task {
  //   id: number;
  //   text: string;
  // }

  function onClose() {
    navigate("/waitlist");
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Item
                  </Dialog.Title>
                  <div className=" ml-auto">
                    <button
                      className="relative rounded-md inline-flex items-center px-2 py-2 text-sm font-medium text-gray-400 bg-gray-50 hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <XIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <Dialog.Description className="text-sm my-4">
                  Delete this item?
                </Dialog.Description>
                <Form method="post">
                  {addAction?.formError && (
                    <p className="text-red-500">{addAction?.formError}</p>
                  )}
                  <label>
                    <input name="taskId" value={id} readOnly hidden />
                    {addAction?.fieldErrors?.taskId && (
                      <p className="text-red-500 text-sm mt-1">
                        {addAction?.fieldErrors?.taskId}
                      </p>
                    )}
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                    >
                      {transition.state === "submitting"
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </Form>{" "}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
