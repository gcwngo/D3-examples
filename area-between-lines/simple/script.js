  var width = 500;
  var height = 500;


  var data = [

  {
    x:[268, 293, 251, 287, 265, 269, 253, 251, 253, 260],
    y:[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  },
  {
    x:[232, 207, 249, 213, 235, 231, 247, 249, 247, 240],
    y:[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  }
  ];
  
    var yscale = d3.scale.linear()
                  .range([height, 0])
                  .domain([0,10]);
                  
                  
    var svg = d3.select("#chart").append('svg').style('width', width).style('height', height)
                .append('g');    

    var indexies = d3.range( data[0].x.length );

    var area = d3.svg.area()
                      .interpolate("cardinal")
                      .x0( function(d) { return data[1].x[d] } )
                      .x1( function(d) { return data[0].x[d] } )
                      .y0( function(d) { return yscale(data[1].y[d]) } )
                      .y1(  function(d) { return yscale(data[1].y[d]) } );
                      
		svg.append('path')
      .datum(indexies)
      .attr('class', 'area')
      .attr('fill', 'lightsteelblue')
      .attr('d', area);


    var line = d3.svg.line()
                  .interpolate("cardinal")
                  .x(function(d,i){return  d[0]})
                  .y(function(d){return yscale(d[1])});


    var lines = svg.selectAll(".lines")
                    .data(data.map(function(d) {return d3.zip(d.x, d.y);}))
                    .enter().append("g")
                    .attr('class', "lines")
    lines.append('path')
          .attr('class', 'pathline')
          .attr('stroke', 'black')
          .attr("fill", "none")
          .attr('d', function(d){return line(d)})