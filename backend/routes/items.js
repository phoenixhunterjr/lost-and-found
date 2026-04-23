const router = require('express').Router();
const Item = require('../models/Item');
const auth = require('../middleware/authMiddleware');

// Add item
router.post('/', auth, async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get all items
router.get('/', auth, async (req, res) => {
  const items = await Item.find().populate('postedBy', 'name email');
  res.json(items);
});

// Search items
router.get('/search', auth, async (req, res) => {
  const { name } = req.query;
  const items = await Item.find({ itemName: { $regex: name, $options: 'i' } });
  res.json(items);
});

// Get by ID
router.get('/:id', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;