const knex = require('../database/db_queries');

const queryDb = async (queryTable, queryType, queryObj) =>{        
	let dbObj =  await knex[queryType](queryTable, queryObj);
	if (dbObj.error){
		let err = new Error;
		err.statusCode = 500;
		err.message = 'Internal Server Error';
		Promise.reject(err);
	}
	if (!dbObj){
		Promise.reject(new Error);
	}
	return (dbObj);
};



const getFromDb = async (table, id) =>{
	let dbObj = await queryDb(table, 'selectEntry', id);
	if (!dbObj.length) throw new Error;
	return dbObj[0];
};

const addToDb = async (table, obj) =>{
	let dbObj = await queryDb(table, 'insertEntry', obj);
	if (!dbObj.length) throw new Error;
	return dbObj;
};

const updateDb = (table, obj) =>{
	return queryDb(table, 'updateEntry', obj);
};


const deleteFromDb = (table, id) => {    
	return queryDb(table, 'deleteEntry', id);
};

const getMultiFromDb = async (table, params) =>{
	let dbObj = await queryDb(table, 'selectMultiEntries', params);
	if (!dbObj.length) throw new Error;
	return dbObj;
};

const getCountFromDb = async (table)=>{
	let dbObj = await queryDb(table, 'countEntries');
	return dbObj[0]['count(`id`)'];
};

module.exports = {
	addToDb,
	getFromDb,
	deleteFromDb,
	updateDb,
	getMultiFromDb,
	getCountFromDb
};