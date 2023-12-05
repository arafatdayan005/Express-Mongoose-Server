import { UserServices } from './user.service';
import { Request, Response } from 'express';
import { orderValidationSchema, userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidateUser = userValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodValidateUser);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not create a user',
      error: {
        code: 404,
        description: 'Could not create a user',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not fetch users',
      error: {
        code: 404,
        description: 'Could not fetch users',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByIDFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;
    const result = await UserServices.updateUserInfo(Number(userId), user);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not update user info',
      error: {
        code: 404,
        description: 'Could not update user info',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not delete user',
      error: {
        code: 404,
        description: 'Could not delete user',
      },
    });
  }
};

const addOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const zodValidateOrder = orderValidationSchema.parse(order);
    await UserServices.addOrdersToUser(Number(userId), zodValidateOrder);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not create an order',
      error: {
        code: 404,
        description: 'Could not create an order',
      },
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrderByIDFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not fetch order',
      error: {
        code: 404,
        description: 'Could not fetch order',
      },
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrderSumByIDFromDB(Number(userId));

    const orderArray = result?.orders;
    const totalSum: number[] | undefined = orderArray?.map(
      (item) => item.price * item.quantity,
    );

    let totalPrice: number = 0;
    totalSum?.forEach((element) => {
      if (totalSum) {
        totalPrice += element;
      }
    });

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: totalPrice.toFixed(2) },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Could not calculate total price',
      error: {
        code: 404,
        description: 'Could not calculate total price',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrders,
  getOrders,
  getTotalPrice,
};
