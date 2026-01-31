const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contactsController');

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET contact by ID
router.get('/:id', contactsController.getContactById);

// POST create new contact
router.post('/', contactsController.createContact);

// PUT update contact
router.put('/:id', contactsController.updateContact);

// DELETE contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;

