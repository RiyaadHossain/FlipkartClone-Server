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

      // #1 The Cart exists_______________
      if (cart) {
        const item = cart.cartItems.find((i) => i.product == cartItems.product);

        let find, update;
        /* To shorten the code, I used two variable named find and update. If the item is already 
        exist then the value of the find and update will be different from the item is unique.
        Finally, we find and Update the cart in one place. (Line No. 47) */

        if (item) {

          // #1.1 Same Product_____
          find = { user, "cartItems.product": cartItems.product };
          update = {
            $set: {
              "cartItems.$": {
                ...cartItems,
                quantity: Number(item.quantity) + Number(cartItems.quantity),
              },
            },
          };
        } else {

          // #1.2 Unique Product_____
          find = {
            user,
          }; /* [Bug:] Another user add second unique product. Push this product in other user's cart--------------------Bug----------------------- */
          update = {
            $push: { cartItems: cartItems },
          };
        }

        Cart.findOneAndUpdate(find, update, { new: true }).exec((err, data) => {
          if (err) {
            return res
              .status(400)
              .json({ error: "Internal Server Error Occured..!" });
          }
          if (data) {
            if (data)
              return res.status(200).json({
                data,
              });
          }
        });
      } else {
        // #2 The Cart doesn't exist_______________
        const newCart = Cart({ user, cartItems });
        newCart.save((err, data) => {
          if (err)
            return res
              .status(400)
              .json({ error: "Internal Server Error Occured..!" });

          if (data)
            return res.status(200).json({
              data,
            });
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error Occured..!" });
  }
};
