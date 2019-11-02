const express = require("express");
const path = require("path");
const ProductService = require("../services");
const receipt = "../assets/receipt.pdf";

const movi = app => {
  const router = express.Router();
  app.use("/api/", router);

  const productService = new ProductService();

  router.get("/", (req, res) => {
    res.send(`API v2`);
  });

/*   router.get("/receipts", (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });
 */
  router.get("/trips", async (req, res, next) => {
    try {
      const trips = await productService.getTrips();
      res.status(200).json({
        data: trips,
        message: "Trips listed"
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/trips", async (req, res, next) => {
    const { body: trip } = req;
    try {
      const createTripId = await productService.createTrip({ trip });
      res.status(201).json({
        data: createTripId,
        message: "Trip created"
      });
    } catch (err) {
      next(err);
    }
  });

 /*  router.put("/products/:productId", async (req, res, next) => {
    const { body: product } = req;
    const { productId } = req.params;

    try {
      const updatedProductId = await productService.updateProduct({
        productId,
        product
      });
      res.status(200).json({
        data: updatedProductId,
        message: "Product updated"
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/delete/:productId", async (req, res, next) => {
    const { productId } = req.params;

    try {
      const deletedProductId = await productService.deleteProduct({
        productId
      });
      res.status(200).json({
        data: deletedProductId,
        message: "Product deleted"
      });
    } catch (err) {
      next(err);
    }
  });
 */
  router.get("*", (req, res) => {
    res.status(404).send("Error 404");
  });
};

module.exports = movi;
