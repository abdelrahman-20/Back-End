const express = require("express");
const contactRouter = express.Router();

const getAllContacts = (req, res) => {
  res.status(200).json({
    message: "Getting All Contacts ...",
  });
};

const getContact = (req, res) => {
  res.status(200).json({
    message: `Getting Contact With ID: ${req.params.id}`,
  });
};

const createContact = (req, res) => {
  res.status(201).json({
    message: "Creating Contact ...",
  });
};

const updateContact = (req, res) => {
  res.status(200).json({
    message: `Updating Contact With ID: ${req.params.id}`,
  });
};

const deleteContact = (req, res) => {
  res.status(204).json({
    message: `Deleting Contact With ID: ${req.params.id}`,
    data: null,
  });
};

contactRouter.route("/").get(getAllContacts);
contactRouter.route("/").post(createContact);
contactRouter.route("/:id").get(getContact);
contactRouter.route("/:id").patch(updateContact);
contactRouter.route("/:id").delete(deleteContact);

module.exports = contactRouter;
