import { UserServices } from './user.service';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Could not create a user",
      error: {
        code: 404,
        description: "Could not create a user",
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
      message: "Could not fetch users",
      error: {
        code: 404,
        description: "Could not fetch users",
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser
};
