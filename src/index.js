const fs = require('fs');
const csv = require('csv');
const _ = require('lodash');
const { columnsToDelete, valuesToChange } = require('../mappings');

// validate the input file is provided
const inputFilePath = process.argv[2];
if (!inputFilePath) {
  throw new Error('Input file is required');
}

// validate the output file is provided
const outputFilePath = process.argv[3];
if (!outputFilePath) {
  throw new Error('Output file is required');
}

const input = fs.createReadStream(inputFilePath);
const output = fs.createWriteStream(outputFilePath);

input
  .pipe(csv.parse())
  .pipe(
    csv.transform(row => {
      // delete the columns
      columnsToDelete.forEach((columnIndex, index) =>
        row.splice(columnIndex - index, 1),
      );
      return row.map(value => {
        // update the values
        const update = _.find(valuesToChange, value);
        if (update) {
          return update[value];
        }
        return value;
      });
    }),
  )
  .pipe(csv.stringify())
  .pipe(output);
