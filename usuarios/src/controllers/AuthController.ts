import { User } from "../models/User";
import { Roles } from "../models/Roles";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Op } from "sequelize";

export class AuthController {
  async register(req: any, res: any) {
    try {
      const { email, password, rolId } = req.body.usuario;

      if (!process.env.SECRET_KEY) {
        return res
          .status(500)
          .json({ message: "SECRET_KEY no está configurado en el entorno" });
      }
      console.log("secret key:", process.env.SECRET_KEY);
      console.log("rolId: ", rolId);
      const rol = await Roles.findByPk(rolId);
      if (!rol) return res.status(404).json({ message: "el rol no existe" });
      const newusuario = await User.create({
        email,
        password,
        rolId,
      });
      console.log(rol.name, newusuario.id);
      if (rol.name == "admin") {
        console.log("Eres Ingeniero");
      }
      const secretKey = process.env.SECRET_KEY ?? "";
      const token = jwt.sign({ id: newusuario.id, rol: rol?.name }, secretKey, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        token,
        rol: rol.name,
        usuario: newusuario,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "error interno del servidor", error: error.message });
    }
  }

  async login(req: any, res: any) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const entidad = await User.findOne({
        where: { email },
        include: [
          {
            model: Roles,
            attributes: ["id", "name"],
          },
        ],
      });
      if (!entidad) {
        return res.status(404).json({ message: "Usuario not found" });
      }
      const resultado = await User.comparePassword(password, entidad.password);
      //console.log(resultado);
      if (resultado) {
        const token = jwt.sign(
          { id: entidad.id, rol: entidad.rol.name },
          process.env.SECRET_KEY ?? "",
          {
            expiresIn: 86400,
          }
        );
        return res.status(200).json({
          token,
          rol: entidad.rol.name,
          usuario: entidad,
        });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "error interno del servidor", error: error.message });
    }
  }

  async validate(req: any, res: any) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          valid: false,
          code: "TOKEN_NO_PROVISTO",
          message: "Token no proporcionado",
        });
      }

      const secretKey = process.env.SECRET_KEY ?? "";
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      const usuario = await User.findOne({
        where: { id: decoded.id },
        include: [{ model: Roles, attributes: ["id", "name"] }],
        attributes: ["id", "email", "rolId"],
      });

      if (!usuario) {
        return res.status(404).json({
          valid: false,
          code: "USUARIO_NO_ENCONTRADO",
          message: "Usuario no encontrado",
        });
      }

      return res.status(200).json({
        valid: true,
        user: {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol.name,
        },
      });
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          valid: false,
          code: "TOKEN_INVALIDO",
          message: "Token inválido",
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          valid: false,
          code: "TOKEN_EXPIRADO",
          message: "Token expirado",
        });
      }
      console.error("Error en validación:", error);
      return res.status(500).json({
        valid: false,
        code: "ERROR_SERVIDOR",
        message: "Error interno del servidor",
      });
    }
  }
  async listar(_req: any, res: any) {
    try {
      const usuarios = await User.findAll({
        include: [
          {
            model: Roles,
            attributes: ["id", "name"],
          },
          {
            // model: SharedFolders,
            attributes: ["path", "accessType"],
          },
        ],
      });
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: "error interno del servidor" });
    }
  }
  async getById(req: any, res: any) {
    try {
      const { id } = req.params;
      const usuario = await User.findByPk(id, {
        include: [
          {
            model: Roles,
            attributes: ["id", "name"],
          },
          {
            // model: SharedFolders,
            attributes: ["path", "accessType"],
          },
        ],
      });
      if (!usuario)
        return res.status(404).json({ message: "usuario no encontrado" });
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ message: "error interno del servidor" });
    }
  }
  async search(req: any, res: any) {
    const { search } = req.body;
    try {
      const usuarios = await User.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: "error interno del servidor" });
    }
  }
}
