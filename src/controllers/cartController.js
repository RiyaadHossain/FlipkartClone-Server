const Cart = require("../models/cartModel");

// Add To Cart_________________________
exports.addToCart = async (req, res) => {
  const { cartItems } = req.body;
  const user = req.user._id;

  try {
    Cart.findOne({ user }).exec(async (err, cart) => {
      if (err)
        return res
          .status(400)
          .json({ error: "Internal Server Error Occured..!" });

      // * The Cart is exist_____
      if (cart) {
        const item = cart.cartItems.find((i) => i.product == cartItems.product);

        if (item) {
          // * Same Product_____
          Cart.findOneAndUpdate(
            { user, "cartItems.product": cartItems.product },
            {
              $set: {
                "cartItems.$": {
                  ...cartItems,
                  quantity: Number(item.quantity) + Number(cartItems.quantity),
                },
              },
            },
            {
              new: true,
            }
          ).exec((err, data) => {
            if (err) {
              return res
                .status(400)
                .json({ error: "Internal Server Error Occured..!" });
            }
            if (data) {
              if (data)
                return res.status(200).json({
                  // message: "Product added to cart Successfully. - Same Product",
                  data,
                });
            }
          });
        } else {
          // * Unique Product_____
          Cart.findOneAndUpdate(
            user,
            {
              $push: { cartItems: cartItems },
            },
            {
              new: true,
            }
          ).exec((err, data) => {
            if (err) {
              return res
                .status(400)
                .json({ error: "Internal Server Error Occured..!" });
            }
            if (data) {
              if (data)
                return res.status(200).json({
                  // message:"Product added to cart Successfully. - Unique Product",
                  data,
                });
            }
          });
        }
      } else {
        // * The Cart is not exist_____
        const newCart = Cart({ user, cartItems });
        newCart.save((err, data) => {
          if (err)
            return res
              .status(400)
              .json({ error: "Internal Server Error Occured..!" });

          if (data)
            return res.status(200).json({
              // message: "Product added to cart Successfully. - Unique User",
              data,
            });
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error Occured..!" });
  }
};
