const db = require('../config/connection.js');

var schema = db.mongoose.Schema({
        companyId: Number,
        categoryName: String,
        categoryText: String,
        categoryStatus: Boolean,
        categoryCreatedBy: Number,
    },
    { timestemps: true }
);

// schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });

// category model
const Category = db.mongoose.model('category',schema);

module.exports = Category;
