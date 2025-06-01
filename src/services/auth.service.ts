import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../types";

type JwtPayload = {
  userId: string;
};

type GenerateTokenResult = {
  accessToken: string;
  refreshToken: string;
};

type SignupResult = {
  user: User;
} & GenerateTokenResult;

type LoginResult = {
  user: User;
} & GenerateTokenResult;

type RefreshTokenResult = {
  user: User;
} & GenerateTokenResult;

export class AuthService {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  generateTokens(userId: number): GenerateTokenResult {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    return { accessToken, refreshToken };
  }

  async signup(args: {
    email: string;
    password: string;
  }): Promise<SignupResult> {
    const user = await this.userModel.getUserByEmail({ email: args.email });
    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);
    const newUser = await this.userModel.createUser({
      email: args.email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = this.generateTokens(newUser.user_id);

    return { accessToken, refreshToken, user: newUser };
  }

  async login(args: { email: string; password: string }): Promise<LoginResult> {
    const user = await this.userModel.getUserByEmail({ email: args.email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const { accessToken, refreshToken } = this.generateTokens(user.user_id);

    return { accessToken, refreshToken, user };
  }

  async refreshToken(args: {
    refreshToken: string;
  }): Promise<RefreshTokenResult> {
    const decoded = jwt.verify(
      args.refreshToken,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new Error("Invalid refresh token");
    }

    const user = await this.userModel.getUserById({ id: decoded.userId });

    if (!user) {
      throw new Error("User not found");
    }

    const { accessToken, refreshToken } = this.generateTokens(user.user_id);

    return { accessToken, refreshToken, user };
  }

  async authenticate(args: { accessToken: string }): Promise<User> {
    const decoded = jwt.verify(
      args.accessToken,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new Error("Invalid access token");
    }

    const user = await this.userModel.getUserById({ id: decoded.userId });
    return user;
  }
}
