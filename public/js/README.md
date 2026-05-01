This README is specifically related to this projects JavaScript files.

The server.js file handles the backend for the expense tracker. It sets up the endpoints for all the API requests in the other JS files and also writes to the data.json file for any changes that occur in the backend like whenever there is a new registered user or deletion of an expense.

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
expenses based on the button the user clicked. When the home page loads the app class is initialized and a get request is sent to the server to load all the expenses on the screen. From here if the user clicks the add button a call for the popup is made. If the user hits cancel the pop up goes away. If they fill out all the information in the popup a call is made to create an expense in the server. This adds the expesnse to the data.json file and creates a new expense in the expeses list in the front end and calls the load expenses function to display the expenses. The user can also tpye in the seach bar which filters the expenses array for expenses with the text in the serach bar and re-renders the screen based on the filtered data. The user can also click on the sort dropdown which based on the clicked sort will sort the expenses on the page. The user can also click on the trends button which brings them to the trends page. The user can click on the delete button in an expense. When the button is clicked it calls the delete function for that expense. This function deletes that expense form the expenses array and calls the server to delete that expesne from the users expenses in the data.json file.

The Add-expenditure-popup.js file is a class that either shows or hides the popup to create a new expense based on wheather or not
a button is pressed in the home.html file. If the user hits cancel no call is made and the popup goes away. If the user only inputs some or no information and trys to save an alert appears telling the user all information must be provided. If all information is provided the call to the create expense endpoint is made.

The trends.js file is a class that calls the expenses endpoint from the server to retrieve all expenses and then sorts this data
for three different graphs on the site. When the trends page is loaded the app class is initialized and a get request is sent to the server to load all the expenses. From here the information is passed into functions to sort the relvent information for each graph. Then each graph is displayed.

The budget.js file is a class that allows the user to set a limit for themselves on monthly spending. Also, it has functions like get, save and display budget that are called and used for Expense.js when user exceeds the budget limit so it can alert them.
