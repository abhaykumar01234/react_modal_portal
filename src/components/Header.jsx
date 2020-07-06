import React, { useState, useEffect, useRef } from "react";
import Modal from "./shared/Modal";
import AddLocationForm from "./AddLocationForm";
import locationdb, { bulkcreate } from "./utils/db";
import LocationList from "./LocationList";

const Header = () => {
  const [modal, setModal] = useState(false);

  const [locations, setLocations] = useState([]);
  const [editLocation, setEditLocation] = useState({});

  const dbRef = useRef(locationdb("LocationDB"));

  useEffect(() => {
    const refreshLocations = async () => {
      if (dbRef.current && !modal) {
        let locationTbl = await dbRef.current.location.toArray();
        console.log(locationTbl);
        setLocations(locationTbl);
      }
    };

    refreshLocations();
  }, [modal]);
  // console.log("rendering header", modal);

  const handleEdit = (loc) => {
    setEditLocation(loc);
    setModal(true);
  };

  const handleDelete = (loc) => {
    alert("Location with name : " + loc.locationNm + " will be deleted?");
  };

  const handleSave = async (loc) => {
    try {
      await bulkcreate(dbRef.current.location, loc);
      alert("Data Saved Successfully");
    } catch (err) {
      alert("Some error occured");
    }
    setEditLocation({});
  };

  return (
    <>
      <section className="d-flex justify-content-between align-items center py-3">
        <strong className="text-secondary">Locations</strong>
        <button
          className={"btn formButton rounded-pill text-white primaryBg"}
          onClick={() => setModal(true)}
        >
          <strong>+ Add Location</strong>
        </button>
        <Modal modal={modal} onClose={() => setModal(false)}>
          <AddLocationForm
            initLocation={editLocation}
            toggle={() => setModal(false)}
            handleSave={handleSave}
          />
        </Modal>
      </section>
      {locations.length === 0 ? (
        <section className="flexCenter flex-column flex-grow-1">
          <img src="/location.png" alt="X" className="logoImg mb-2" />
          <strong className="mt-2">Kindly Add Your Location First</strong>
          <small className="text-muted ">
            There is no location added right now
          </small>
        </section>
      ) : (
        <LocationList
          locations={locations}
          db={dbRef.current}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Header;
