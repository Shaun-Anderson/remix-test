import { Task } from ".prisma/client";
import { BriefcaseIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Form, useActionData, useLoaderData, useTransition } from "remix";
import { action as NewTaskAction, NewTaskActionData } from "../api/task/new";
import { loader as TaskLoader } from "../api/task/get";
import { useEffect, useRef } from "react";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";

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

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold mt-5">Teams</h1>
      <hr className="mt-2" />

      <Card>
        {addAction?.formError && (
          <p className="text-red-500">{addAction?.formError}</p>
        )}

        <Form
          ref={ref}
          method="post"
          className="mt-5 block rounded-md shadow-sm"
        >
          <div>
            <Input
              name="task"
              id="task"
              placeholder="Add New Team"
              required
              autoComplete="off"
              leadingIcon={
                <BriefcaseIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              trailing={
                <Button
                  type="submit"
                  rr="md"
                  leading={
                    <PlusCircleIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  }
                >
                  Add
                </Button>
              }
            />
          </div>
          <Button
            type="submit"
            rl="md"
            rr="md"
            variant="base"
            leading={
              <PlusCircleIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            }
          >
            New button test wow
          </Button>
        </Form>
        {addAction?.fieldErrors?.task && (
          <p className="text-red-500 text-sm mt-1">
            {addAction?.fieldErrors?.task}
          </p>
        )}

        <div className="mt-4">
          {todos.length ? (
            todos.map((item) => (
              <Form
                method="delete"
                action="/api/task/delete"
                key={item.id}
                className="px-4 py-2 rounded-full shadow mb-4 bg-gray-50 focus:outline-none grid grid-cols-[1fr_100px] items-center"
              >
                <input type="hidden" name="taskId" value={item.id} />
                <span className="text-sm">{item.name}</span>

                <button
                  type="submit"
                  className="outline-none text-sm text-green-500"
                >
                  Mark Complete
                </button>
              </Form>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Lucky day. No any Tasks to do. It's Party time 🎊 🎊
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default TaskList;
