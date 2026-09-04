import { AppError } from "../errors/AppError.js";
import { createTask, getTasksByUserId } from "../repositories/user.task.repository.js";

const validateTitle = (title: unknown): string => {
  if (typeof title !== "string" || title.trim() === "") {
    throw new AppError(400, "Title is required");
  }
  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
    throw new AppError(400, "Title must be between 3 and 100 characters");
  }

  return trimmedTitle;
};

export const createUserTask = async (userId: string, title: unknown) => {
  const validatedTitle = validateTitle(title);
  return createTask(userId, validatedTitle);
};

export const getUserTasks = async (userId: string): Promise<any[]> => {
  return getTasksByUserId(userId);
}
