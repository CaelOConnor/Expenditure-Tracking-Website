class App {
    constructor(expenses){
        // get expenses
        this.expenses = expenses;

        // get data
        const lineChartData = this.getMonthySpending(this.expenses);
        const pieChartData = this.getCategoryData(this.expenses);
        const barChartData = this.getTopExpenses(this.expenses);

        // render charts
        this.renderLineChart(lineChartData);
        this.renderPieChart(pieChartData);
        this.renderBarChart(barChartData);
    }

    // get data for charts
    getMonthySpending(expenses){
        // get monthly spending from past year and return the data for chart
        dictionary = {};
        for(const expense of expenses){
            const month = expense.date; // update this later because of format issues
            // if that type isnt in dictionary add it and its amount
            if ( !dictionary[month]){
                dictionary[month] = expense.amount;
            } else {
                // otherwise just add amount
                dictionary[month] += expense.amount
            }
        }
        return dictionary;
    }

    getCategoryData(expenses){
        // get amount spent for each category and return the data for chart
        dictionary = {};
        for(const expense of expenses){
            const type = expense.type;
            // if that type isnt in dictionary add it and its amount
            if ( !dictionary[type]){
                dictionary[type] = expense.amount;
            } else {
                // otherwise just add amount
                dictionary[type] += expense.amount
            }
        }
        return dictionary;
    }

    getTopExpenses(expenses){
        // get top 10 expenses and return data for the chart
        // const sorted = expenses.sort(); // change to sort by amount
        // cosnt top10 = ;
        // return 
    }


    // render charts with vegalite
    renderLineChart(data){  
        // year to date spending line grpah

    }

    renderPieChart(data){
        // pie chart of spending in different categorires

    }

    renderBarChart(data){
        // bar chart of highest expenses

    }
    
}

export default App;