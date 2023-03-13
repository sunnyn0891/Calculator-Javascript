(function () {
  class Calculator {
    constructor(prevData, currentData) {
      this.prevTextElementData = prevData;
      this.currentTextElementData = currentData;
      this.clear();
    }

    clear() {
      this.currentOperand = "";
      this.prevOperand = "";
      this.operation = undefined;
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    equal() {}

    appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
      if (!this.currentOperand) return;
      if (this.prevOperand) {
        this.compute();
      }
      this.operation = operation;
      this.prevOperand = this.currentOperand;
      this.currentOperand = "";
    }

    compute() {
      let computation;
      let prev = parseFloat(this.prevOperand);
      let current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "x":
          computation = prev * current;
          break;
        case "÷":
          computation = prev / current;
          break;
        default:
          break;
      }

      this.currentOperand = computation;
      this.prevOperand = "";
      this.operation = undefined;
    }

    updateDisplay() {
      this.currentTextElementData.innerText = this.currentOperand;
      if(this.operation){
        this.prevTextElementData.innerText =  `${this.prevOperand} ${this.operation}`
      }else{
        this.prevTextElementData.innerText = this.prevOperand;
      }
    }
  }
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operator]");
  const allClearButtons = document.querySelector("[data-all-clear]");
  const deleteButtons = document.querySelector("[data-delete]");
  const equalButtons = document.querySelector("[data-equal]");
  const previousData = document.querySelector("[data-previous]");
  const currentData = document.querySelector("[data-current]");

  const calc = new Calculator(previousData, currentData);
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.appendNumber(button.innerText);
      calc.updateDisplay();
    });
  });

  allClearButtons.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
  });

  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.chooseOperation(button.innerText);
      calc.updateDisplay(true);
    });
  });
  equalButtons.addEventListener("click", () => {
    calc.compute();
    calc.updateDisplay();
  });
  deleteButtons.addEventListener("click", () => {
    calc.delete();
    calc.updateDisplay();
  });
})();
