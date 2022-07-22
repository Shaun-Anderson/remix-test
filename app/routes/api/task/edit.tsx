import { ActionFunction, json, redirect } from "remix";
import { db } from "~/utils/db.server";

// return type of this action
export type EditTaskActionData = {
  formError?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
  };
  fields?: {
    name?: string;
    email?: string;
  };
  ok?: boolean;
};

const badRequest = (data: EditTaskActionData) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  //setting values to fields from request
  const form = await request.formData();

  type fieldType = "name" | "id" | "email";
  const fieldList: fieldType[] = ["name", "id", "email"];
  const fields = {} as Record<fieldType, string>;

  for (const fieldName of fieldList) {
    const fieldValue = form.get(fieldName) || "";
    fields[fieldName] = fieldValue as string;
  }

  //validation
  let fieldErrors = {} as Record<fieldType, string>;

  if (!fields.name) {
    fieldErrors.name = "Task cannot be empty";
    // return json({ errors: fieldErrors, values: fields });
    return badRequest({
      fieldErrors,
      fields,
    });
  }

  //adding task to database
  try {
    await db.task.update({
      where: { id: fields.id },
      data: {
        name: fields.name,
        email: fields.email,
      },
    });
  } catch (err) {
    console.log("Error", err);
    return badRequest({
      formError: err.message,
    });
  }
  return redirect("/waitlist");
};
