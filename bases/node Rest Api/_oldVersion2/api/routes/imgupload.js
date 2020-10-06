const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (!req.body.imgData) {
    const error = new Error('no image passed');
    error.status = 404;
    next(error);
    return;
  }

  res.status(200).json({
    message: 'Created images',
    imgData: 'null',
  });
});

// router.post('/', (req, res, next) => {
//     const order = {
//         productId: req.body.productId,
//         quantity: req.body.quantity
//     }

//     res.status(201).json({
//         message: 'Order was POSTed',
//         order: order
//     });
// });

// router.get('/:orderId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Order Details',
//         orderId: req.params.orderId
//     });
// });

// router.delete('/:orderId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Order Deleted',
//         orderId: req.params.orderId
//     });
// });

module.exports = router;
