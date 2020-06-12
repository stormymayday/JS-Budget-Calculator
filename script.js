var budgetController = (function () {

    var a = 2;

    var addA = function (arg) {
        return arg + a;
    };

    return {
        publicAdd: function (arg) {
            return addA(arg);
        }
    }

})();

var UIController = (function () {

    // Some Code

})();

var appController = (function (budgetCtrl, UICtrl) {

    var testVar = budgetCtrl.publicAdd(5);

    return {
        publicTest: function () {

            return testVar;

        }
    }

})(budgetController, UIController);


console.log(appController.publicTest());
