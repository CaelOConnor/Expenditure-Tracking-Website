class BudgetManager{
    constructor(){
        this.userEmail = localStorage.getItem("currentUser");
        this.input = document.querySelector("#budgetInput");
        this.container = document.querySelector(".settings-box");
    }
    saveBudget(){
        const budget = this.input.value;
    
        if(!budget || budget<=0){
            alert("Enter valid budget");
            return;
        }
        //save budget per email
        localStorage.setItem(this.userEmail + "_budget", budget)
        this.displayBudget();
    }
    getBudget(){
        return localStorage.getItem(this.userEmail + "_budget");
    }
    displayBudget(){
        const savedBudget = this.getBudget();
        //remove old value if exists
        const old = document.querySelector(".currentBudget");
        if (old) old.remove();

        if (savedBudget){
            const p = document.createElement("p");
            p.classList.add("currentBudget");
            p.innerText = "Current Budget = $" + savedBudget;
            this.container.appendChild(p);
        }
    }
}

export default BudgetManager;