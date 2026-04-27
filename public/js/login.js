class App {
    constructor(){
        /* TODO: See Part 0 of README.md */
        this.email = document.getElementById("email");
        this.password = document.getElementById("password");
        this.errorDiv = document.getElementById("error-message");
        this.loginForm = document.getElementById("login");
        //this.loginForm.addEventListener("submit", this.login);
        this.loginForm.addEventListener("submit", (event) => this.login(event));
    }

    async login(event){
        event.preventDefault();
        // make email and password variables
        const email = this.email.value;
        const password = this.password.value;
        //get data
        const response = await fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        // get the result of the response
        const result = await response.json();

        // if password mathces change to home page otherwise say incorrect username or password
        if(result.success) {
            window.location.href = "home.html";
        } else {
            this.errorDiv.classList.remove('hidden');
        }
    }
}

export default App;
