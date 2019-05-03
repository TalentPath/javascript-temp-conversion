/*
    This is a class to convert temperatures
    I assume all users know the format that the numbers and temperature units should be entered in.  
        (I have provided a log to inform user if they entered something incorrectly).
    I assume users wont try to convert a unit to its current unit (I provided an error for that as well).
    I assume all numbers are entered in decimal format (no hex, binary, etc) and without commas or periods
*/

class Conversion {
    constructor() {
        this.number = 0;
        this.unit = 'F';
        this.convUnit = 'C';
    }

    convert(number, unit) {
        //Check to make sure unit entered is a number, if not, notify user
        unit = this.validateUnit(unit);

        if (unit) {
            //Test to make sure number is a number, else return null
            if (isNaN(number)) {
                console.log(`"${number}" is not a valid number`);
                number = null;
            }
        }
        //update values and return
        this.number = number;
        this.unit = unit;
        return this;
    }

    to(convUnit) {
        //validate unit to be converted to
        convUnit = this.validateUnit(convUnit);

        if (convUnit) {
            this.convUnit = convUnit;
        }
        return this;
    }

    //Function to validate user input for units
    validateUnit(unit) {
        if (unit) {
            unit = unit.toUpperCase(); //Convert unit to uppercase to account for lowercase letters
            if (unit == "K" || unit == "C" || unit == "F") {

                return unit;
            } else {
                //Alert user that in invalid metric has been entered
                console.log(`"${unit}" is not a valid metric. Please enter a valid input metric (K,F or C)\n`);
                unit = null;
            }
        } else {
            unit = null;
        }
        return unit;
    }

    execute() {
        //add logic to decipher conversion
        let conversions = {};   //object to hold all conversions
        let convertedVal = null;  //number to old returned value

        switch (this.unit) {
            case "K":
                conversions["C"] = this.number - 273.15;
                conversions["F"] = ((this.number - 273.15) * 1.8) + 32;
                break;
            case "F":
                conversions["C"] = (this.number - 32) / 1.8;
                conversions["K"] = ((this.number - 32) / 1.8) + 273.15;
                break;
            case "C":
                conversions["F"] = (this.number * 1.8) + 32;
                conversions["K"] = this.number + 273.15;
                break;
            default:
            //console.log("Please enter a valid conversion metric");
        }
        //final check to make sure all values are present and valid types
        if (this.number !== null && this.unit && this.convUnit) {
            if (this.unit !== this.convUnit) {  //test to make sure user is not converting to same unit
                convertedVal = parseFloat(conversions[this.convUnit]).toFixed(2);
                console.log(
                    `${this.number} ${this.unit} is ${convertedVal} ${this.convUnit}`
                );
            } else {
                console.log("Please select a different unit to convert to.");
                convertedVal = this.number;
            }
        }
        return convertedVal;
    }
}

// Functioning Examples
let a = new Conversion()
    .convert(0, "c")
    .to('f')
    .execute(); //returns 32

if (a) {
    let b = new Conversion()
        .convert(a, 'f')
        .to('k')
        .execute();  //returns 273.15
    if (b) {
        let c = new Conversion()
            .convert(b, 'k')
            .to('c')
            .execute();   //returns 0
    }
}

function doConversion(unit, number) {
    console.log(number, unit);
    let fahrenheit = document.getElementById("F");
    let celsius = document.getElementById("C");
    let kelvin = document.getElementById("K");
    switch (unit) {
        case "K":
            celsius.value = new Conversion().convert(number, unit).to("C").execute();
            fahrenheit.value = new Conversion().convert(number, unit).to("F").execute();
            break;
        case "F":
            celsius.value = new Conversion().convert(number, unit).to("C").execute();
            kelvin.value = new Conversion().convert(number, unit).to("K").execute();
            break;
        case "C":
            fahrenheit.value = new Conversion().convert(number, unit).to("F").execute();
            kelvin.value = new Conversion().convert(number, unit).to("K").execute();
            break;
        default:
        //console.log("Please enter a valid conversion metric");
    }

}

function clearAll(){
    document.getElementById("F").value = "";
    document.getElementById("C").value = "";
    document.getElementById("K").value = "";
}