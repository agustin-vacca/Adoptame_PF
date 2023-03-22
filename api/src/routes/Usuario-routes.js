const express = require("express");
const router = express.Router();
const {
  createUsuario,
  getUsuario,
  UsuarioById,
  deleteUsuario,
  updateUsuario,
} = require("../controllers/Usuario-controller");


router.get("/", getUsuario); //trae todos los usuarios
router.get("/:id", UsuarioById); //trae por id
router.post("/", createUsuario); //crea una usuario
router.put("/:id", updateUsuario); //actualiza un usuario
router.delete("/:id", deleteUsuario); //elimina un usuario

module.exports = router;