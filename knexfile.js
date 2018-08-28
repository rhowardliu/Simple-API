

dev = {
    client : 'mysql',
    connection:{
    host: "localhost",
    user: "root",
    password: "password",
    database: "MyAPI",
    }
}

test = {
    client : 'mysql',
    connection:{
    host: "localhost",
    user: "root",
    password: "password",
    database: "testMyAPI",
    }
}

module.exports =
    {
        dev,
        test
      }

