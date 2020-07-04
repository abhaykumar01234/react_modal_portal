import React, { useState } from "react";
import LabelInput from "./LabelInput";
import locationdb, { bulkcreate, getData } from "../Module";

const AddLocationForm = ({ toggle }) => {
  const [formData, setFormData] = useState({
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
  });

  let db = locationdb('LocationDB', {
    location: `++id,locname,address,phone,timezone,facility,appointment`
  })

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setEditMode(true);
  };

  const handleClick = (e) => {
    let flag = bulkcreate(db.location, {
        locname: formData.locationNm,
        address: formData.suiteNo + ' ' + formData.addressLine1 + ' ' + formData.addressLine2 + ' ' + formData.city +
         ' ' + formData.state + ' ' + formData.zipCode,
        phone: formData.phoneNo,
        timezone: formData.timeZone,
        facility: formData.facilityTimes,
        appointment: formData.appointmentPool
    })
    console.log(flag);
    if(flag) {
      getData(db.location)
    }
    else {
      console.log('Please insert data..');
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
          value={formData.locationNm}
          onChange={handleChange}
          editMode={editMode}
          onBlur={() => setEditMode(false)}
        />
      </article>
      <article className="d-flex">
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {/* line 2 */}
          <LabelInput
            lblTxt={"Address Line 1"}
            inputNm={"addressLine1"}
            className="flex-fill"
            value={formData.addressLine1}
            onChange={handleChange}
            editMode={editMode}
            onBlur={() => setEditMode(false)}
          />
          {/* line 3 */}
          <LabelInput
            lblTxt={"Address Line 2"}
            inputNm={"addressLine2"}
            className="flex-fill"
            value={formData.addressLine2}
            onChange={handleChange}
            editMode={editMode}
            onBlur={() => setEditMode(false)}
          />
          {/* line 4 */}
          <article className="d-flex">
            <LabelInput
              lblTxt={"Zip Code"}
              inputNm={"zipCode"}
              className="flex-fill"
              value={formData.zipCode}
              onChange={handleChange}
              editMode={editMode}
              onBlur={() => setEditMode(false)}
            />
            <aside className="px-2"></aside>
            <LabelInput
              lblTxt={"Phone Number"}
              inputNm={"phoneNo"}
              className="flex-fill"
              value={formData.phoneNo}
              onChange={handleChange}
              editMode={editMode}
              onBlur={() => setEditMode(false)}
            />
          </article>
          {/* line 5 */}
          <LabelInput
            lblTxt={"Facility Times"}
            inputNm={"facilityTimes"}
            className="flex-fill"
            value={formData.facilityTimes}
            onChange={handleChange}
            editMode={editMode}
            onBlur={() => setEditMode(false)}
          />
        </div>
        <aside className="px-2"></aside>
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          {/* line 2 */}
          <LabelInput
            lblTxt={"Suite No."}
            inputNm={"suiteNo"}
            className="flex-fill"
            value={formData.suiteNo}
            onChange={handleChange}
            editMode={editMode}
            onBlur={() => setEditMode(false)}
          />
          {/* line 3 */}
          <article className="d-flex">
            <LabelInput
              lblTxt={"City"}
              inputNm={"city"}
              className="flex-fill"
              value={formData.city}
              onChange={handleChange}
              editMode={editMode}
              onBlur={() => setEditMode(false)}
            />
            <aside className="px-2"></aside>
            <LabelInput
              lblTxt={"State"}
              inputNm={"state"}
              className="flex-fill"
              value={formData.state}
              onChange={handleChange}
              editMode={editMode}
              onBlur={() => setEditMode(false)}
            />
          </article>
          {/* line 4 */}
          <LabelInput
            lblTxt={"Time Zone"}
            inputNm={"timeZone"}
            className="flex-fill"
            value={formData.timeZone}
            onChange={handleChange}
            editMode={editMode}
            onBlur={() => setEditMode(false)}
          />
          {/* line 5 */}
          <LabelInput
            lblTxt={"Appointment Pool"}
            inputNm={"appointmentPool"}
            className="flex-fill"
            value={formData.appointmentPool}
            onChange={handleChange}
            editMode={editMode}
            onBlur={() => setEditMode(false)}
          />
        </div>
      </article>
      <aside className="d-flex justify-content-end">
        <button
          className="btn formButton secondaryBg text-white"
          onClick={toggle}
        >
          Cancel
        </button>
        <button className="btn formButton primaryBg ml-2 text-white"
          onClick={handleClick}
        >
          Save
        </button>
      </aside>
    </div>
  );
};

export default AddLocationForm;
