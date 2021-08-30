const roundTo2DecimalPlaces = (n) => {
  return Math.round((n + Number.EPSILON) * 100) / 100;
};

class Person {
  height = 0;
  weight = 0;
  age = -1;
  gender = -1; // male: 0, female: 1
  waistCircumference = 0;
  neckCircumference = 0;
  hipCircumference = 0;
  
  constructor() {
    
  }
  
  findBMI() {
    let h = this.height / 100;
    return this.weight / (h * h);
  }
  
  findBodyFatPercentage() {
    if(
      this.age === -1 ||
      this.height === 0 ||
      this.weight === 0 ||
      this.gender === -1
    ) {
      return null;
    }
    let log10 = Math.log10;
    let bodyFatPercentage;
    // Male
    if(this.gender === 0) {
      bodyFatPercentage = 495 /
        (1.0324 - 0.19077 *
          log10(this.waistCircumference - this.neckCircumference) +
          0.15456 *
          log10(this.height)
        ) - 450;
    }
    // Female
    else if(this.gender === 1) {
      bodyFatPercentage = 495 /
        (1.29579 - 0.35004 *
          log10(
            this.waistCircumference +
            this.hipCircumference -
            this.neckCircumference
          ) +
          0.22100 *
          log10(this.height)
        ) - 450;
    }
    return roundTo2DecimalPlaces(bodyFatPercentage);
  }
  findDailyCalorieIntake() {
    // Mifflin-St Jeor Equation
    let mifflinStJeorValue;
    // Male
    if(this.gender === 0) {
      mifflinStJeorValue = 
        (10 * this.weight) +
        (6.25 * this.height) -
        (5 * this.age) + 5;
    }
    // Female
    else if(this.gender === 1) {
      mifflinStJeorValue = 
        (10 * this.weight) +
        (6.25 * this.height) -
        (5 * this.age) - 161;
    }
    
    // Revised Harris-Benedict Equation
    let revisedHarrisBenedictValue;
    // Male
    if(this.gender === 0) {
      revisedHarrisBenedictValue =
        (13.397 * this.weight) +
        (4.799 * this.height) -
        (5.677 * this.age) + 88.362;
    }
    // Female
    else if(this.gender === 1) {
      revisedHarrisBenedictValue =
        (9.247 * this.weight) +
        (3.098 * this.height) -
        (4.330 * this.age) + 447.593;
    }
    
    return roundTo2DecimalPlaces((mifflinStJeorValue + revisedHarrisBenedictValue)/2);
  }
}

export {
  Person
};