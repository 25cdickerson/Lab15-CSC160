import * as d3 from "d3";
import { interpolateBlues } from "d3";

var employeePromise = d3.csv("data/CompanyData.csv");

var drawTable = function (employees) {
  var table = d3
    .select("tbody")
    .selectAll("tr")
    .data(employees)
    .enter()
    .append("tr")
    .classed("bodyRows", true)
    .style("background-color", function (employee) {
      if (employee.Area === "Production") {
        return "green";
      } else if (employee.Area === "Janitorial") {
        return "blue";
      } else if (employee.Area === "Management") {
        return "red";
      } else if (employee.Area === "Executive") {
        return "yellow";
      }
    });

  table.append("td").text(function (employee) {
    return employee.id;
  });

  table.append("td").text(function (employee) {
    return employee.gender;
  });

  table.append("td").text(function (employee) {
    return employee.Area;
  });

  table.append("td").text(function (employee) {
    return employee.salary;
  });

  table.append("td").text(function (employee) {
    return employee.education;
  });

  table.append("td").text(function (employee) {
    return employee.age;
  });

  table.append("td").text(function (employee) {
    return employee.Senority;
  });
};

var clearTable = function () {
  d3.selectAll(".bodyRows").remove();
};

var successFCN = function (companyData) {
  console.log(companyData);

  drawTable(companyData);

  d3.select(".salaryh").on("click", function () {
    companyData.sort(function (a, b) {
      if (a.salary == b.salary) {
        return 0;
      } else if (a.salary > b.salary) {
        return 1;
      } else {
        return -1;
      }
    });
    clearTable();
    drawTable(companyData);
  });

  d3.select(".reset").on("click", function () {
    clearTable();
    drawTable(companyData);
  });

  d3.select(".b").on("click", function () {
    var filtered = companyData.filter(function (employee) {
      if (employee.education === "Bachelor") {
        return true;
      } else {
        return false;
      }
    });
    clearTable();
    drawTable(filtered);
  });
};

var failFCN = function (fail) {
  console.log(fail);
};

employeePromise.then(successFCN, failFCN);
