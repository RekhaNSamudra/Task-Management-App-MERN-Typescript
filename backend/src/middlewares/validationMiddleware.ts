import { Request, Response, NextFunction } from "express";

// Validate auth inputs
export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  // For register
  if (req.path === "/register") {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
  }

  // For login
  if (req.path === "/login") {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  next();
};

// Validate task inputs
export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, status } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      message: "Task title is required",
    });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({
      message: "Task title must be at least 3 characters",
    });
  }

  if (status) {
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be: pending, in-progress, or completed",
      });
    }
  }

  next();
};
