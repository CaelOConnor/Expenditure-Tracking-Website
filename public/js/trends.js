class App {
  constructor() {
    // call setup fuction
    this.setup();
  }

  async setup() {
    // get data
    const response = await fetch("/expenses");
    this.expenses = await response.json();
    console.log(this.expenses);
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
  getMonthySpending(expenses) {
    // get monthly spending from past year and return the data for chart
    const dictionary = {};
    for (const expense of expenses) {
      const month = expense.date.split("/")[0];
      // if that type isnt in dictionary add it and its amount
      if (!dictionary[month]) {
        dictionary[month] = expense.amount;
      } else {
        // otherwise just add amount
        dictionary[month] += expense.amount;
      }
    }
    // turn into array for vega and return it got this from geeks for geeks https://www.geeksforgeeks.org/javascript/convert-dictionary-into-an-array-of-objects-in-javascript/
    return Object.keys(dictionary).map((month) => ({
      month: month,
      amount: dictionary[month],
    }));
  }

  getCategoryData(expenses) {
    // get amount spent for each category and return the data for chart
    const dictionary = {};
    for (const expense of expenses) {
      const type = expense.type;
      // if that type isnt in dictionary add it and its amount
      if (!dictionary[type]) {
        dictionary[type] = expense.amount;
      } else {
        // otherwise just add amount
        dictionary[type] += expense.amount;
      }
    }
    // turn into array for vega and return it got this from geeks for geeks https://www.geeksforgeeks.org/javascript/convert-dictionary-into-an-array-of-objects-in-javascript/
    return Object.keys(dictionary).map((type) => ({
      category: type,
      amount: dictionary[type],
    }));
  }

  getTopExpenses(expenses) {
    // get top 10 expenses and return data for the chart
    // const sorted = expenses.sort(); // change to sort by amount
    const sorted = expenses.sort((a, b) => a.amount - b.amount);
    // cosnt top10 = ;
    const top10 = sorted.slice(0, 10);
    // return
    return top10;
  }

  // render charts with vegalite
  renderLineChart(data) {
    // year to date spending line grpah
    const spec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      background: "#85BB65",
      title: "YTD Spending",
      data: { values: data },
      width: 350,
      height: 400,
      // mark: { type: "line" },
      encoding: {
        x: {
          field: "month",
          type: "ordinal",
          title: "Month",
          axis: {
            labelAngle: 0,
          },
        },
        y: {
          field: "amount",
          type: "quantitative",
          title: "Amount",
        },
        color: { value: "#1a3a1a" },
      },
      layer: [
        {
          mark: "line",
        },
        {
          params: [
            {
              name: "hover",
              select: { type: "point", on: "pointerover", clear: "pointerout" },
            },
          ],
          mark: { type: "circle", tooltip: true },
          encoding: {
            opacity: {
              condition: { test: { param: "hover", empty: false }, value: 1 },
              value: 0,
            },
            size: {
              condition: { test: { param: "hover", empty: false }, value: 48 },
              value: 100,
            },
          },
        },
      ],
    };
    vegaEmbed("#lineChart", spec);
  }

  renderPieChart(data) {
    // pie chart of spending in different categories
    const spec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      background: "#85BB65",
      title: "Spending By Category",
      data: { values: data },
      width: 400,
      height: 400,
      padding: 20,
      // mark: { type: "arc", tooltip: true },
      // encoding: {
      //   theta: { field: "amount", type: "quantitative" },
      //   color: { field: "category", type: "nominal" },
      // },
      params: [
        { name: "select", select: { type: "point", fields: ["category"] } },
      ],
      mark: {
        type: "arc",
        tooltip: true,
        outerRadius: 165,
        stroke: "white",
        strokeWidth: 0.5,
        padAngle: { expr: "select.category == datum.category ? 0.05 : 0" },
        radius: { expr: "select.category == datum.category ? 106: 100" },
        radius2: { expr: "select.category == datum.category ? 3: 0" },
        cornerRadius: { expr: "select.category == datum.category ? 3: 0" },
      },
      encoding: {
        order: { field: "amount", sort: "ascending" },
        theta: { field: "amount", type: "quantitative" },
        fillOpacity: { condition: { param: "select", value: 1 }, value: 0.6 },
        color: {
          field: "category",
          type: "nominal",
        },
      },
    };
    vegaEmbed("#pieChart", spec);
  }

  renderBarChart(data) {
    // bar chart of highest expenses
    const spec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      background: "#85BB65",
      title: "Top 10 Expenses",
      data: { values: data },
      width: 350,
      height: 400,
      mark: { type: "bar", tooltip: true },
      encoding: {
        x: {
          field: "description",
          type: "ordinal",
          sort: { field: "amount", order: "descending" },
          title: "Expenses",
        },
        y: {
          field: "amount",
          type: "quantitative",
          title: "Amount",
        },
        color: { value: "#2c5f2e" },
      },
    };
    vegaEmbed("#barChart", spec);
  }
}

export default App;
