function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let countBrackets = 0;

    let numberStack = [];
    let operationStack = [];

    let priority = {
          "+": 0,
          "-": 0,
          "*": 1,
          "/": 1
    }

    let mathOperations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) =>  a / b
    }

    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === "(") {
        countBrackets++;
      } else if(expr[i] === ")"){
        countBrackets--;
      }
    }

    if (countBrackets !== 0) {
      throw new Error("ExpressionError: Brackets must be paired");
    }

    let exprArr = expr.split(" ").filter(elem => elem.trim() !== "");
    console.log(exprArr);

    for (let i = 0; i < exprArr.length; i++) {
      if (exprArr[i] === '0' && exprArr[i - 1] === '/') throw new Error('TypeError: Division by zero.');

      if (!isNaN(exprArr[i])) { //проверка на число и добавление числа в стек
        numberStack.push(exprArr[i]);
      } else if (operationStack.length === 0) { //добавление первой скобки или операции в стек
        operationStack.push(exprArr[i]);
      } else if(priority[exprArr[i]] > priority[operationStack[operationStack.length - 1]] || exprArr[i] == '(' || operationStack[operationStack.length - 1] == '(' && exprArr[i] != ')') {
        //проверка на величину текужего значения приоритета (текующий должен быть больше предыдущего)
        operationStack.push(exprArr[i]);
      } else if (priority[exprArr[i]] <= priority[operationStack[operationStack.length - 1]]) {
        //если текущий приоретет меньше то проводим операцию на последних двух цифрах стека чисел, вырезаем их и вставлем результат
        let result = mathOperations[operationStack.pop()](+numberStack[numberStack.length - 2], +numberStack[numberStack.length - 1]);
        numberStack.splice(numberStack.length - 2, 2, result);
        i--;
      } else if (exprArr[i] == ')' && operationStack[operationStack.length - 1] != '(') {
        //проверка на конец выражения в скобках
        let result = mathOperations[operationStack.pop()](+numberStack[numberStack.length - 2], +numberStack[numberStack.length - 1]);
        numberStack.splice(numberStack.length - 2, 2, result);
        i--;
      } else if (exprArr[i] == ')' && operationStack[operationStack.length - 1] == '(') {
        operationStack.splice(operationStack.length - 1, 1);
      }
    }
    /*Проводим операции над массивом с пезультатом */
    for (let i = 0; i < operationStack.length; i++) {
      let result = mathOperations[operationStack.pop()](+numberStack[numberStack.length - 2], +numberStack[numberStack.length - 1]);
      numberStack.splice(numberStack.length - 2, 2, result);
        i--;
    }
    
    return numberStack[0];
}

module.exports = {
    expressionCalculator
}
