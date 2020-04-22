export const generateLevel = (experience, level = false) => {


    let points = 0;
    let output = 0;
    let minlevel = 2; // first level to display
    let maxlevel = 200; // last level to display

    let returnObject = {
        currentLevel: 0,
        currentExperience: 0,
    }

    let previousOutput = 0;


    for (let lvl = 1; lvl <= maxlevel; lvl++)
    {
    
    points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7.));
    if (level && lvl === experience) {
        returnObject.currentExperience = output;
        returnObject.currentLevel = lvl;
        break;
    } else if (!level && output > experience) {
        returnObject.currentLevel = lvl - 1;
        returnObject.currentExperience = experience;
        break;
    }

    


    if (lvl >= minlevel)
        console.log('Level ' + lvl + ' - ' + output + ' xp');
    previousOutput = output;
    output = Math.floor(points / 4);
    }

/*     let lowExperience = 0;
    let output = 0;
    let minlevel = 2;
    let maxlevel = 200;
    
    
    
    for (let lvl = 1; lvl <= maxlevel; lvl++)
    {
      lowExperience += Math.floor(lvl + 300 * Math.pow(2, lvl / 7.));

      output = Math.floor(lowExperience / 4);

      if (level && lvl === experience) {
          returnObject.currentLevel = experience;
          returnObject.currentExperience = output;
          break;
      } else {
          if (lowExperience >= experience) {
            returnObject.currentLevel = previousObject.lvl;
            returnObject.currentExperience = experience;
            break;
          }
      }
      if (lvl >= minlevel)
        console.log('Level ' + lvl + " : " + output);
    
      previousObject = {
          lowExperience,
          lvl
      }
      
    }
   */
    return returnObject;
    
}