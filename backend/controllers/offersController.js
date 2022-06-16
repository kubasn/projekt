const Offer = require("../models/offerModel");
class Offers {
  async getAllOffers(req, res) {
    let offers;
    let params = {};
    params.areaMin = "1";
    params.areaMax = "10000";
    params.priceMin = "1";
    params.priceMax = "100000";
    if (req.query) {
      Object.assign(params, req.query);
    }
    let area = { $gte: params.areaMin, $lte: params.areaMax };
    let price = { $gte: params.priceMin, $lte: params.priceMax };
    if (!req.query.term) {
      try {
        if (params.offersPerPage || params.firstPostIndex) {
          offers = await Offer.find({ area: area, price: price })
            .skip(params.firstPostIndex)
            .limit(params.offersPerPage);
        } else {
          offers = await Offer.find({ area: area, price: price });
        }
        res.status(200).json({ message: offers });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    if (req.query.term) {
      try {
        //db.users.findOne({"username" : {$regex : "son"}});son
        offers = await Offer.find({
          title: { $regex: new RegExp(req.query.term, "i") },
        });
        res.status(200).json({ message: offers });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  }
  async getOffer(req, res) {
    const id = req.params.id;
    let offer;
    try {
      offer = await Offer.findOne({ _id: id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: offer });
  }

  async editOffer(req, res) {
    const id = req.params.id;
    const offer = req.body;

    try {
      const updateResult = await Offer.updateOne({ _id: id }, offer);
      res.status(200).json({ message: "zaaktualizowano" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server error Occured" });
    }
  }

  async deleteOffer(req, res) {
    let id = req.params.id;
    try {
      await Offer.findOne({ _id: id }).remove();
      res.status(200).json({ message: "usunięto oferte" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async addOffer(req, res) {
    let offer = req.body;
    try {
      await Offer.create(offer);
      res.status(200).json({ message: "dodano ofertę" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new Offers();
