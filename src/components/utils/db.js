import Dexie from "dexie";

const locationdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
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
  //let index = 0
  //let obj = {}

  dbtable.count((count) => {
    if (count) {
      return dbtable.each((table) => table);
    }
  });
};

export default locationdb;
export { bulkcreate, getData };
