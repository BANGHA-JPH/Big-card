import Joi from 'joi';

export const registerValidator = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileValidator = Joi.object({
  name: Joi.string().min(2).max(100),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/),
  avatar: Joi.string().uri(),
}).min(1);

export const addressValidator = Joi.object({
  type: Joi.string().valid('home', 'work', 'other').required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().pattern(/^\d{5,6}$/).required(),
  isDefault: Joi.boolean(),
});

export const createProductValidator = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  originalPrice: Joi.number().positive(),
  stock: Joi.number().min(0).required(),
  unit: Joi.string().required(),
  categoryId: Joi.string().uuid().required(),
  tags: Joi.array().items(Joi.string()),
  isOrganic: Joi.boolean(),
  isFresh: Joi.boolean(),
});

export const cartItemValidator = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().min(1).required(),
});

export const createOrderValidator = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().uuid().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .required(),
  deliveryAddressId: Joi.string().uuid().required(),
  paymentMethod: Joi.string().required(),
  couponCode: Joi.string(),
});

export const reviewValidator = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(1000),
});

export const couponValidator = Joi.object({
  code: Joi.string().max(50).required(),
  discount: Joi.number().positive().required(),
  discountType: Joi.string().valid('percentage', 'fixed').required(),
  minAmount: Joi.number().positive(),
  expiryDate: Joi.date().required(),
});
