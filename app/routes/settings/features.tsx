import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Input } from "~/components/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormSwitch } from "~/components/Form/FormSwitch";

const FeatureTitle = ({
  title,
  description,
  disabled,
}: {
  title: string;
  description: string;
  disabled?: boolean;
}) => (
  <div className="grow">
    <h4
      className={`text-sm font-medium leading-5 ${
        disabled ? "text-gray-300" : ""
      }`}
    >
      {title}
    </h4>
    <h5
      className={` text-xs ${
        disabled ? "text-gray-300" : "text-gray-500"
      } mt-2`}
    >
      {description}
    </h5>
  </div>
);

const features = {
  Waitlist: {
    title: "Waitlist",
    description: "Accept sign ups from users to a waitlist for your project.",
    subFeatures: {
      Referrals: {
        title: "Referrals",
        description:
          "Allow users to refer others to increase their position in the wait list.",
      },
    },
  },
  Roadmap: {
    title: "Roadmap",
    description: "Track progress on your projects.",
  },
};

type FormValues = {
  roadmapEnabled: boolean;
  waitlistEnabled: boolean;
  waitlistReferralsEnabled: boolean;
};

function FeatureSettings() {
  const [enabled, setEnabled] = useState(true);
  const [tasksEnabled, setTasksEnabled] = useState(true);

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const schema = yup
    .object()
    .shape({
      roadmapEnabled: yup.boolean().required(),
      waitlistEnabled: yup.boolean().required(),
      waitlistReferralsEnabled: yup.boolean().required(),
    })
    .required();

  const { handleSubmit, control, watch, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const watchRoadmap = watch("roadmapEnabled");

  const watchWaitlist = watch("waitlistEnabled");
  useEffect(() => {
    if (!watchWaitlist) {
      setValue("waitlistReferralsEnabled", false);
    }
  }, [watchWaitlist]);

  return (
    <div className="grow">
      <h3 className="text-lg font-bold">Features</h3>
      <h4 className=" text-xs text-gray-500 mt-2">
        Update which features this project has access to.
      </h4>
      <form
        className="flex flex-col gap-2 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Partipant */}
        {/* <div className="relative rounded-md p-3  border border-gray-100  ">
          <div className="flex gap-2">
            <FeatureTitle title={"Participant"} description={""} />
          </div>
          <hr className="my-3 ml-5" />
          <div className="pl-5">
            <div className="flex gap-2 ">
              <FeatureTitle
                title={"Custom fields"}
                description={
                  "Paricipants will have the option to fill custom profile fields instead of the default ones."
                }
                disabled={!watchCustomField}
              />
              <div>
                <Controller
                  control={control}
                  name=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <Switch
                      onBlur={onBlur}
                      onChange={onChange}
                      checked={value}
                      ref={ref}
                      className={`${
                        watchCustomField ? "bg-indigo-600" : "bg-gray-200"
                      } relative inline-flex h-5 w-10 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`transform transition ease-in-out duration-200 ${
                          watchCustomField ? "translate-x-6" : "translate-x-1"
                        } inline-block h-3 w-3 transform rounded-full bg-white`}
                      />
                    </Switch>
                  )}
                />
              </div>
            </div>
            {watchCustomField && (
              <Input
                label="Custom fields (csv seperated)"
                placeholder="Example #1, Example #2"
                className="mt-4"
              />
            )}
          </div>
          <hr className="my-3 ml-5" />
          <div className="flex gap-2 pl-5">
            <FeatureTitle
              title={"Participant Intern CV Upload"}
              description={"Allows paricipants to upload a CV"}
            />
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-indigo-600" : "bg-gray-200"
                } relative inline-flex h-5 w-10 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`transform transition ease-in-out duration-200 ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-3 w-3 transform rounded-full bg-white`}
                />
              </Switch>
            </div>
          </div>
        </div> */}
        {/* Sign up */}
        <div
          className={`relative rounded-md p-3 ${
            watchWaitlist ? "" : "bg-gray-100 "
          } border border-gray-100`}
        >
          <div className="flex gap-2">
            <FeatureTitle
              title={features.Waitlist.title}
              description={features.Waitlist.description}
            />
            <div>
              <FormSwitch
                control={control}
                name="waitlistEnabled"
                size="large"
              />
            </div>
          </div>
          <hr className="my-3 ml-5" />
          <div className="flex gap-2 pl-5">
            <FeatureTitle
              title={features.Waitlist.subFeatures.Referrals.title}
              description={features.Waitlist.subFeatures.Referrals.description}
            />
            <div>
              <FormSwitch
                disabled={!watchWaitlist}
                control={control}
                name="waitlistReferralsEnabled"
                size="small"
              />
            </div>
          </div>
        </div>
        {/* Events */}
        <div
          className={`relative rounded-md p-3 ${
            watchRoadmap ? "" : "bg-gray-100 "
          } border border-gray-100 flex gap-2`}
        >
          <FeatureTitle
            title={features.Roadmap.title}
            description={features.Roadmap.description}
          />
          <div>
            <FormSwitch name="roadmapEnabled" control={control} size="large" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FeatureSettings;
