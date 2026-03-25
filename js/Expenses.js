class Expense {
    constructor(parentElement){
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
        amount.textContent = "amount";
        this.div.appendChild(amount);

        // type
        const type = document.createElement('p');
        type.classList.add("type");
        type.textContent = "type";
        this.div.appendChild(type);

        // description
        const description = document.createElement('p');
        description.classList.add("description");
        description.textContent = "description";
        this.div.appendChild(description);

        // date
        const date = document.createElement('p');
        date.classList.add("date");
        date.textContent = "date";
        this.div.appendChild(date);
        

        // add the div to the parent element
        this.parentElement.appendChild(this.div);
    }
}

class App {
    constructor(){
        // set up a reference to the post container in the html
        this.container = document.querySelector("#recent-expenses");
        // set up an array variable that will hold the posts 
        
        this.list = document.createElement("div");
        //this.classList.add("expense-list");
        this.container.appendChild(this.list);
        this.expenses = [];
        this.addExpense = this.addExpense.bind(this);

        document.querySelector("#add-expense").addEventListener("click", this.addExpense);
    }

    addExpense(){
        const expense = new Expense(this.list);
        this.expenses.push(expense);
    }

}


export default App;

