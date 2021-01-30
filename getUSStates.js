const axios = require("axios");
const cheerio = require("cheerio");
const baseURL = "https://simple.wikipedia.org/wiki/List_of_U.S._states";
const getUSStates = async () => {
  const USStates = [];
  const { data } = await axios.get(baseURL);
  const $ = cheerio.load(data);
  const table = $(
    "caption:contains('States of the United States of America')"
  ).parent();

  const rows = table.find("tbody tr").slice(2);
  const labels = [
    "code",
    "capital",
    "largest",
    "ratification",
    "population",
    "total_area_miles",
    "total_area_km",
    "land_area_miles",
    "land_area_km",
    "water_area_miles",
    "water_area_km",
    "number_Reps",
  ];
  rows.each((index, element) => {
    const states = {};
    const $element = $(element);
    states.name = $element.find("th a").first().text();
    let offset = 0;
    $element
      .find("td")
      .slice(1)
      .each((i, element) => {
        const $el = $(element);
        let value = $el.text().trim();
        const numValue = Number(value.replace(/,/g, ""));
        //ISNumber? === !isNaN
        if (!isNaN(numValue)) {
          value = numValue;
        }
        if (i === 1 && $el.attr("colspan") === "2") {
          states[labels[i]] = value;
          offset = 1;
        }
        states[labels[i + offset]] = value;
      });

    USStates.push(states);
  });
  return USStates;
};

module.exports = getUSStates;
