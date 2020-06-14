var budgetController = (function () {

    // Private properties and methods

    // Fucnction Constructor for the Expense type objects
    var Expense = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

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
        expensesContainer: '.expenses__list'

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
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {

                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            // 2. Replacing placeholder text with data from the object
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // 3. Inserting HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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

        }

    };

})();

var appController = (function (budgetCtrl, UICtrl) {

    // Private properties and methods

    var setupEventListeners = function () {

        // Importing input class names
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {

                ctrlAddItem();

            }

        });

    };

    var updateBudget = function () {

        // 1. Calculating the budget
        budgetCtrl.calculateBudget();

        // 2. Returning the budget
        var budget = budgetCtrl.getBudget();

        // 2. Displaying the budget on the UI
        console.log(budget);

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

        }

    };

    // Public properties and methods

    return {

        // Initialization function
        init: function () {

            // test
            console.log('The app has been initialized.');

            // Setting up the Event Listeners
            setupEventListeners();

        }

    };

})(budgetController, UIController);

appController.init();