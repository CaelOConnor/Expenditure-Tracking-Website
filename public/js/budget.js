class BudgetManager{
    constructor(){
        // variable to get user info
        this.userEmail = localStorage.getItem("currentUser");
        this.input = document.querySelector("#budgetInput");
        this.container = document.querySelector(".settings-box");
    }
    saveBudget(){
        // get the value entered by the user
        const budget = this.input.value;
        
        //check if budget exist and is greater than 0
        if(!budget || budget<=0){
            alert("Enter valid budget");
            return;
        }
        //save budget per email from localStorage
        localStorage.setItem(this.userEmail + "_budget", budget)
        // display budget
        this.displayBudget();
    }
    getBudget(){
        // gets the saved budget from localStorage
        return localStorage.getItem(this.userEmail + "_budget");
    }
    displayBudget(){
        // get the saved budget
        const savedBudget = this.getBudget();
        //remove old value if exists
        const old = document.querySelector(".currentBudget");
        if (old) old.remove();
        // if budget exist displays the curent budget limit
        if (savedBudget){
            const p = document.createElement("p");
            p.classList.add("currentBudget");
            p.innerText = "Current Budget = $" + savedBudget;
            this.container.appendChild(p);
        }
    }
}

export default BudgetManager;