import contact from "../models/contact.js";

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { contact_title, first_name, last_name, email, message } = req.body;

    const newContact = new contact({
      contact_title,
      first_name,
      last_name,
      email,
      message,
      created_at: new Date(),
    });

    await newContact.save();
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find().sort({ created_at: -1 });
    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const _contact = await contact.findById(id);
    if (!_contact) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Success", payload: _contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
