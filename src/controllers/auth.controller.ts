import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, user } = await this.authService.signup(
        {
          email,
          password,
        },
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({ user, accessToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, user } = await this.authService.login({
        email,
        password,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({ user, accessToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { accessToken, refreshToken, user } =
        await this.authService.refreshToken({
          refreshToken: req.body.refreshToken,
        });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({ user, accessToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      res.clearCookie("refreshToken");
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
