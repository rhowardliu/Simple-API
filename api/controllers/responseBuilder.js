config = require('../config');

constructHalSelfLink = (endpoint, id) =>{
    selfLink = config.baseUrl;
    selfLink += config.endpoints[endpoint]
    if (id) selfLink += `/${id}`
    return selfLink;
}

selfLinkObj = (selfLink) => {
    return {
        self: {
            href: selfLink,
        }
    }
}


singleEntityResponse = (endpoint, object) =>{
    halSelfLink = constructHalSelfLink(endpoint, object.id);
    object._links = selfLinkObj(halSelfLink);
    return Promise.resolve();
}

multiEntityResponse = (endpoint, objects) => {
    for (let obj of objects){
        singleEntityResponse(endpoint, obj);
    }
    return Promise.resolve();
}

module.exports = {
    singleEntityResponse,
    multiEntityResponse
}