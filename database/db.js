

const people = 
    {       
        "count" : 1,
        "_embedded" : [ {
            "_links" : {
            "self" : {
                "href" : "<baseurl>/people/1"
            }
            },
            "name" : "Nassim Taleb",
            "birthDate" : "1960-12-29",
            "countryOfBirth" : "Lebanon",
            "id" : 1
        },
        {
            "_links" : {
            "self" : {
                "href" : "<baseurl>/people/2"
            }
            },
            "name" : "Barack Obama",
            "birthDate" : "1958-10-04",
            "countryOfBirth" : "USA",
            "id" : 2
        },
        ]
    };


exports.people = people;