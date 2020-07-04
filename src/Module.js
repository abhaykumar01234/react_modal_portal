import Dexie from 'dexie';

const locationdb = (dbname, table) => {

    const db = new Dexie(dbname)
    db.version(1).stores(table)
    db.open()

    return db
}

const bulkcreate = (dbtable, data) => {
    let flag = empty(data)
    if (flag) {
        dbtable.bulkAdd([data])        
    }
    return flag
}

const empty = object => {
    let flag = false

    for (const value in object) {
        if (object[value] !== "" && object.hasOwnProperty(value)) {
            flag = true
        }
        else {
            flag = false
        }
    }
    return flag
}

//get data from the database
const getData = (dbtable, fn) => {
    let index = 0
    let obj = {}

    dbtable.count(count => {
        if(count){
            dbtable.each(table => {
                obj = Sortobj(table)     
                fn(obj,index++)           
            })
        }
        else {
            fn(0)
        }
    })
}

//sort object
const Sortobj = sortobj => {
    let obj = {}
    obj = {     
        id: sortobj.id,
        locname: sortobj.locname,
        address:sortobj.address,
        phone:sortobj.phone,
        timezone:sortobj.timezone,
        facility:sortobj.facility,
        appointment:sortobj.appointment
    }
    return obj
}


export default locationdb
export { bulkcreate, getData }