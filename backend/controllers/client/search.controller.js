const getSubCategory = require("../../helpers/getSubCategory");
const Products = require("../../models/product.model");

// [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.body.keyword;
  
  let products = await Products.find({
    deleted: false,
    status: "active",
  });
  if(keyword){
      
      products = products.filter((item) => {
        return item.title.toLowerCase().includes(keyword);
      });
  }

  else{

      products=[];
  }
  
  res.render("client/pages/search/index", {
    title: "Kết quả tìm kiếm",
    keyword,
    data: products
  });
};
