const productCategory = require("../models/product-category.model");

module.exports.getCategories = (parentId) => {
  async function getSubCategory(parentId) {
    const categories = await productCategory.find({
      parentId,
      status: "active",
      deleted: false,
    });
    let allSubs = [...categories];
    for (let item of allSubs) {
      const sub = await getSubCategory(item.id);
      allSubs = allSubs.concat(sub);
    }
    return allSubs;
  }

  const result = getSubCategory(parentId);
  return result;

};
