import type { FC } from "react";

import { ProfileModel } from "../../models/Profile";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import WarningAlert from "../../shared/Alerts/WarningAlert";
import DateSelector from "../../shared/DateSelector";
import TextArea from "../../shared/TextArea";
import ErrorAlert from "../../shared/Alerts/ErrorAlert";
import SuccessAlert from "../../shared/Alerts/SuccessAlert";
import Countdown from "./Countdown";
import Input from "../../shared/TextInput";
import Select from "../../shared/Select";

const MainProfile: FC<{ profile: ProfileModel }> = ({ profile }) => {
  const { formRef, loading, errors, data, submit } = useFormSubmit(
    "/profile",
    "profile"
  );

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    submit();
  };

  return (
    <div className="grid grid-cols-1 gap-y-5">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Your profile
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 mb-0">
          These information will be public and other people can view them.
        </p>

        {/* The first time an account is created, and the profile has not been set */}
        {!profile.setup && (
          <WarningAlert
            className="mt-4"
            title="Hey! Welcome to Bark network."
            text="As the first step, we are here to help you setup your profile. You will need a profile before entering this degenerate world."
          />
        )}
      </div>

      <form
        ref={formRef}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          {Object.keys(errors).length > 0 && (
            <ErrorAlert text="Sorry your profile was not created, please fix any errors below." />
          )}

          {/* Successful update */}
          {data.message && (
            <>
              {data.redirect ? (
                <SuccessAlert
                  text={
                    <>
                      {data.message}
                      <Countdown startAt={5} />
                      ...
                    </>
                  }
                />
              ) : (
                <SuccessAlert text={data.message} />
              )}
            </>
          )}

          <div className="grid grid-cols-3 gap-x-6 gap-y-8 mb-5">
            <Input
              type="text"
              label="Display name"
              name="display_name"
              underscoreForSpace={true}
              value={profile.displayName}
              error={errors.displayName}
            />

            <Select
              name="gender"
              label="Gender"
              value={profile.gender}
              options={[
                { value: "female", name: "Female" },
                { value: "male", name: "Male" },
                { value: "undisclosed", name: "Undisclosed" },
              ]}
              error={errors.gender}
            />

            <DateSelector
              name="date_of_birth"
              label="Date of birth"
              value={profile.dateOfBirth}
              error={errors.dateOfBirth}
            />
          </div>

          <div className="col-span-12">
            <TextArea
              name="bio"
              label="Bio"
              value={profile.bio}
              placeholder="Something about yourself..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            disabled={loading || !!data.timeout}
            className="disabled:opacity-50 disabled:hover:bg-indigo-600 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            {loading ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainProfile;
