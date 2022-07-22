import { Task } from ".prisma/client";
import { XIcon } from "@heroicons/react/solid";
import {
  Form,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
  useTransition,
} from "remix";
import { action as TaskAction, EditTaskActionData } from "../../api/task/edit";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { Menu } from "~/components/Menu";
import { Column } from "react-table";
import { Transition, Dialog } from "@headlessui/react";
import { Input } from "~/components/Input";
import { loader as TaskLoader } from "../../api/task/getById";
import { Modal } from "~/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "~/components/Form/FormInput";

export const action = TaskAction;
export const loader = TaskLoader;

const EditModal = () => {
  const actionData = useActionData<EditTaskActionData>();
  const ref = useRef<HTMLFormElement>(null);
  const transition = useTransition();
  const navigate = useNavigate();
  const data = useLoaderData<Task>();
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
      id: yup.string().required(),
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
    defaultValues: data,
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
    <Modal isOpen={true} onClose={onClose} title={"Edit Item"}>
      <Form
        method="post"
        className=" grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {actionData?.formError && (
          <p className="text-red-500">{actionData?.formError}</p>
        )}
        <FormInput
          control={control}
          name="id"
          value={data.id}
          readOnly
          hidden
        />
        <FormInput
          label="Name"
          control={control}
          error={errors.name}
          name="name"
          placeholder="Task Description"
          // defaultValue={data.name}
        />
        {actionData?.fieldErrors?.task && (
          <p className="text-red-500 text-sm mt-1">
            {actionData?.fieldErrors?.task}
          </p>
        )}
        <FormInput
          label="Email"
          control={control}
          type="email"
          name="email"
          placeholder="Email"
          error={errors.email}
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
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {transition.state === "submitting" ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditModal;
