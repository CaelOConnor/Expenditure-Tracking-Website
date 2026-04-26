class RegisterApp {
    constructor(){
        this.name = document.getElementById("register-name");
        this.email = document.getElementById("register-email");
        this.password = document.getElementById("register-password");
        this.registerForm = document.getElementById("registration-form");
        this.registerForm.addEventListener("submit", (event) => this.register(event));
    }

    async register(event){
        event.preventDefault();
        // make email and password variables
        const name = this.name.value;
        const email = this.email.value;
        const password = this.password.value;
        //get data
        const response = await fetch('/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        });

        // get the result of the response
        const result = await response.json();

        // if created send them to home page otherwise alert
        if(result.success) {
            window.location.href = "home.html";
        } else {
            alert("Registration failed: Email already exists")
        }
    }
}

export default RegisterApp;