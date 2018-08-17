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
    halSelfLink = constructHalSelfLink (endpoint, object.id);
    object._links = selfLinkObj(halSelfLink);

}

module.exports = {
    singleEntityResponse,
}