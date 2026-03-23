document.addEventListener('DOMContentLoaded',() => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = [];
    let totalAmount = calculateTotal();

    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if( name !== "" && !isNaN(amount) && amount >0){
            
        }
    })


    function calculateTotal(){

    }

})