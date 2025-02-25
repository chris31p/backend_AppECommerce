const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ msg: "Productos obtenidos: ", products });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener los productos" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
    });
    await newProduct.save();
    res.status(201).json({ msg: "Producto creado exitosamente", newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el producto" });
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, stock } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ msg: "Producto no encontrado" });
    res.json({ msg: "Producto actualizado con éxito " }, updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await Product.findById(id);
    if (!productById) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
