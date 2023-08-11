import knights from '../models/Knight.js'
import moment from 'moment'

class knightController {
  static findAll = async (req, res) => {
    try {
      const filter = req.query.filter
      let items = await knights.find()

      const itemsToReturn = mapAtributes(items)

      if (filter) {
        res.status(200).json(itemsToReturn.filter(item => item.exp > 800))
      } else {
        res.status(200).json(itemsToReturn)
      }
    }catch(ex){
      res.status(500).json({message: `Unable to get data: ${ex}`})
    }
  }

  static findById = async (req, res) => {
    const id = req.params.id
    try {
      const item = await knights.findById(id)
      const itemsToReturn = mapAtributes([item])
      res.status(200).json(itemsToReturn)
    }catch(ex) {
      res.status(500).json({message: `Unable to get data: ${ex}`})
    }
  }

  static Register = async (req, res) => {
    let knight = new knights(req.body)
    try {
      await knight.save()
      res.status(201).json(knight.toJSON())
    } catch (ex) {
      res.status(500).json({ message: `${ex.message} -- fail to register` })
    }
  }

  static updateNickName = async (req, res) => {
    const id = req.params.id
    try {
      await knights.findByIdAndUpdate(id, { $set: req.body })
      res.status(200).json({ massage: "item updated" })
    } catch (ex) {
      res.status(500).json({ message: `error-> ${ex} -- fail to update nickname` })
    }
  }

  static delete = async (req, res) => {
    const id = req.params.id
    try {
      await knights.findByIdAndDelete(id)
      res.status(200).json({ massage: "item deleted" })
    }catch(ex) {
      res.status(500).json({ message: `error-> ${ex} -- fail to delete item` })
    }
  }
}

function mapAtributes (data) {
  return data.map((item) => {
    return {
      key: item.id,
      name: item.name,
      nickname:item.nickname,
      weapons: item.weapons,
      keyAttribute: item.keyAttribute,
      birthday: item.birthday,
      attack: attack(moment().diff(item.birthday, 'years'), item.weapons.find(item => item.equipped).mod),
      age: moment().diff(item.birthday, 'years'),
      exp: Math.floor(((moment().diff(item.birthday, 'years')) - 7) * Math.pow(22, 1.45))
    }
  })
}

function attack(keyAttr, equippedWeaponMod) {
  let modValue = 0;

  if (keyAttr >= 0 && keyAttr <= 8) {
    modValue = -2;
  } else if (keyAttr >= 9 && keyAttr <= 10) {
    modValue = -1;
  } else if (keyAttr >= 13 && keyAttr <= 15) {
    modValue = 1;
  } else if (keyAttr >= 16 && keyAttr <= 18) {
    modValue = 2;
  } else if (keyAttr >= 19 && keyAttr <= 20) {
    modValue = 3;
  }

  const attack = 10 + modValue + equippedWeaponMod;
  return attack;
}
export default knightController