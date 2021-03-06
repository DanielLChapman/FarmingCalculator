export const generateLevel = (experience, level = false) => {

    

    let points = 0;
    let output = 0;

    let maxlevel = 200; // last level to display

    let returnObject = {
        currentLevel: 0,
        currentExperience: 0,
    }



    for (let lvl = 1; lvl <= maxlevel; lvl++)
    {
    //osrs level formula
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
    output = Math.floor(points / 4);
    }
    return returnObject;
    
}

const getTypeToUse = (plants, y) => {

    let typeToUse = {};

    switch (y) {
        case 'bush':
            typeToUse = plants['bushes']
            break;
        case 'cactus':
            typeToUse = plants['cacti'];
            break;
        default:
            typeToUse = plants[y];
    }

    return typeToUse;
}

const getPlant = (plants, y, x, i, typeToUse) => {

    let plant = typeToUse[x[i].type];
    if (y === "special_patches") {
        plant = typeToUse[x[i].type+"s"][x[i].type]
    }
    if (y === "special_trees") {
        if (x[i].type === "teak" || x[i].type === "mahogany") {
            plant = typeToUse["hardwoodtrees"][x[i].type];
        }else {
            plant = typeToUse[x[i].type+"trees"][x[i].type];
        }
        
    }

    return plant;
}
export const experienceCalculation = (currentExperience = 0, patches, plants, newDay, growthValue = 1) => {

    let whatWasPlanted = {

    };

    Object.keys(patches).forEach((y) => {
        let x = patches[y].patches;
        //let x = state.planting.trees.patches;
        //Max per day isn't being used;

        let typeToUse = getTypeToUse(plants, y);
        

        Object.keys(x).forEach((i) => {
            let leftoverTime = 0;
            
            let plant = getPlant(plants, y, x, i, typeToUse);
            
            if (newDay) {
              x[i].numberPlanted = 0;
            }

            let p = x[i];

            if (p.planted) {
                p.growth -= growthValue;
                if (p.growth < 0) {
                    leftoverTime = Math.abs(p.growth);
                }
                
                if (p.growth <= 0) {
                    //console.log(`${x[i].type} done at location ${i}`);
                    currentExperience += plant.checking;
                    currentExperience += plant.harvest;
                    p.planted = false;
                    p.growth = plant.growth - leftoverTime;
                }

            } 
            if (!p.planted && p.numberPlanted < p.maxNumberPlanted) {
                p.planted = true;
                p.numberPlanted += 1;
                currentExperience += plant.planting;

                whatWasPlanted[x[i].type] = whatWasPlanted[x[i].type] + 1 || 1;
                //console.log(`${x[i].type} planted at location ${i}`);
            }
            else if (!p.planted) {
                //console.log(`waiting for new day at location ${i}`);
            }

            x[i] = p;
            
            
            
          });


    });

    

    return {
        experience: currentExperience,
        patches: patches,
        whatWasPlanted,
    };
}

export const resetPlanting = (inputPatches = {}, plants) => {
    let patches = inputPatches;
    Object.keys(patches).forEach((y) => {
        let x = patches[y].patches;

        let typeToUse = getTypeToUse(plants, y);

        Object.keys(x).forEach((i) => {
            let plant = getPlant(plants, y, x, i, typeToUse);
        
            let p = x[i];

            p.planted = false;
            p.growth = plant.growth;
            p.numberPlanted = 0;
            x[i] = p;

          });


    });

    return patches;
}
export const plantInitializationCalc = (patches = {}) => {
    let planting = {
        
    };

    Object.keys(patches).forEach((x) => {

        /*

            1. Load names (trees, spirittrees, etc) into a new object


        */
       let a = x.split('patches')[0];
        let patches = {
            
        };

        if (x !== "special_trees" && x !== "special_patches") {
            planting[a] = {
                patches: patches
            }
       } else {
           
           if (x === "special_patches") {
               a = "special_patches";
           }

           planting[a] = {
                patches: patches
            }
       }

    });


    return planting;

}

export const initialization = (patches = {}) => {
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

   Object.keys(patches).forEach((x) => {
       
       let a = x.split('patches')[0];

       
       if (x !== "special_trees" && x !== "special_patches") {

            returnObject[a] = {
                patches: {...patches[x]}
            }
       } else {
           
           if (x === "special_patches") {
               a = "special_patches";
           }

           let r = patches[x];
           returnObject[a] = {
                ...initialization(r)
           }
       }

   });

   return returnObject;
};