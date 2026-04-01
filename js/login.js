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
        /* TODO: See Part 0 of README.md */
        event.preventDefault();
        // make email and password variables
        const email = this.email.value;
        const password = this.password.value;
        //get data
        const response = await fetch('data.json');
        const data = await response.json();
        // look for user
        const user = data.filter(u => u.email === email); 
        // check if password mathces
        if ( (user.length == 1) && (user[0].password === password) ) {
            window.location.href = "home.html";
        } else {
            this.errorDiv.classList.remove('hidden');
        }
    }
}

export default App;