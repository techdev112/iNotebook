const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//ROUTE: 1 Fetch all the Notes using: GET "/api/notes/fetchallnotes", Login is Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server occured" });
  }
});

//ROUTE: 2 Add a note using : POST "/api/notes/addnote", Login is Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid Email").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, returns Bad Requests and the Errors
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server occured" });
    }
  }
);

//ROUTE: 2 Update an existing note using : PUT "/api/notes/updatenote/:id", Login is Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    const note = await Notes.findById( req.params.id );
    if(!note) return res.status(404).send("Not Found")
    if(note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised access")

    }
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) 
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server occured" });
  }
});

//ROUTE: 2 Delete an existing note using : DELETE "/api/notes/deletenote/:id", Login is Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be delete and verify note availablity and authorised user
    const note = await Notes.findById( req.params.id );
    if(!note) return res.status(404).send("Not Found")
    if(note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised access")
    }

    const updatedNote = await Notes.findByIdAndDelete(req.params.id) 
    res.json({"Success": "Note has been deleted Successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server occured" });
  }
});
module.exports = router;
