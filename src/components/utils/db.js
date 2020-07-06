import Dexie from "dexie";

const locationdb = (dbname) => {
  const db = new Dexie(dbname);
  db.version(1).stores({
    location: `++id,locname,address1,address2,suite,city,state,zip,phone,timezone,facility,appointment`,
  });
  db.open();

  return db;
};

const bulkcreate = (dbtable, data) => {
  // let flag = empty(data);
  // if (flag) {
  //   dbtable.bulkAdd([data]);
  // }
  return dbtable.bulkAdd([data]);
};

//Empty validation check
// const empty = (object) => {
//   let flag = false;

//   for (const value in object) {
//     if (object[value] !== "" && object.hasOwnProperty(value)) {
//       flag = true;
//     } else {
//       flag = false;
//     }
//   }
//   return flag;
// };

//get data from the database
const getData = (dbtable) => {
  dbtable.count((count) => {
    if (count) {
      return dbtable.each((table) => table);
    }
  });
};

const dataDelete = (dbtable, id) => {
  return dbtable.bulkDelete(id);
};

export default locationdb;
export { bulkcreate, getData, dataDelete };
