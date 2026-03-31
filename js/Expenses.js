class Expense {
    constructor(parentElement, passedAmount, passedType, passedDescription, passedDate){
        // save parentElement to the object
        this.parentElement = parentElement;

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
        amount.textContent = passedAmount;
        this.div.appendChild(amount);

        // type
        const type = document.createElement('p');
        type.classList.add("type");
        type.textContent = passedType;
        this.div.appendChild(type);

        // description
        const description = document.createElement('p');
        description.classList.add("description");
        description.textContent = passedDescription;
        this.div.appendChild(description);

        // date
        const date = document.createElement('p');
        date.classList.add("date");
        date.textContent = passedDate;
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
        // set up an array variable that will hold the posts 
        
        this.topList = document.createElement("div");
        this.bottomList = document.createElement("div");
        //this.classList.add("expense-list");
        this.topContainer.appendChild(this.topList);
        this.bottomContainer.appendChild(this.bottomList);
        this.topExpenses = [];
        this.bottomExpenses = [];
        this.submitExpense = this.submitExpense.bind(this);

        //document.querySelector("#add-expense").addEventListener("click", this.addExpense);
        document.querySelector(".add-item-popup button[type='submit']").addEventListener("click", this.submitExpense);

        this.loadExpenses();
    }

    async loadExpenses() {
        const response = await fetch('data.json');
        const users = await response.json();

        for(const user of users){
            for(const expense of user.expenses){
                this.createExpense(expense.amount, expense.type, expense.description, expense.date);
            }
        }
    }

    createExpense(amount, type, description, date) {
        const topExpense = new Expense(
            this.topContainer, amount, type, description, date
        );
        this.topExpenses.push(topExpense);
        const bottomExpense = new Expense(
            this.bottomContainer, amount, type, description, date
        );
        this.bottomExpenses.push(bottomExpense);
    }

    submitExpense() {
        const amount = document.querySelector("#amount").value;
        const type = document.querySelector("#type").value;
        const description = document.querySelector("#description").value;
        const date = document.querySelector("#date").value;

        if (!amount || !type || !description || !date){
            alert("Please fill all information");
            return;
        }

        this.createExpense(amount, type, description, date);

        document.querySelector(".add-item-popup").style.display = "none";
    }
    

}

export default App;