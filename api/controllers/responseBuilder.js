const config = require('../config');


singleEntityResponse = (endpoint, object) =>{
	link = constructLinkToEntity(endpoint, object.id);
	halLink = halLinkObj(link);
	object._links = {self: halLink};
	return;
};


multiEntityResponse = (endpoint, objects, params) => {
	resObj = {};
	addSelfLinksToCollection(endpoint, objects);
	offsetValues = calculateOffset(params);

	resObj.total = params.total;
	resObj.count = objects.length;
	resObj._embedded = embeddedCollection(endpoint, objects);
	resObj._links = collectionLinks(endpoint, offsetValues);

	return resObj;
};


collectionLinks = (endpoint, offsetVals) => {
	halSelfLink = {self: halLinkObj(constructLinkToEntity(endpoint))};
    
	firstLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.first);
	halFirstLink = {first: halLinkObj(firstLink)};

	lastLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.last);
	halLastLink = {last: halLinkObj(lastLink)};

	nextLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.next);   
	halNextLink = {next: halLinkObj(nextLink)};

	prevLink = constructLinkForCollection(endpoint, offsetVals.limit, offsetVals.prev);
	halPrevLink = {prev: halLinkObj(prevLink)};

	return Object.assign({}, halSelfLink, halFirstLink, halLastLink, halNextLink, halPrevLink);

};

calculateOffset = (params) =>{
	let limit = params.limit;
	let offset = params.offset;
	let total = params.total;

	offsetValues = {};
	offsetValues.limit = limit;
	offsetValues.first = 0;
	offsetValues.last = Math.max(total - limit, 0);
	offsetValues.next = Math.min(offset + limit, offsetValues.last);
	offsetValues.prev = Math.max(offset - limit, 0);

	return offsetValues;

};

embeddedCollection = (name, entities)=>{
	embObj = {};
	embObj[name] = entities;
	return embObj;
};


addSelfLinksToCollection = (endpoint, objects) =>{
	for (let obj of objects){
		singleEntityResponse(endpoint, obj);
	}
};

constructLinkForCollection = (endpoint, limit, offset) =>{
	link = config.baseUrl;
	link += config.endpoints[endpoint];
	link += `?limit=${limit}&offset=${offset}`;
	return link;
};

constructLinkToEntity = (endpoint, id) =>{
	selfLink = config.baseUrl;
	selfLink += config.endpoints[endpoint];
	if (id) selfLink += `/${id}`;
	return selfLink;
};

halLinkObj = (link) => {
	return {href: link,};
};




module.exports = {
	singleEntityResponse,
	multiEntityResponse
};