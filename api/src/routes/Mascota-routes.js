const express = require("express");
const router = express.Router();

const {
  createMascota,
  getMascotas,
  mascotaById,
  deleteMascota,
  updateMascota,
} = require("../controllers-Pet/Mascota-controller");


router.get("/", getMascotas); //trae todas las mascotas
router.get("/:id", mascotaById); //trae por id
router.post("/",  createMascota); //crea una mascota
router.put("/:id", updateMascota); //actualiza una mascota
router.delete("/:id", deleteMascota); //elimina una mascota

module.exports = router;
