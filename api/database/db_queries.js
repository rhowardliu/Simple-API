const addEntry = (table, object) => {
    let query = `INSERT INTO ${table} `;
    query = addObjectKeys(query, object);
    query += ` VALUES `;
    query = addObjectValues(query, object);

    return query;
}

const getEntry = (table, id) => {
    return query = `SELECT *, DATE_FORMAT(birthDate,'%Y-%m-%d') AS birthDate 
    FROM ${table} WHERE id=${id}`;
}

const getMultiEntries = (table, obj) =>{
    return query = `SELECT *, DATE_FORMAT(birthDate,'%Y-%m-%d')AS birthDate 
    FROM ${table} LIMIT ${obj.limit} OFFSET ${obj.offset}`;

}

const deleteEntry = (table, id) => {
    return query = `DELETE FROM ${table} WHERE id=${id}`;
}

const updateEntry = (table, object) => {
    query = `UPDATE ${table} SET `;
    query = equateObjectKeyValue(query, object);
    query += ` WHERE id=${object.id}`;

    return query;
}

function equateObjectKeyValue(query, object){
    for (let key in object){
        query = query.concat(`${key} = '${object[key]}', `)
    }
    query = query.slice(0,-2);

    return query;
}

function addObjectKeys(query, object){
    query = query.concat(`(`);
    for (let key in object){
        query = query.concat( `${key}, `);
    }
    query = query.slice(0, -2);
    query = query.concat( `)`);
    return query;
}

function addObjectValues(query, object){
    query = query.concat(`(`);
    for (let key in object){
        query = query.concat( `'${object[key]}', `);
    }
    query = query.slice(0, -2);
    query = query.concat( `)`);
    return query;
}

module.exports = {
    addEntry,
    getEntry,
    getMultiEntries,
    deleteEntry,
    updateEntry,
}