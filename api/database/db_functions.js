exports.addEntry = async (table, object)=>{
    query = `INSERT INTO ${table} `;
    query = addObjectKeys(query, object);
    query += ` VALUES `;
    query = addObjectValues(query, object);

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

