import React from "react";
import LabelTxtInput from "./shared/LabelTxtInput";
import LabelDropDown from "./shared/LabelDropDown";
import { useForm } from "./utils/hooks";
import locationdb, { bulkcreate } from "./utils/db";
import timezones from "./utils/data/timezones.json";
import states from "./utils/data/states.json";

const AddLocationForm = ({ toggle }) => {
  let db = locationdb("LocationDB");

  const validateKeys = (values) => ({
    locationNm: [
      [values.locationNm.length === 0, "*Location Is Required Field"],
    ],
    zipCode: [[values.zipCode.length < 5, "5-10 characters only"]],
    phoneNo: [[values.phoneNo.length < 13, "Enter Valid Phone No"]],
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

  const handleSubmitFromForm = async () => {
    try {
      await bulkcreate(db.location, {
        locname: locationNm,
        suite: suiteNo,
        address1: addressLine1,
        address2: addressLine2,
        city: city,
        state: state,
        zip: zipCode,
        phone: phoneNo,
        timezone: timeZone,
        facility: facilityTimes,
        appointment: appointmentPool,
      });
      alert("Data Saved Successfully");
      toggle();
    } catch (err) {
      alert("Some error occured");
    }
  };

  return (
    <div className="px-4">
      <h6 className="text-secondary mb-4">Add Locations</h6>
      {/* line 1 */}
      <article className="d-flex">
        <LabelTxtInput
          lblTxt={"Location Name"}
          inputNm={"locationNm"}
          className="flex-fill"
          value={locationNm}
          error={errors.locationNm}
          onChange={onChange}
          refreshErrors={refreshErrors}
          size={40}
          style={{ textTransform: "capitalize" }}
        />
      </article>
      <article className="d-flex">
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {/* line 2 */}
          <LabelTxtInput
            lblTxt={"Address Line 1"}
            inputNm={"addressLine1"}
            className="flex-fill"
            value={addressLine1}
            error={errors.addressLine1}
            onChange={onChange}
            refreshErrors={refreshErrors}
            size={37}
            style={{ textTransform: "uppercase" }}
          />
          {/* line 3 */}
          <LabelTxtInput
            lblTxt={"Address Line 2"}
            inputNm={"addressLine2"}
            className="flex-fill"
            value={addressLine2}
            error={errors.addressLine2}
            onChange={onChange}
            refreshErrors={refreshErrors}
            size={37}
            style={{ textTransform: "uppercase" }}
          />
          {/* line 4 */}
          <article className="d-flex">
            <LabelTxtInput
              lblTxt={"Zip Code"}
              inputNm={"zipCode"}
              className="flex-fill"
              value={zipCode}
              error={errors.zipCode}
              onChange={onChange}
              refreshErrors={refreshErrors}
              size={10}
              placeholder="012345"
              style={{ textTransform: "uppercase" }}
              regexClass={/[0-9A-Za-z]/}
            />
            <aside className="px-2"></aside>
            <LabelTxtInput
              lblTxt={"Phone Number"}
              inputNm={"phoneNo"}
              className="flex-fill"
              value={phoneNo}
              error={errors.phoneNo}
              onChange={onChange}
              refreshErrors={refreshErrors}
              regexClass={/[0-9-()]/}
              mask={`(999)-999-999`}
              size={13}
              placeholder="(999)-999-999"
            />
          </article>
          {/* line 5 */}
          <LabelTxtInput
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
          <LabelTxtInput
            lblTxt={"Suite No."}
            inputNm={"suiteNo"}
            className="flex-fill"
            value={suiteNo}
            error={errors.suiteNo}
            onChange={onChange}
            refreshErrors={refreshErrors}
            regexClass={/[0-9]/}
            placeholder="XXX"
            size={3}
          />
          {/* line 3 */}
          <article className="d-flex align-items-end">
            <LabelTxtInput
              lblTxt={"City"}
              inputNm={"city"}
              value={city}
              className="col-6 pl-0 pr-1"
              error={errors.city}
              onChange={onChange}
              refreshErrors={refreshErrors}
              size={22}
            />
            {/* <aside className="px-2"></aside> */}
            <LabelDropDown
              lblTxt={"State"}
              dropdownNm={"state"}
              className="col-6 pl-1 pr-0"
              title={state}
              items={states}
              onSelect={onChange}
              refreshErrors={refreshErrors}
            />
          </article>
          {/* line 4 */}
          <LabelDropDown
            lblTxt={"Time Zone"}
            className="flex-fill"
            dropdownNm={"timeZone"}
            title={timeZone}
            items={timezones}
            onSelect={onChange}
            refreshErrors={refreshErrors}
          />
          {/* line 5 */}
          <LabelTxtInput
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
