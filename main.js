const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'input file path')  
  .option('-o, --output <path>', 'output file path')      
  .option('-d, --display', 'display result');               

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

try {
  const data = fs.readFileSync(options.input, 'utf-8');
  const parsedData = JSON.parse(data);

  const incomes = parsedData.find(item => item.txten === "Income, total");
  const expenses = parsedData.find(item => item.txten === "Expenses, total");
  
  let result = '';
  
  if (incomes) {
    result += `Доходи, усього: ${incomes.value}\n`;
  }
  
  if (expenses) {
    result += `Витрати, усього: ${expenses.value}\n`;
  }

  if (options.display) {
    console.log(result);
  }

  if (options.output) {
    fs.writeFileSync(options.output, result);
  }

} catch (error) {
  console.error('Error reading or parsing the input file:', error.message);
  process.exit(1);
}
