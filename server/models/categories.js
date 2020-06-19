const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', unique: true },
  categories: [String],
});

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports.getUserCategories = ({ _id }) => {
  return Categories.find({ user: _id }).exec();
};

module.exports.saveUserCategory = ({ _id, category }) => {
  return Categories.findOneAndUpdate(
    { user: _id },
    { $push: { categories: category } },
    {
      new: true,
      upsert: true,
      useFindAndModify: false,
    }
  ).exec();
};

// Employeehierarchy.findByIdAndUpdate(employeeparent._id,
//   { "$push": { "childrens": employee._id } },
//   { "new": true, "upsert": true },
//   function (err, managerparent) {
//       if (err) throw err;
//       console.log(managerparent);
//   }
// );
// Using your original update() method, the syntax is

// Employeehierarchy.update(
//  { "_id": employeeparent._id},
//  { "$push": { "childrens": employee._id } },
//  function (err, raw) {
//      if (err) return handleError(err);
//      console.log('The raw response from Mongo was ', raw);
//  }
// );
