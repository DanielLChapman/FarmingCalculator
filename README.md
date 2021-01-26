## OSRS Farming Calculator

Base: Create React App. 
App URL : https://osrs-farming-react.herokuapp.com/

Recursive react app that runs a time increment to get a more accurate idea of what you need to plant. Has plant, check, and harvest experience separated. 

To Use: 

* Input your Current Exp or Level, and Goal Exp or Level and hit Submit.
* Select a farming option
    * This will open more select options for each allotment in that specific type of plant
    * Select what you want to plant in each location, and how many you want to do each day. 
    * Submit to add it to the list
    * Repeat for each location and farming option
* To check what you currently have selected or to remove, on the right click "View/Remove What's Planted"
* This incrememts by default at 15 minutes. You can change that value by changing the Time Increment box. 
* When you are ready to calculate, hit Start Calculation
    * Under Totals on the right will start to appear what you need to plant. When the calculation is done, you will have a total amount to buy from the GE or to farm to reach your goal.

To Do:

* Bugs:
    * ~Mahogany causes crashes~
* Add: 
    * Set all options the same
    * ~Refactor function typeToUse and Plants for DRY~
