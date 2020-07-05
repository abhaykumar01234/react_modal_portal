import React from "react";
import LabelInput from "./LabelInput";
import { useForm } from "./utils/hooks";
import locationdb, { bulkcreate, getData } from "./utils/db";

const AddLocationForm = ({ toggle }) => {
  let db = locationdb("LocationDB", {
    location: `++id,locname,address,phone,timezone,facility,appointment`,
  });

  const validateKeys = (values) => ({
    locationNm: [
      [values.locationNm.length === 0, "*Location Is Required Field"],
    ],
    zipCode: [[values.zipCode.length < 5, "5-10 characters only"]],
  });

  const handleSubmit = () => {
    handleSubmitFromForm();
  };

  const { values, errors, refreshErrors, onChange, onSubmit } = useForm(
    handleSubmit,
    {
      locationNm: "",
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      phoneNo: "",
      facilityTimes: "",
      suiteNo: "",
      city: "",
      state: "",
      timeZone: "",
      appointmentPool: "",
    },
    validateKeys
  );

  const {
    locationNm,
    addressLine1,
    addressLine2,
    zipCode,
    phoneNo,
    facilityTimes,
    suiteNo,
    city,
    state,
    timeZone,
    appointmentPool,
  } = values;

  const handleSubmitFromForm = () => {
    let flag = bulkcreate(db.location, {
      locname: locationNm,
      address: `${suiteNo} ${addressLine1} ${addressLine2} ${city} ${state} ${zipCode}`,
      phone: phoneNo,
      timezone: timeZone,
      facility: facilityTimes,
      appointment: appointmentPool,
    });
    console.log(flag);
    if (flag) {
      getData(db.location);
    } else {
      console.log("Please insert data..");
    }
  };

  return (
    <div className="px-4">
      <h6 className="text-secondary mb-4">Add Locations</h6>
      {/* line 1 */}
      <article className="d-flex">
        <LabelInput
          lblTxt={"Location Name"}
          inputNm={"locationNm"}
          className="flex-fill"
          value={locationNm}
          error={errors.locationNm}
          onChange={onChange}
          refreshErrors={refreshErrors}
        />
      </article>
      <article className="d-flex">
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {/* line 2 */}
          <LabelInput
            lblTxt={"Address Line 1"}
            inputNm={"addressLine1"}
            className="flex-fill"
            value={addressLine1}
            error={errors.addressLine1}
            onChange={onChange}
            refreshErrors={refreshErrors}
          />
          {/* line 3 */}
          <LabelInput
            lblTxt={"Address Line 2"}
            inputNm={"addressLine2"}
            className="flex-fill"
            value={addressLine2}
            error={errors.addressLine2}
            onChange={onChange}
            refreshErrors={refreshErrors}
          />
          {/* line 4 */}
          <article className="d-flex">
            <LabelInput
              lblTxt={"Zip Code"}
              inputNm={"zipCode"}
              className="flex-fill"
              value={zipCode}
              error={errors.zipCode}
              onChange={onChange}
              refreshErrors={refreshErrors}
              size={10}
              style={{ textTransform: "uppercase" }}
              regexClass={/[0-9A-Za-z]/}
            />
            <aside className="px-2"></aside>
            <LabelInput
              lblTxt={"Phone Number"}
              inputNm={"phoneNo"}
              className="flex-fill"
              value={phoneNo}
              error={errors.phoneNo}
              onChange={onChange}
              refreshErrors={refreshErrors}
              regexClass={/[0-9-()]/}
              size={12}
            />
          </article>
          {/* line 5 */}
          <LabelInput
            lblTxt={"Facility Times"}
            inputNm={"facilityTimes"}
            className="flex-fill"
            value={facilityTimes}
            error={errors.facilityTimes}
            onChange={onChange}
            refreshErrors={refreshErrors}
          />
        </div>
        <aside className="px-2"></aside>
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {/* line 2 */}
          <LabelInput
            lblTxt={"Suite No."}
            inputNm={"suiteNo"}
            className="flex-fill"
            value={suiteNo}
            error={errors.suiteNo}
            onChange={onChange}
            refreshErrors={refreshErrors}
          />
          {/* line 3 */}
          <article className="d-flex">
            <LabelInput
              lblTxt={"City"}
              inputNm={"city"}
              className="flex-fill"
              value={city}
              error={errors.city}
              onChange={onChange}
              refreshErrors={refreshErrors}
            />
            <aside className="px-2"></aside>
            <LabelInput
              lblTxt={"State"}
              inputNm={"state"}
              className="flex-fill"
              value={state}
              error={errors.state}
              onChange={onChange}
              refreshErrors={refreshErrors}
            />
          </article>
          {/* line 4 */}
          <LabelInput
            lblTxt={"Time Zone"}
            inputNm={"timeZone"}
            className="flex-fill"
            value={timeZone}
            error={errors.timeZone}
            onChange={onChange}
            refreshErrors={refreshErrors}
          />
          {/* line 5 */}
          <LabelInput
            lblTxt={"Appointment Pool"}
            inputNm={"appointmentPool"}
            className="flex-fill"
            value={appointmentPool}
            error={errors.appointmentPool}
            onChange={onChange}
            refreshErrors={refreshErrors}
          />
        </div>
      </article>
      <aside className="d-flex justify-content-end">
        <button
          className="btn formButton secondaryBg text-white px-4"
          onClick={toggle}
        >
          Cancel
        </button>
        <button
          className="btn formButton primaryBg ml-2 text-white px-4"
          onClick={onSubmit}
        >
          Save
        </button>
      </aside>
    </div>
  );
};

export default AddLocationForm;
