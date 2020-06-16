var budgetController = (function () {

    // Private properties and methods

    // Fucnction Constructor for the Expense type objects
    var Expense = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;

    };

    Expense.prototype.calcPercentage = function (totalIncome) {

        if (totalIncome > 0) {

            this.percentage = Math.round((this.value / totalIncome) * 100);

        } else {

            this.percentage = -1;

        }

    };

    Expense.prototype.getPercentage = function () {

        return this.percentage;

    };

    // Fucnction Constructor for the Income type objects
    var Income = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };

    // Data structure
    var data = {

        allItems: {
            // Arrays for the Expense and Income type objects
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1

    };

    // Method for calculating total Income or Expenses (based on type argument)
    var calculateTotal = function (type) {

        var sum = 0;

        data.allItems[type].forEach(function (currentValue) {

            sum += currentValue.value;

        });

        // Storing the result into the Data structure
        data.totals[type] = sum;

    };

    // Public properties and methods

    return {

        addItem: function (type, desc, val) {

            var newItem, ID;

            // Checking if exp or inc arrays are empty
            if (data.allItems[type].length > 0) {

                // Creating ID for a new object based on the length of the array + 1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            } else {
                ID = 0;
            }

            // Create new item based on type argument
            if (type === 'exp') {

                // Instantiating new Expense object
                newItem = new Expense(ID, desc, val);

            } else if (type === 'inc') {

                // Instantiating new Income object
                newItem = new Income(ID, desc, val);

            }

            // Adding new item based on type at the end of the array
            data.allItems[type].push(newItem);

            // Returning the new item
            return newItem;

        },

        deleteItem: function (type, id) {

            var ids, index;

            // Populating the ids array with the id values of either incomes or expenses (based on type argument)
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            // Finding the index of the id argument
            index = ids.indexOf(id);

            // Deleting element based on its index (if it exists in the array)
            if (index !== -1) {

                data.allItems[type].splice(index, 1);

            }

        },

        calculateBudget: function () {

            // Calculating total income and expeses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculating the budget ( income - expenses )
            data.budget = data.totals['inc'] - data.totals['exp'];

            // Calculating the percentage of income that was spent (expenses / income x 100)
            if (data.totals['inc'] > 0) {

                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            } else {

                data.percentage = -1;

            }

        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (cur) {

                cur.calcPercentage(data.totals.inc);

            });

        },

        getPercentages: function () {

            var allPercentages = data.allItems.exp.map(function (cur) {

                return cur.getPercentage();

            });

            return allPercentages;

        },

        getBudget: function () {

            return {

                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage

            }

        },

        testingDataStructure: function () {
            console.log(data);
        }

    };

})();

var UIController = (function () {

    // Private properties and methods

    var DOMstrings = {

        // Input class names
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',

        // The input 'add' button class name
        inputBtn: '.add__btn',

        // Income and Expenses lists
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',

        // Labels for total Budget, Income, Expenses, and Expenses percentage
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',

        // Event Delegation container
        container: '.container'

    };

    // Public properties and methods

    return {

        getInput: function () {

            return {

                // Reading data from the dropdown menu. Value can be 'inc' or 'exp'.
                type: document.querySelector(DOMstrings.inputType).value,

                // Reading data from the 'description' input field
                description: document.querySelector(DOMstrings.inputDescription).value,

                // Reading data from  the 'value' input field
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)

            };

        },

        getDOMstrings: function () {

            // Exporting input class names
            return DOMstrings;

        },

        addListItem: function (obj, type) {

            var html, newHtml, element;

            // 1. Creating HTML string with placeholder text
            if (type === 'inc') {

                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {

                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            // 2. Replacing placeholder text with data from the object
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // 3. Inserting HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorID) {

            var el;

            // Selecting the element to be removed
            el = document.getElementById(selectorID);

            // Navigating to it's parent node and then removing the element
            el.parentNode.removeChild(el);

        },

        clearFields: function () {

            var fields, fieldsArray;

            // Creating a List
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // Converting List into an Array
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {

                // Clearing contents of an input field 
                current.value = "";

            });

            // Setting focus on the first input field (description)
            fieldsArray[0].focus();

        },

        displayBudget: function (obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {

                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';

            } else {

                document.querySelector(DOMstrings.percentageLabel).textContent = '---';

            }
        }

    };

})();

var appController = (function (budgetCtrl, UICtrl) {

    // Private properties and methods

    var setupEventListeners = function () {

        // Importing DOMstrings object containing CSS class names
        var DOM = UICtrl.getDOMstrings();

        // Adding the 'add item' event listener to the input button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // Adding the 'add item' event listener to the 'enter' keypress
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {

                ctrlAddItem();

            }

        });

        // Adding the 'delete item' event listener to the Income and Expenses list buttons using the Event Delegation technique
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

    var updateBudget = function () {

        // 1. Calculating the budget
        budgetCtrl.calculateBudget();

        // 2. Returning the budget
        var budget = budgetCtrl.getBudget();

        // 2. Displaying the budget on the UI
        console.log(budget);
        UICtrl.displayBudget(budget);

    };

    var updatePercentages = function () {

        // 1. Calculating percentages
        budgetCtrl.calculatePercentages();

        // 2. Reading percentages from the budgetController
        var percentages = budgetCtrl.getPercentages();

        // 3. Updating the UI
        console.log(percentages);

    };

    var ctrlAddItem = function () {

        // Variables
        var input, newItem;

        // 1. Getting data from the input field
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Adding the item to the budgetController
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Adding the to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clearing the input fields
            UICtrl.clearFields();

            // 5. Calculating and updating the budget
            updateBudget();

            // 6. Calculating and updating percentages
            updatePercentages();

        }

    };

    var ctrlDeleteItem = function (event) {

        var itemID, splitTypeAndID, type, ID;

        // Getting id attribute of the target's fourth parent via the DOM traversal
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            // Splitting the string into an arry
            splitTypeAndID = itemID.split('-');

            type = splitTypeAndID[0];
            ID = parseInt(splitTypeAndID[1]);

            // 1. Deleting an item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Deleting an item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Updating and displaying new budget value
            updateBudget();

            // 4. Calculating and updating percentages
            updatePercentages();

        }

    };

    // Public properties and methods

    return {

        // Initialization function
        init: function () {

            // test
            console.log('The app has been initialized.');

            // Clearing the labels
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });

            // Setting up the Event Listeners
            setupEventListeners();

        }

    };

})(budgetController, UIController);

appController.init();