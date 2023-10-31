// kelvin constant variable
const kelvin = 0;

// Convert kelvin to celcius
const celcius = kelvin - 273;

// Convert celcius to fahrenheit
let fahrenheit = celcius * (9 / 5) + 32;

// Round down the fahrenheit temperature
fahrenheit = Math.floor(fahrenheit);

console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);
// Convert celcius to the Newton scale
let newton = celcius * (33 / 100);

// Round down the Newton temperature
newton = Math.floor(newton);

console.log(`The temperature is ${newton} degrees Newton.`);