const mongoose = require("mongoose");
let Offer = require("../models/offerModel");

mongoose.connect(process.env.database_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Offers = [
  new Offer({
    title: "Dom w sasankach",
    price: 3300,
    area: 50,
    description:
      "Niewielki dom jednorodzinny z poddaszem użytkowym, o prostej bryle i wygodnym wewnętrznym układzie funkcjonalnym. Projekt doskonale sprawdzi się w realizacji na wąskich działkach. Należy także do kategorii: projekty domów tanich w budowie, zwarta forma budynku i dwuspadowy dach pozytywnie oddziałują na koszty budowy oraz późniejsze użytkowanie.",
    imagePath: "",
    additionalInfo: {
      height: 4.55,
      volume: 344.3,
      floorSurface: 46.28,
      heating: "nie",
      ventilation: "mechaniczne",
      roof: "dwuspadowy",
      ceiling: "płyta żelbetowa",
    },
  }),
];
let done = 0;
for (i = 0; i < Offers.length; i++) {
  Offers[i].save((err, result) => {
    done++;
    if (done == Offers.length) {
      exit();
    }
  });
}

let exit = () => {
  mongoose.disconnect();
};
