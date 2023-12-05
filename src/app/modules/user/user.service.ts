import { UserModel } from '../user.model';
import { User, Orders } from './user.interface';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  const result = await UserModel.create(newUser);

  if (result.orders?.length === 0) {
    const data = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };
    return data;
  } else {
    const data = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
      orders: result.orders,
    };
    return data;
  }
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const getUserByIDFromDB = async (userId: number) => {
  const existingUser = await UserModel.exists({ userId });
  if (!existingUser) {
    throw { code: 404, description: 'User not found!' };
  } else {
    const result = await UserModel.findOne(
      { userId },
      { _id: 0, password: 0, orders: 0, __v: 0 },
    );
    return result;
  }
};

const updateUserInfo = async (userId: number, user: User) => {
  const existingUser = await UserModel.exists({ userId });
  if (!existingUser) {
    throw { code: 404, description: 'User not found!' };
  } else {
    const result = await UserModel.updateOne({ userId }, user);
    if (result.modifiedCount == 1) {
      const updatedUser = await UserModel.findOne({ userId });
      const data = {
        userId: updatedUser?.userId,
        username: updatedUser?.username,
        fullName: updatedUser?.fullName,
        age: updatedUser?.age,
        email: updatedUser?.email,
        isActive: updatedUser?.isActive,
        hobbies: updatedUser?.hobbies,
        address: updatedUser?.address,
      };
      return data;
    }
  }
};

const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const addOrdersToUser = async (userId: number, orders: Orders) => {
  const result = await UserModel.updateOne(
    { userId },
    { $push: { orders: orders } },
  );
  return result;
};

const getOrderByIDFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

const getOrderSumByIDFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
  updateUserInfo,
  deleteUserFromDB,
  addOrdersToUser,
  getOrderByIDFromDB,
  getOrderSumByIDFromDB,
};