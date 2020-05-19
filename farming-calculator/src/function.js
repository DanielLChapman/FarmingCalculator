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
    previousOutput = output;
    output = Math.floor(points / 4);
    }
    return returnObject;
    
}

export const experienceCalculation = (currentExperience = 0, patches, plants, newDay, growthValue = 1) => {
    let trees = plants['trees'];
    let fruittrees = plants['fruittrees'];

    Object.keys(patches).map((y) => {
        let x = patches[y].patches;
        //let x = state.planting.trees.patches;

        let typeToUse = {};

        switch (y) {
            case 'trees':
                typeToUse = trees;
                break;
            case 'fruittrees':
                typeToUse = fruittrees;
                break;
            default:
                console.log(y);
        }


        Object.keys(x).map((i) => {
            if (newDay) {
              x[i].numberPlanted = 0;
            }
            if (x[i].numberPlanted > x[i].maxNumberPlanted) {
              return null;
            }
            if (!x[i].planted && x[i].numberPlanted <= x[i].maxNumberPlanted) {
              x[i].planted = true;
              x[i].numberPlanted += 1;
              currentExperience += typeToUse[x[i].type].planting;
              console.log('planted');
            }
            
            x[i].growth -= growthValue;
            if (x[i].growth === 0) {
              currentExperience += typeToUse[x[i].type].checking;
              currentExperience += typeToUse[x[i].type].harvest;
              x[i].planted = false;
              x[i].growth =  typeToUse[x[i].type].growth;
              console.log(`${x[i].type} done at location ${i}`);
            }
          });


    });
    

    return currentExperience;
}

export const initialization = (patches) => {
    /*

    turn
     export const treepatches = ['Falador Park', 'Lumbridge', 'Taverly', 'Gnome Stronghold', 'Farming Guild', 'Varrock'];

    into 
        trees: {
          patches: {
            lumbridge: {
              numberPlanted: 0,
              maxNumberPlanted: 2,
              type: 'magic',
              growth: trees['magic'].growth,
              planted: false

            },

    */
   let returnObject = {};
   Object.keys(patches).map((x) => {
       let a = x.split('patches')[0];

       returnObject[a] = {
           patches: {...patches[x]}
       }
    
       console.log(returnObject);
   })
};