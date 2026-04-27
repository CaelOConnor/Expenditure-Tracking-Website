class App {
  constructor() {
    this.email = document.getElementById("email");
    this.password = document.getElementById("password");
    this.errorDiv = document.getElementById("error-message");
    this.loginForm = document.getElementById("login");
    //this.loginForm.addEventListener("submit", this.login);
    this.loginForm.addEventListener("submit", (event) => this.login(event));
  }

  async login(event) {
    event.preventDefault();
    // make email and password variables
    const email = this.email.value;
    const password = this.password.value;
    //get data
    const response = await fetch("data.json");
    const data = await response.json();
    // look for user
    const user = data[email];
    // check if password mathces
    if (user && user.password === password) {
      window.location.href = "home.html";
    } else {
      this.errorDiv.classList.remove("hidden");
    }
  }
}

export default App;
