import Url from '../model/model.js'

export const postUrl = async (req, res) => {
  const url = new Url(req.body);
  try {
    const insertUrl = await url.save();
    res.status(201).json(insertUrl);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
};