const config = require('../config');


const singleEntityResponse = (endpoint, object) =>{
	let link = constructLinkToEntity(endpoint, object.id);
	let halLink = halLinkObj(link);
	object._links = {self: halLink};
	return;
};


const multiEntityResponse = (endpoint, objects, params) => {
	let resObj = {};
	addSelfLinksToCollection(endpoint, objects);
	let offsetValues = calculateOffset(params);

	resObj.total = params.total;
	resObj.count = objects.length;
	resObj._embedded = embeddedCollection(endpoint, objects);
	resObj._links = collectionLinks(endpoint, offsetValues);

	return resObj;
};


const collectionLinks = (endpoint, offsetVals) => {
	let halSelfLink = {self: halLinkObj(constructLinkToEntity(endpoint))};
    
	let firstLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.first);
	let halFirstLink = {first: halLinkObj(firstLink)};

	let lastLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.last);
	let halLastLink = {last: halLinkObj(lastLink)};

	let nextLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.next);   
	let halNextLink = {next: halLinkObj(nextLink)};

	let prevLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.prev);
	let halPrevLink = {prev: halLinkObj(prevLink)};

	return Object.assign({}, halSelfLink, halFirstLink, halLastLink, halNextLink, halPrevLink);

};

const calculateOffset = (params) =>{
	let limit = params.limit;
	let offset = params.offset;
	let total = params.total;

	let offsetValues = {};
	offsetValues.limit = limit;
	offsetValues.first = 0;
	offsetValues.last = Math.max(total - limit, 0);
	offsetValues.next = Math.min(offset + limit, offsetValues.last);
	offsetValues.prev = Math.max(offset - limit, 0);

	return offsetValues;

};

const embeddedCollection = (name, entities)=>{
	let embObj = {};
	embObj[name] = entities;
	return embObj;
};


const addSelfLinksToCollection = (endpoint, objects) =>{
	for (let obj of objects){
		singleEntityResponse(endpoint, obj);
	}
};

const constructLinkForCollection = (endpoint, limit, offset) =>{
	let link = config.baseUrl;
	link += config.endpoints[endpoint];
	link += `?limit=${limit}&offset=${offset}`;
	return link;
};

const constructLinkToEntity = (endpoint, id) =>{
	let selfLink = config.baseUrl;
	selfLink += config.endpoints[endpoint];
	if (id) selfLink += `/${id}`;
	return selfLink;
};

const halLinkObj = (link) => {
	return {href: link,};
};




module.exports = {
	singleEntityResponse,
	multiEntityResponse
};