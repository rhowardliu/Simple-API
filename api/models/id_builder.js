const uniqueId = () =>{
	return (new Date()).getTime()%99999;
};
const addIdToObj = (obj) =>{
	obj.id = uniqueId();
	return Promise.resolve();
};

module.exports = {
	addIdToObj,
};