class Expense {
    constructor(parentElement, passedAmount, passedType, passedDescription, passedDate){
        // save parentElement to the object
        this.parentElement = parentElement;

        // store varaibles
        this.amount = Number(passedAmount);
        this.type = passedType;
        this.description = passedDescription;
        this.date = new Date(passedDate);

        // create the div as an instance variable, give it the class "post"
        this.div = document.createElement("div");
        this.div.classList.add("expenditure");

        // create three dots button
        const btn = document.createElement("button");
        btn.classList.add("expenditure-three-dots-btn");
        btn.textContent = "...";
        this.div.appendChild(btn);

        // amount
        const amount = document.createElement('h2');
        amount.classList.add("amount");
        amount.textContent = `$${this.amount}`;
        this.div.appendChild(amount);

        // type
        const type = document.createElement('p');
        type.classList.add("type");
        type.textContent = this.type;
        this.div.appendChild(type);

        // description
        const description = document.createElement('p');
        description.classList.add("description");
        description.textContent = this.description;
        this.div.appendChild(description);

        // date
        const date = document.createElement('p');
        date.classList.add("date");
        date.textContent = this.date.toLocaleDateString(); // makes date readable
        this.div.appendChild(date);
        
        // add the div to the parent element
        this.parentElement.appendChild(this.div);
    }
}

class App {
    constructor(){
        // set up a reference to the post container in the html
        this.topContainer = document.querySelector("#recent-expenses");
        this.bottomContainer = document.querySelector("#highest-expenses"); 
        
        this.topList = document.createElement("div");
        this.bottomList = document.createElement("div");
        //this.classList.add("expense-list");
        this.topContainer.appendChild(this.topList);
        this.bottomContainer.appendChild(this.bottomList);
        // set up an array variable that will hold the posts
        this.topExpenses = [];
        this.bottomExpenses = [];
        this.submitExpense = this.submitExpense.bind(this);

        document.querySelector("#popup-submit-btn").addEventListener("click", this.submitExpense);

        // sorting based on dropdown
        this.sortDropdown = document.querySelector("#SortBy");
        this.sortExpenses = this.sortExpenses.bind(this);
        this.sortDropdown.addEventListener("change", this.sortExpenses);

        // searching
        this.searchInput = document.querySelector("#search");
        this.searchExpenses = this.searchExpenses.bind(this);
        this.searchInput.addEventListener("input", this.searchExpenses);

        this.loadExpenses();
    }

    async loadExpenses() {
        // get data
        const response = await fetch('/expenses');
        const expenses = await response.json();

        // loop over expenses for the user and create expenses
        for(const expense of expenses){
            this.createExpense(expense.amount, expense.type, expense.description, expense.date);
        }
    }

    createExpense(amount, type, description, date) {
        // create expense for top row
        const topExpense = new Expense(
            this.topContainer, amount, type, description, date
        );
        this.topExpenses.push(topExpense);
        // create expense for bottom row
        const bottomExpense = new Expense(
            this.bottomContainer, amount, type, description, date
        );
        this.bottomExpenses.push(bottomExpense);
    }

    async submitExpense() {
        // get values
        const amount = document.querySelector("#amount").value;
        const type = document.querySelector("#type-selector").value;
        const description = document.querySelector("#description").value;
        const date = document.querySelector("#date").value;

        // make sure every field has info
        if (!amount || !type || !description || !date){
            alert("Please fill all information");
            return;
        }

        // make expense
        const newExpense = {amount, type, description, date};
        // send to server
        const response = await fetch('/createExpense', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newExpense)
        });

        const result = await response.json();

        // if saved then update frontend otherwise alert the error
        if (result.success) {
            //make expense
            this.createExpense(amount, type, description, date);
            //hide popup
            document.querySelector(".add-item-popup").style.display = "none";
        } else {
            alert("Error sending expense to server");
        }

    }

    clearExpenses(expenseArray){
        // remove all expenses
        for(const expense of expenseArray){
            expense.div.remove();
        }
    }
    
    renderExpenses(expenseArray, container){
        // add expenses back
        for(const expense of expenseArray){
            container.appendChild(expense.div);
        }
    }

    sortExpenses(){
        const value = this.sortDropdown.value;

        function sortComparator(expense1, expense2){ // a and b
            if (value === "Most-Recent"){
                return expense2.date - expense1.date;
            } 
            else if (value === "Oldest"){
                return expense1.date - expense2.date;
            }
            else if (value === "Highest-Expenditure"){
                return expense2.amount - expense1.amount; 
            }
            else if (value === "Lowest-Expenditure"){
                return expense1.amount - expense2.amount; 
            }
        }
        // sort
        this.topExpenses.sort(sortComparator);
        this.bottomExpenses.sort(sortComparator);
        // re-render
        this.clearExpenses(this.topExpenses);
        this.renderExpenses(this.topExpenses, this.topContainer);
        this.clearExpenses(this.bottomExpenses);
        this.renderExpenses(this.bottomExpenses, this.bottomContainer);
    }

    searchExpenses(){
        const search = this.searchInput.value.toLowerCase();
        //filter for top
        const top = this.topExpenses.filter(expense =>
            expense.amount.toString().includes(search) ||
            expense.type.toLowerCase().includes(search) ||
            expense.description.toLowerCase().includes(search) ||
            expense.date.toLocaleDateString().includes(search) 
        );
        // filter for bottom
        const bottom = this.bottomExpenses.filter(expense =>
            expense.amount.toString().includes(search) ||
            expense.type.toLowerCase().includes(search) ||
            expense.description.toLowerCase().includes(search) ||
            expense.date.toLocaleDateString().includes(search)
        );
        //render
        this.clearExpenses(this.topExpenses);
        this.renderExpenses(top, this.topContainer);
        this.clearExpenses(this.bottomExpenses);
        this.renderExpenses(bottom, this.bottomContainer);
    }

}

export default App;