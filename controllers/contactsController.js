const { ObjectId } = require('mongodb');
const db = require('../db/connect');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const database = db.getDb();
    const result = await database.collection('contacts').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET contact by ID
const getContactById = async (req, res) => {
  try {
    const database = db.getDb();
    const contactId = new ObjectId(req.params.id);
    const result = await database
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new contact
const createContact = async (req, res) => {
  try {
    const database = db.getDb();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await database.collection('contacts').insertOne(contact);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const database = db.getDb();
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await database
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const database = db.getDb();
    const contactId = new ObjectId(req.params.id);

    const result = await database
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
