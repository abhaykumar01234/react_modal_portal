import React, { useState } from "react";
import Pagination from "./shared/Pagination";

const LocationList = ({ locations, db }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [locationPerPage] = useState(1);


  const handleDelete = () => {
    alert("Button Clicked")

  }

  const indexOfLastLocation = currentPage * locationPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationPerPage;
  const currentLocation = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <section>
      <section className="d-flex rounded-pill bg-white my-2 py-2 px-4">
        <div style={{ flex: 1 }}>&nbsp;</div>
        <div style={{ flex: 5 }}>
          <strong>Location Name</strong>
        </div>
        <div style={{ flex: 8 }}>
          <strong>Address</strong>
        </div>
        <div style={{ flex: 5 }}>
          <strong>Phone Number</strong>
        </div>
        <div style={{ flex: 1 }} className="d-flex justify-content-end">
          <div className="locCircle bg-white">&nbsp;</div>
          <div className="locCircle bg-white">&nbsp;</div>
        </div>
      </section>
      {currentLocation.map((loc) => (
        <section
          className="d-flex align-items-center rounded-pill bg-white formLabel my-2 py-2 px-4"
          key={loc.id}
        >
          <div style={{ flex: 1 }} className="justify-content-center">
            <div className="locCircle">{loc.id}</div>
          </div>
          <div style={{ flex: 5 }}>{loc.locname}</div>
          <div style={{ flex: 8 }}>{loc.suite} {loc.address1} {loc.address2} {loc.city} {loc.state} {loc.zip}</div>
          <div style={{ flex: 5 }}>{loc.phone}</div>
          <div style={{ flex: 1 }} className="d-flex justify-content-end">
            <div className="locCircle mr-2 bg-white text-warning">
              <i className="fa fa-pencil fa-lg"></i>
            </div>
            <div className="locCircle bg-white text-danger">
              <i className="fa fa-trash fa-lg" onClick={handleDelete}></i>
            </div>
          </div>
        </section>
      ))}
      <section className="flexCenter rounded-pill bg-white my-2 py-2 px-4">
        <Pagination locationPerPage={locationPerPage} totalLocation={locations.length} paginate={paginate} />
      </section>

    </section>
  );
};

export default LocationList;
