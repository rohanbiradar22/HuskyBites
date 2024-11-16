import orderRouter from "./order-route.js";
import authRouter from "./authRoute.js";
import restaurantRouter from "./restaurantRoute.js";
import userRouter from "./userRoute.js"
//below is default export so no need a name

export default (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/restaurant", restaurantRouter);
  app.use("/orders", orderRouter);
  app.use("/delivery", orderRouter);
};
