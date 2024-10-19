const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result');

program.parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf-8');
const parsedData = JSON.parse(data);

let result = ''; 

if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result);
}

if (!options.output && !options.display) {
  console.log('Please specify output or display option');
}
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }
  
