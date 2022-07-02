import { Input } from "~/components/Input";

function FeatureSettings() {
  return (
    <div className="grow">
      <h3 className="text-lg font-bold">Program</h3>
      <h4 className=" text-xs text-gray-500 mt-2">
        Update which features this program has access to.
      </h4>
      <div className="my-5" />
      <div className="relative rounded-md p-3  border border-gray-100">
        <h4 className="text-md font-medium leading-5">Naming</h4>
        <h5 className=" text-xs text-gray-500 mt-2">
          Customise your programs specific wording to personalise it to both
          your company and users.
        </h5>
        <div className="flex my-2 gap-2">
          <div className="w-full">
            <Input
              label="Participant name (Intern)"
              placeholder="Intern"
              disabled
            />
          </div>
          <div className="w-full">
            <Input label="Handler name (Manager)" placeholder="Manager" />
          </div>
        </div>
        <div className="flex my-2 gap-2">
          <div className="w-full">
            <Input label="Participant name (Intern)" placeholder="Intern" />
          </div>
          <div className="w-full">
            <Input label="Handler name (Manager)" placeholder="Manager" />
          </div>
        </div>
        <button className="rounded-md bg-indigo-600 text-indigo-50 px-4 py-2 text-xs transition-all ease-in-out hover:scale-105 hover: hover:bg-indigo-700">
          Update
        </button>
      </div>

      <button
        className={`-ml-px w-full text-center mt-5 rounded relative items-center space-x-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
      >
        Delete program
      </button>
    </div>
  );
}

export default FeatureSettings;
