const Category = require('../models/categories.model.js');
var compareKeys = require('../functions/compare.js');

// get all category list
exports.getList = (req,resp) => {
    Category.find().then( data => {
        var result = { 
            totalRecord:data.length,
            result: data
        };
        resp.status(200).send(result);
    }).catch( err => {
        resp.status(500).send('Server Error : ',err);
    });
    return;
};
// create category
exports.create = (req,resp) => {
    var data = req.body;
    var requireFields = ['companyId','categoryName','categoryText','categoryStatus','categoryCreatedBy'];
    var missingFields = compareKeys(data,requireFields);
    // return missing fields if not empty
    if(Boolean(missingFields.length)){
        resp.status(401).send('Require Fields Missing....'+missingFields.toString());
        return;
    }
    // create category object for insert collection    
    const category = new Category({
        companyId: data.companyId,
        categoryName: data.categoryName,
        categoryText: data.categoryText,
        categoryStatus: data.categoryStatus,
        categoryCreatedBy: data.categoryCreatedBy
    });
    // save category in collection
    category.save(category).then(data => {
        // send success response
        resp.status(200).send({
            message : 'Record Created...'
        });
    }).catch(err => {
        // send error response 
        resp.status(500).send({
            message : 'Server Error'
        });
    });
};
// update category
exports.update = (req,resp) => {
    var query = req.query;
    console.log();
    if(!Boolean(query.id)){
        resp.status(401).send({message:'Category Id required..!'});
        return;
    }
    // update category using id
    Category.findByIdAndUpdate(query.id,req.body,{ useFindAndModify: false }).then(data => {
        // send success response
        if (!data) {
            resp.status(404).send({
              message: `Cannot Update Category with id=${id}. Maybe Tutorial was not found!`
            });
        } else resp.send({ message: "Category was updated successfully." });
    }).catch(err => {
        // send error response 
        resp.status(500).send({
            message : 'Server Error: '+err
        });
    });
};
// delete category
exports.delete = (req,resp) => {
    var query = req.query;
    console.log();
    if(!Boolean(query.id)){
        resp.status(401).send({message:'Category Id required..!'});
        return;
    }
    // delete category using id
    Category.findByIdAndRemove(query.id).then(data => {
        // send success response
        if (!data) {
            resp.status(404).send({
              message: `Cannot Delete Category with id=${id}. Maybe Tutorial was not found!`
            });
        } else resp.send({ message: "Category was Delete successfully." });
    }).catch(err => {
        // send error response 
        resp.status(500).send({
            message : 'Server Error: '+err
        });
    });
};
