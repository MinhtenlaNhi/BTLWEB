const reviewModel = require("../../models/review.model");
const userModel = require("../../models/user.model");

// [GET] /review/:productId
module.exports.index = async (req, res) => {
  const productId = req.params.productId;
  const review = await reviewModel.findOne({
    product_id: productId,
  });
  if(review){
    let listUser = [];
    for(let item of review.reviewer){
        const userItem = await userModel.findOne({
            _id: item.user_id
        }).select("fullName avartar");
        let plainItem = item.toObject();
        plainItem.fullName = userItem.fullName;
        plainItem.avartar = userItem.avartar;

        listUser.push(plainItem);
    }
    res.json({
        code: 200,
        message: "Thành công!",
        reviewer: listUser
    })
  }
  else{
    res.json({
        code: 200,
        reviewer: []
    });

  }
};

// [POST] /review/add/:productID

module.exports.add = async (req, res) => {
  const productId = req.params.productId;
  const { comment, rating } = req.body;
  const tokenUser = req.headers.authorization.split(" ")[1];

  const user = await userModel.findOne({
    tokenUser,
  });
  if (user && productId && comment !== "" && rating) {
    const productOfReview = await reviewModel.findOne({
      product_id: productId,
    });
    const infoReview = {
      product_id: productId,
      reviewer: [
        {
          user_id: user.id,
          rating,
          comment,
          createdAt: Date.now(),
        },
      ],
    };
    if (!productOfReview) {
      const newReview = new reviewModel(infoReview);
      await newReview.save();
      res.json({
        code: 200,
        message: "Thêm đánh giá thành công!",
      });
    } else {
      await reviewModel.updateOne(
        {
          product_id: productId,
        },
        {
          $push: { reviewer: infoReview.reviewer },
        }
      );
      res.json({
        code: 200,
        message: "Thêm đánh giá thành công!",
      });
    }
  } else {
    res.json({
      code: 400,
      message: "Thêm đánh giá không thành công",
    });
  }
};
