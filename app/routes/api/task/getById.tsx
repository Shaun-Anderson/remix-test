import { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  return db.task.findFirst({ where: { id: params.id } });
};
