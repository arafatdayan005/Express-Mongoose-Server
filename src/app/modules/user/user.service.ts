import { UserModel } from '../user.model';
import { User, Orders } from './user.interface';
import bcrypt from "bcrypt";

const createUserIntoDB = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  const result = await UserModel.create(newUser);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserByIDFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateUserInfo = async (userId: number, user: User) => {
  const result = await UserModel.updateOne({ userId }, user);
  return result;
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