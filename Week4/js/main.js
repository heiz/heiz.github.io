      var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1y59MYoTH_Nq5nDgN_Lia56f7HaKCKAXHdV_nnsFHMWg/edit#gid=1599197251?usp=sharing';

      function init() {
        Tabletop.init( { key: publicSpreadsheetUrl,
                         callback: showInfo,
                         simpleSheet: true } )

      }


      function showInfo(data, tabletop) {
        //alert('Successfully processed!')
        //console.log(data);

       var datarow = data.map(function(data){
          var obj = {};
          obj = [data.TopTag, Number(data.TopQuestionCount)];
          console.log(obj);
          return obj;
       })
        
        drawChart(datarow);

      }


      window.addEventListener('DOMContentLoaded', init)     


      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);
      
      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.

      function drawChart(datarow) {
         var x = [["javascript", 1928377], ["java", 1624004], ["c#", 1372312], ["php", 1325747], ["python", 1322595], ["android", 1243649],["jquery", 973813],["html", 960130],["c++", 649954],["css", 642712]];
      
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Language');
        data.addColumn('number', 'Questions Count');
        data.addRows(datarow);
        console.log(typeof x);
        console.log(x);
        console.log(typeof datarow);
        console.log(datarow);

        // Set chart options
        var options = {'title':'Top 10 Popular Questions asked on StackOverFlow',
                       'width':800,
                       'height':700,
                       'bar': {groupWidth: '95%'},
                      'vAxis': { gridlines: { count: 4 } }
                     };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

