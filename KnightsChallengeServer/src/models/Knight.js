import mongoose from "mongoose";

const knightSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    nickname: {type: String, required: true},
    birthday: {type: Date, required: true},
    weapons: [
      {
        name: {type: String, required: true},
        mod: {type: Number, required: true},
        attr:  {type: String, required: true},
        equipped: {type: Boolean, required: true}
      }
    ],
    attributes: {
      strength: {type: Number},
      dexterity: {type: Number},
      constitution: {type: Number},
      intelligence: {type: Number},
      wisdom: {type: Number},
      charisma: {type: Number},
    },
    keyAttribute: {type: String, required: true}
  }
)
const knights = mongoose.model('Knights', knightSchema) 
export default knights

