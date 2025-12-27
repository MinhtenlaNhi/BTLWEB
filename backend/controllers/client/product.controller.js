const productCategory = require("../../models/product-category.model");
const Products = require("../../models/product.model");
const getSubCategory = require("../../helpers/getSubCategory");
// [GET] /products/
module.exports.index = async (req, res) => {
  const { sortBy, sortValue, page } = req.query;
  let pagination = {
    currentPage: 1,
    limit: 8,
  };

  // Lấy ra tất cả sản phẩm
  const find = {
    deleted: false,
    status: "active",
  };

  if (page) {
    pagination.currentPage = Number(page);
  }
  const totalProduct = await Products.countDocuments(find);
  pagination.totalProduct = totalProduct;
  pagination.totalPage =
    totalProduct > pagination.limit
      ? Math.ceil(totalProduct / pagination.limit)
      : 1;
  pagination.skip = (pagination.currentPage - 1) * pagination.limit;
  let sort = {};
  if (sortBy && sortValue) {
    sort[sortBy] = sortValue;
  }
  const products = await Products.find(find)
    .sort(sort)
    .limit(pagination.limit)
    .skip(pagination.skip);
  // End Lấy ra tất cả sản phẩm

  // Lấy ra tất cả sản phẩm nổi bật
  const findFeatured = {
    deleted: false,
    status: "active",
    featured: "1",
  };
  const productsFeatured = await Products.find(findFeatured).limit(10);
  // End Lấy ra tất cả sản phẩm nổi bật
  res.json({
    code: 200,
    products,
    productsFeatured,
    pagination,
  });
};

// [POST] /search
module.exports.search = async (req, res) => {
  const { keyword, page } = req.query;
  console.log("Keyword received in backend:", req.query);
  const regex = new RegExp(keyword, "i");
  let find = {
    deleted: false,
    status: "active",
  };
  let pagination = {
    currentPage: 1,
    limit: 5,
  };
  if (page) {
    pagination.currentPage = Number(page);
  }
  if (keyword) {
    find.title = regex;
    const totalProduct = await Products.countDocuments(find);
    pagination.totalProduct = totalProduct;
    pagination.totalPage =
      totalProduct > pagination.limit
        ? Math.ceil(totalProduct / pagination.limit)
        : 1;

    const products = await Products.find(find)
      .limit(pagination.limit)
      .skip((pagination.currentPage - 1) * pagination.limit);
    console.log("Products found:", products);
    res.json({
      code: 200,
      products,
      pagination,
      message: "Tìm kiếm sản phẩm thành công",
    });
  } else {
    res.json({
      code: 400,
      message: "Không tìm thấy sản phẩm",
    });
  }
};

// [GET] /products/slugCategory
module.exports.category = async (req, res) => {
  const { sortBy, sortValue, page } = req.query;
  const title = req.params.slugCategory;

  let pagination = {
    currentPage: 1,
    limit: 8,
  };
  const find = {
    title,
    status: "active",
    deleted: false,
  };

  const category = await productCategory.findOne(find);
  if(category){

    const arrayCategories = await getSubCategory.getCategories(category.id);
    const arrayCategoriesId = arrayCategories.map((item) => {
      return item.id;
    });
  
    // phân trang
    if (page) {
      pagination.currentPage = Number(page);
    }
    const totalProduct = await Products.countDocuments({
      deleted: false,
      status: "active",
      product_category_id: { $in: [category.id, ...arrayCategoriesId] },
    });
    pagination.totalProduct = totalProduct;
    pagination.totalPage =
      totalProduct > pagination.limit
        ? Math.ceil(totalProduct / pagination.limit)
        : 1;
    pagination.skip = (pagination.currentPage - 1) * pagination.limit;
    let sort = {};
    if (sortBy && sortValue) {
      sort[sortBy] = sortValue;
    }
    // End phân trang
    
    // Lấy ra danh sách sản phẩm theo danh mục
    const products = await Products.find({
      deleted: false,
      status: "active",
      product_category_id: { $in: [category.id, ...arrayCategoriesId] },
    }).sort(sort).limit(pagination.limit).skip(pagination.skip);;
    // End Lấy ra danh sách sản phẩm theo danh mục
  
    res.json({
      code: 200,
      message: "Lấy ra sản phẩm theo danh mục thành công!",
      products,
      pagination
    });
  }
  else{
    res.json({
      code: 200,
      message: "Lấy danh sách sản phẩm theo danh mục không thành công!"
    })
  }
};

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    // Lấy ra sản phẩm theo slug product
    const slug = req.params.slugProduct;
    const product = await Products.findOne({
      slug,
    });
    // End Lấy ra sản phẩm theo slug product

    // Lấy ra sản phẩm theo productCategory
    let category = {};
    if (product && product.product_category_id) {
      category = await productCategory
        .findOne({
          _id: product.product_category_id,
        })
        .select("title");
    }
    // End Lấy ra sản phẩm theo productCategory

    // Lấy tất cả sản phẩm liên quan
    let productsRelated = [];
    if (product && product.product_category_id && category) {
      productsRelated = await Products.find({
        product_category_id: category.id,
      });
    }
    // End Lấy tất cả sản phẩm liên quan
    res.json({
      code: 200,
      message: "Thành công",
      product,
      category,
      productsRelated,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
      message: "Không tìm thấy sản phẩm",
    });
  }
};
