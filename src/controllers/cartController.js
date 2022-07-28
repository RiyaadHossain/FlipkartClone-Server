const Cart = require("../models/cartModel");

// Add To Cart_________________________
exports.addToCart = (req, res) => {
  const { cartItems } = req.body;
  const user = req.user._id;

  try {

    Cart.findOne({ user }).exec((err, cart) => {
      if (err)
        return res.status(400).json({ error: "Internal Server Error Occured..!" });

      // * The Cart is exist_____
      if (cart) {
        const item = cart.cartItems.find((i) => i.product == cartItems.product);
        if (item) {
          // * Same Product_____
          Cart.findOneAndUpdate(
            { user: user, "cartItems.product": cartItems.product },
            {
              $set: {
                ...cartItems,
                quantity: item.quantity + cartItems.quantity,
              },
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
                  message: "Product added to cart Successfully. - Same Product",
                });
            }
          });
          
        } else {
          // * Unique Product_____
          console.log("Unique Product");
          Cart.findOneAndUpdate(user, {
            $push: { cartItems: cartItems },
          }).exec((err, data) => {
            if (err) {
              return res.status(400).json({ error: "Internal Server Error Occured..!" });
            }
            if (data) {
              if (data)
                return res.status(200).json({
                  message:
                    "Product added to cart Successfully. - Unique Product",
                });
            }
          });
        }
      } else {

        // * The Cart is not exist_____
        const newCart = Cart({ user, cartItems });
        newCart.save((err, data) => {
          if (err)
            return res.status(400).json({ error: "Internal Server Error Occured..!" });

          if (data)
            return res.status(200).json({
              message: "Product added to cart Successfully. - Unique User",
            });
        });

      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error Occured..!" });
  }
};
