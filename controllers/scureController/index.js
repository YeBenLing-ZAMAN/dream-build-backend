const PcBuilder = require("../../Models/pcBuilderModel");
const Products = require("../../Models/productsModel");

const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    const allProducts = await Products.find(query);
    res.send(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const getProduct = await Products.find({ _id: id });
    if (getProduct) {
      res.send(getProduct);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getPcComponents = async (req, res) => {
  try {
    const userEmail = req.headers.authorization;
    console.log(userEmail);
    const result = await PcBuilder.find({ userEmail: userEmail })
      .populate({
        path: "pcComponent",
        model: "products",
      })
      .exec();
    if (result) {
      res.send({
        message: "Success",
        data: result[0].pcComponent,
      });
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const addPcComponent = async (req, res) => {
  try {
    const userEmail = req.headers.authorization;
    const data = req.body;
    let updatedPcBuilderProduct;
    const result = await PcBuilder.find({ userEmail: userEmail });
    if (!result.length) {
      updatedPcBuilderProduct = await PcBuilder.create({
        userEmail: userEmail,
        pcComponent: data._id,
      });
    } else {
      updatedPcBuilderProduct = await PcBuilder.findOneAndUpdate(
        {
          userEmail: userEmail,
        },
        {
          $push: {
            pcComponent: data._id,
          },
        },
        {
          new: true,
        }
      );
    }
    res.send({
      message: "Success",
      data: updatedPcBuilderProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  getPcComponents,
  addPcComponent,
};
