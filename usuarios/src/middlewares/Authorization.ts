import jwt from "jsonwebtoken";
import { validarUsuario } from "../services/AuthService";

export async function Authorization(req: any, res: any, next: any) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "No Authorization Header" });
  }
  try {
    const token = authorization.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(401).json({
        message: "Invalid Token Format",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY ?? "");
    req.data = decode;

    const validation = await validarUsuario(token);
    req.data = validation.data;
    console.log("USER GAAAAAAAAAAAAAAAAAA: ", req.data);
    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
      stack: error.stack,
    });
  }
}
