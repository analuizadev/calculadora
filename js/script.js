const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttonEvent = document.querySelectorAll('#buttons-container button');

class calculator{
    constructor(previousOperationText, currentOperationText) { //constructor para diferenciar
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""; //o usuário está digitando no momento
    }

    //add digit to caculator screen
    addDigit(digit){

        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen(); //atualizar a tela
    }

    //process all calculator operations
    processOperation(operation){
        //check if current is emmpty
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText.innerText !== ""){
                //change operation
                this.changeOperation(operation);  
            }
            return;
        }
    
        //get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processCeOperator();
                break;
            case "C":
                this.processCOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        } //vai verificar a operação
        
    };

    //change values of the caculator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation; //oq digitar na calculadora (current.Operation) estará sendo add a operação atual (currentOperationText)
        } else {
            //check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""; 
        }
    }

    //change math operation
    changeOperation(operation){

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1) //slice (0) vai apagar o digito, o -1 significa que é um digito
    }

    //Delete all current operation
    processCeOperator(){
        this.currentOperationText.innerText = "";
    }

    //Delete all operation
    processCOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator() {

        const operation = previousOperationText.innerText.split(" ")[1]; //o 1 representa a operação

        this.processOperation(operation);
    }

}; //lógica de aplicação

const calc = new calculator(previousOperationText, currentOperationText);

buttonEvent.forEach((btn) => {
    btn.addEventListener('click', (e) =>{

        const value = e.target.innerText;

        //mapeamento para entender se o usuário está clicando em um num ou uma operação
        if(+value >= 0 || value === ".") { //+value para o JS entender com numérico
            calc.addDigit(value);
        } else{
            calc.processOperation(value);
        }
    });
}); //eventos dos botões