import Order from "../../model/order.js";

// add order
export const save = async (newOrder) => {
  const course = new Order(newOrder); // created instance of course and saved in mongodb
  return await course.save();
};

//  find order by id
export const find = async (id) => {
  const courses = await Order.findById(id).exec(); //return promise so using await
  return courses;
};

// update order
export const update = async (updatedOrder, id) => {
  const course = await Order.findByIdAndUpdate(id, updatedOrder, {
    new: true,
  }).exec();
  return course;
};

// delete order
export const remove = async (id) => {
  return await Order.findByIdAndDelete(id).exec();
};

// get all orders
export const getAll = async (params = {}) => {
  const orders = await Order.find(params).exec(); //return promise so using await
  return orders;
};

// search orders
export const search = async (params = {}, page = 1, pageSize = 10) => {
  try {
    // Extract userId and restaurantId from the params
    const { userId, restaurantId, ...otherParams } = params;

    // Calculate skip based on page and pageSize
    const skip = Math.max(0, (page - 1) * pageSize);

    // Build the query condition with userId and restaurantId if available
    const queryCondition = {
      ...otherParams,
      ...(userId && { userId }),
      ...(restaurantId && { restaurantId }),
    };

    // Use the extracted values or fallback to default values if not provided
    const orders = await Order.find(queryCondition)
      .skip(skip)
      .limit(pageSize)
      .exec();

    return orders;
  } catch (error) {
    // Handle errors (e.g., log, throw, or return a default value)
    console.error("Error in orderService.search:", error);
    throw error;
  }
};
