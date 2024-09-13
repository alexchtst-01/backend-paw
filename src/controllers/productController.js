import Product from "../models/ProductModel.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find().populate("userID");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ msg: "data berhasil dibuat" });
  } catch (error) {
    res.status(501).json({ msh: error.message });
  }
};

// update by id
export const updateProduct = async (req, res) => {
  const { productID } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: "product tidak ditemukan" });
    }

    res.status(200).json({ msg: "berhasil mengupdate product" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete by id
export const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productID);
    if (!deletedProduct)
      return res.status(404).json({ msg: "product tidak ditemukan" });
    res.status(200).json({ msg: "product berhasil di hapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
