var budgetController = (function () {

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
        }

    };

})();

var Expense = function (id, description, value) {

    this.id = id;
    this.description = description;
    this.value = value;

};

var UIController = (function () {

    // Private
    var DOMstrings = {

        // Input class names
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',

        // The input 'add' button class name
        inputBtn: '.add__btn'

    };

    // Public
    return {

        getInput: function () {

            return {

                // Reading data from the dropdown menu. Value can be 'inc' or 'exp'.
                type: document.querySelector(DOMstrings.inputType).value,

                // Reading data from the 'description' input field
                description: document.querySelector(DOMstrings.inputDescription).value,

                // Reading data from  the 'value' input field
                value: document.querySelector(DOMstrings.inputValue).value

            };

        },

        getDOMstrings: function () {

            // Exporting input class names
            return DOMstrings;

        }

    };



})();

var appController = (function (budgetCtrl, UICtrl) {

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

    var ctrlAddItem = function () {

        // 1. Get data from the input field
        var input = UICtrl.getInput();

        // 2. Add the item to the budgetController

        // 3. Addd the to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    // Public
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