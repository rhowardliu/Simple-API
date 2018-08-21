uniqueId = () =>{
    return (new Date()).getTime()%99999;
}
addIdToObj = (obj) =>{
    obj.id = uniqueId();
    return Promise.resolve();
}

module.exports = {
    addIdToObj,
}