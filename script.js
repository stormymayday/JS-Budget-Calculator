var budgetController = (function () {

    // Some code

})();

var UIController = (function () {

    // Some code

})();

var appController = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {

        // 1. Get data from the input field

        // 2. Add the item to the budgetController

        // 3. Addd the to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

        console.log('Hi');

    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {

            ctrlAddItem();

        }

    });

})(budgetController, UIController);