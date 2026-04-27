# Expenditure-Tracking-Website

Expenditure Tracking Website

A website to track spending across different activities

The structure of the projects is as follows:

The html files are the different pages of the website.
The css files are in the css folder each css file corresponds to a html file.
The javascript files are inside of the js folder. 
    The login.js file is for the login page. 
    The Expenses.js is for the homepage which handles loading and adding expenditures. This will also eventually handle sorting.
    The Add-expenditure-popup.js file handles the popup when adding and expenditure.
    The script.js file handles swithing between login and account registration for the login page.
    The register.js file handles account registration for the site.
    The server.js file is the node.js server for the site.
The data.json file currently holds users and their information. This is the file called for logging into the site and loading expenses. A user object in the json is defined by the users email and contains a name field, a password field and an expenses array. Each expense contains fields for the amount, type, description, and date for the expense.

To run the code you can run the command "node server.js" in the terminal inside the project. Then go to localhost:3000/index.html This page is what the base page of the website would be if we hosted it. From here you can hit the login button and use a email and password from any user in the data.json file.