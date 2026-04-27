This README is specifically related to this projects JavaScript files.

The script.js file is a function that handles the login.html page. When a user clicks register and account it the
form on the screen to register and account. From the register account screen if the user hits the login button the 
screen goes back to the sign in form. This fucntion is what swaps the form's content.

The register.js file is a class that takes the input from the register form as paramaters and then calls the
register endpoint from the server to create an account. This endpoint adds the provided as a user object in the 
data.json file.

The login.js file is a class that take the input from the login form as paramaters and then calls the login endpoint
from the server to login to an account. This endpoint takes the email and password and checks to see if they match an 
existing user. If they do match the user is sent to the home page. If they do not match a message saying invalid username or 
password appears on screen.

The Expenses.js file creates has two classes an Expense class which takes the information for an expense and then creates it. 
The other class is an App class which handles the main logic for the webstie. Here functions exist to create, get, edit, delete the expesnes for the user. Some functions connect to the server to interact with the json file such as the submitExpesne function which creates an expense based on the user input from a form then adds this expense to the users expenses in the json file and then
displays this expense on the screen. Other functions do not call the server such as the sorting methods whcih reorder the displayed
expenses based on the button the user clicked.

The Add-expenditure-popup.js file is a class that either shows or hides the popup to create a new expense based on wheather or not
a button is pressed in the home.html file.

The trends.js file is a class that calls the expenses endpoint from the server to retrieve all expenses and then sorts this data
for three different graphs on the site.

The budget.js file is a class that allows the user to set a limit for themselves on monthly spending.