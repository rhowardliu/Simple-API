'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/peopledb'); 

module.exports= {
 collection: (mcollection) =>{
        this.myCollection = mongoose.model(mcollection);

        post = (item) =>{
            let new_item = new myCollection(item);
            new_item.save((err, item)=>{
            if (err) return
            else return item
            }
        )
        };
        

    }
}
;
