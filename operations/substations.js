const fs = require('fs').promises;
const path = require("path")

const substationsPath = path.join(__dirname, '../', "db", "substations.json");

const listSubstations = async () => {
  const data = await fs.readFile(substationsPath);
  const substations = JSON.parse(data);
  return substations;
}


const substationsOperations = {
  listSubstations
};

module.exports = substationsOperations;
