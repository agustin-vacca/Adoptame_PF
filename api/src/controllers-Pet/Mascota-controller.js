const { Pet, Vaccines, Diseases, Location } = require("../db.js");
const { Op } = require("sequelize");
const Validation = require("./Validation");
const sumarDias = require("./sumarDias");
const fs = require("fs");
//const cloudinary = require("../cloudinary/index")

//CLOUDINARY
const cloudinary = require('cloudinary').v2;
const {CLOUD_NAME, API_KEY, API_SECRET} = process.env;

// Configuration 
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});


//CRUD API MASCOTAS

const createMascota = async (req, res) => {
  try {
    let {
      name,
      animal,
      sex,
      breed,
      height,
      weight,
      age,
      color,
      description,
      image,
      identified,
      timewait,
      adopted,
      vaccine,
      disease,
      location,
    } = req.body;

    aux = req.files.image.tempFilePath;
    
    const result = await cloudinary.uploader.upload(aux, { folder: "pets" })
    await fs.unlink(aux, (err => {
      if (err) 
        console.log(err);
      else {
        console.log(`\nDeleted file: ${aux}`);
      }
    }));

    const msg = await Validation(req.body);
    if (msg) throw new Error(msg);

    if (identified) {
      var d = new Date();
      timewait = sumarDias(d, 30);
      adopted = false;
    } else {
      timewait = new Date();
      adopted = true;
    }

    const newMascota = await Pet.create({
      name,
      animal,
      sex,
      breed,
      height,
      weight,
      age,
      color,
      description,
      image: result.secure_url,
      identified,
      timewait,
      adopted,
    });

    await newMascota.addVaccines(vaccine);
    await newMascota.addDiseases(disease);
    await newMascota.addLocation(location);
    newMascota
      ? res.status(200).send("Pet created successfully 👌")
      : res.status(404).json("Pet not created ☹ ");
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const getMascotas = async (req, res) => {
  try {
    const { name } = req.query; //opcion por name
    const pets = await Pet.findAll({
      include: [
        {
          model: Vaccines,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Diseases,
          attributes: ["name", "severity"],
          through: { attributes: [] },
        },
        {
          model: Location,
          attributes: ["id", "province"],
          through: { attributes: [] },
        },
      ],
    });

    if (name) {
      const queryPets = await Pet.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          {
            model: Vaccines,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
          {
            model: Diseases,
            attributes: ["name", "severity"],
            through: { attributes: [] },
          },
          {
            model: Location,
            attributes: ["id", "province"],
            through: { attributes: [] },
          },
        ],
      });
      res.status(200).send(queryPets);
    } else {
      res.status(200).send(pets);
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const mascotaById = async (req, res) => {
  try {
    const { id } = req.params;

    const mascotaById = await Pet.findByPk(id, {
      include: [
        {
          model: Vaccines,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Diseases,
          attributes: ["name", "severity"],
          through: { attributes: [] },
        },
        {
          model: Location,
          attributes: ["province"],
          through: { attributes: [] },
        },
      ],
    });

    mascotaById
      ? res.json(mascotaById)
      : res.status(400).json("There are no pets with that id in the db");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const mascotaById = await Pet.findByPk(id);

    if (mascotaById) {
      mascotaById.adopted = true;
      //console.log(mascotaById)
      await mascotaById.save();
      res.json("La mascota fue adoptada con exito");
    } else {
      res.status(400).json("There are no pets with that id in the db");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateMascota = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    animal,
    sex,
    breed,
    height,
    weight,
    age,
    color,
    description,
    image,
    identified,
    timewait,
    adopted,
  } = req.body;

  try {
    if (!id) {
      res.status(400).json("No se encuentra ID");
    } else {
      const mascotaById = await Pet.findByPk(id);
      if (name) mascotaById.name = name;
      if (animal) mascotaById.animal = animal;
      if (sex) mascotaById.sex = sex;
      if (breed) mascotaById.breed = breed;
      if (height) mascotaById.height = height;
      if (weight) mascotaById.weight = weight;
      if (age) mascotaById.age = age;
      if (color) mascotaById.color = color;
      if (description) mascotaById.description = description;
      if (image) mascotaById.image = image;
      if (identified) mascotaById.identified = identified;
      if (timewait) mascotaById.timewait = timewait;
      if (adopted) mascotaById.adopted = adopted;
      // for (let prop in body) {
      //       var aux = body[prop];
      //       mascotaById.prop = aux;
      //   }

      mascotaById.save();
      console.log(mascotaById);
      res.json("El cambio fue realizado con exito");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createMascota,
  getMascotas,
  mascotaById,
  deleteMascota,
  updateMascota,
};
