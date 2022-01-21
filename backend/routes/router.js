const router = require('express').Router();
const mongoose = require('mongoose');
const Eduwork = require('../models/Eduwork');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Eduwork', () => console.log('Database telah terkoneksi!'));
}

router.get('/product', async (req, res) => {
  try {
    const product = await Eduwork.find();
    res.json(product)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/product/:id', getProduct, (req, res) => {
    res.send(res.product);
})

router.post('/product', async (req, res) => {
  const product = new Eduwork({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    status: req.body.status
  });
  try {
    const newProduct = await product.save();
    res.status(200).json(newProduct);
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/product/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product has been deleted!'})
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/product/:id', getProduct, async (req, res) => {
  if(req.body.name != null) res.product.name = req.body.name;
  if(req.body.price != null) res.product.price = req.body.price;
  if(req.body.stock != null) res.product.stock = req.body.stock;
  if(req.body.status != null) res.product.status = req.body.status;
  try {
    const updateProduct = await res.product.save();
    res.json(updateProduct);
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Eduwork.findById(req.params.id);
    if(!product) {
      return res.status(404).json({ message: 'Cannot find product!'})
    }
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product;
  next();
}

module.exports = router;