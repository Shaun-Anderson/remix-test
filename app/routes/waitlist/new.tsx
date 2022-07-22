import { Task } from ".prisma/client";
import { XIcon } from "@heroicons/react/solid";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
  useTransition,
} from "remix";
import { action as NewTaskAction, NewTaskActionData } from "../api/task/new";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { Menu } from "~/components/Menu";
import { Column } from "react-table";
import { Transition, Dialog } from "@headlessui/react";
import { Input } from "~/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { data } from "autoprefixer";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "~/components/Form/FormInput";
import * as yup from "yup";
import { Modal } from "~/components/Modal";

export const action = NewTaskAction;

function TaskList() {
  const addAction = useActionData<NewTaskActionData>();
  const ref = useRef<HTMLFormElement>(null);
  const transition = useTransition();
  const navigate = useNavigate();
  const submit = useSubmit();

  useEffect(() => {
    if (transition.state == "submitting") {
      ref.current && ref.current.reset();
    }
  }, [transition]);

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    })
    .required();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Task>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Task> = (data, event) => {
    console.log(data);
    console.log(event);
    submit(event?.target, { replace: true });
  };

  const onError = (errors: any) => console.log(errors);

  function onClose() {
    navigate("/waitlist");
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={"Add Item"}>
      <Form
        method="post"
        className="mt-4 grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {addAction?.formError && (
          <p className="text-red-500">{addAction?.formError}</p>
        )}
        <FormInput
          label="Description"
          control={control}
          name="task"
          error={errors.name}
          placeholder="Task Description"
        />
        {addAction?.fieldErrors?.name && (
          <p className="text-red-500 text-sm mt-1">
            {addAction?.fieldErrors?.name}
          </p>
        )}
        <FormInput
          label="Email"
          type="email"
          control={control}
          error={errors.email}
          name="email"
          placeholder="Email"
        />
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
            {transition.state === "submitting" ? "Creating..." : "Create"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default TaskList;
