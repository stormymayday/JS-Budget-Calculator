var budgetController = (function () {

    // Some code

})();

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

            return DOMstrings;

        }

    };



})();

var appController = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function () {

        // 1. Get data from the input field
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budgetController

        // 3. Addd the to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

        console.log('Hi');

    };

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {

            ctrlAddItem();

        }

    });

})(budgetController, UIController);