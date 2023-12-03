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

export const UserControllers = {
  createUser,
};
