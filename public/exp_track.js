var state = {
    balance: 0,
    income: 0,
    expense: 0,
    transactions: []
}
balanceElement = document.querySelector('#balance');
incomeElement = document.querySelector('#income');
expenseElement = document.querySelector('#expense');
transactionsElement = document.querySelector('#transactions');
incomebtnElement = document.querySelector('#income-btn');
expensebtnElement = document.querySelector('#expense-btn');
textinpElement = document.querySelector("#name");
amountinpElement = document.querySelector("#amount");
updatestate();

function deleteobj(event) {
    var id = event.target.getAttribute('data-id');
    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].id == parseInt(id)) {
            state.transactions.splice(i, 1);
            break;
        }
    }
    updatestate();
}
function uniqueId() {
    return Math.round(Math.random() * 1000000);
}
function add(typeEl) {
    if (textinpElement.value == "" || amountinpElement.value == "") {
        alert("enter valid input");
        return;
    }
    var idEl = parseInt(uniqueId());
    var obj = { id: idEl, name: textinpElement.value, amount: parseInt(amountinpElement.value), type: typeEl };
    state.transactions.push(obj);
    textinpElement.value = "";
    amountinpElement.value = "";
    updatestate();
}

function updatestate() {
    var inc = 0; var exp = 0;
    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].type == "income") inc += state.transactions[i].amount;
        else exp += state.transactions[i].amount;
    }
    state.balance = inc - exp;
    state.income = inc;
    state.expense = exp;
  
    display();
}
function display() {
    balanceElement.innerHTML = `$${state.balance}`;
    incomeElement.innerHTML = `$${state.income}`;
    expenseElement.innerHTML = `$${state.expense}`;
    transactionsElement.innerHTML = "";
    for (var i = 0; i < state.transactions.length; i++) {
        transactionElement = document.createElement('li');
        transactionElement.append(state.transactions[i].name);
        divElement = document.createElement('div');
        amountElement = document.createElement('span');
        if (state.transactions[i].type == "income") {
            amountElement.classList.add("income-amt");
        }
        else amountElement.classList.add("expense-amt");
        amountElement.innerHTML = `$${state.transactions[i].amount}`;
        btnElement = document.createElement('button');
        btnElement.innerHTML = 'x';
        btnElement.setAttribute('data-id', state.transactions[i].id);
        btnElement.addEventListener("click", deleteobj);
        divElement.appendChild(amountElement);
        divElement.appendChild(btnElement);
        transactionElement.appendChild(divElement);
        transactionsElement.appendChild(transactionElement);
    }

}