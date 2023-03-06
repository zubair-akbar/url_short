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

export const getUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
};