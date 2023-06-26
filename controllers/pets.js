const Pet = require("../models/pet");

module.exports = {
  index,
  new: newPet,
  create,
  edit,
  update,
  show,
  delete: deletePet,
};

async function index(req, res) {
  const pets = await Pet.find({});
  res.render("pets/index", { pets, title: "All Pets" });
}

function newPet(req, res) {
  res.render("pets/new", { title: "New Pet" });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    await Pet.create(req.body);
    res.redirect("/pets");
  } catch (err) {
    res.render("pets/new", { errorMsg: err.message });
  }
}

async function edit(req, res) {
  const pet = await Pet.findById(req.params.id);
  res.render("pets/edit", { pet, errorMsg: "", title: "Edit Pet" });
}

async function update(req, res) {
  try {
    await Pet.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/pets");
  } catch (err) {
    res.render("pets/new", { errorMsg: err.message });
  }
}

async function show(req, res) {
  const pet = await Pet.findById(req.params.id);
  res.render("pets/show", {
    pet: await Pet.findById(req.params.id),
    title: pet.name,
  });
}

async function deletePet(req, res) {
  await Pet.findByIdAndDelete(req.params.id);
  res.redirect("/pets");
}
