var news;
var w_ratio = 15;
var h_ratio = 20;

window.addEventListener('resize', function(){
  adapt();
}, true);

function adapt() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  d3.select(".site-container")
                    .attr("width", w)
                    .attr("height", h);

  d3.selectAll(".article-image")
            .style("width", (w/w_ratio) - 2 + "px")
            .style("height", (w/h_ratio) - 2 + "px")
              .style("top", function(d, i) {
                return getTop(i) + "px";
              })
              .style("left", function(d, i) {
                return getLeft(i) + "px";
              });
}

function getTop(i) {

  var w = window.innerWidth;
  var tile_height = w/h_ratio;

  if (i < 10)
    return 0 * tile_height;
  else if (i < 20) {
    return 1 * tile_height;
  }
  else if (i < 30) {
    return 2 * tile_height;
  }
  else if (i < 40) {
    return 3 * tile_height;
  }
  else if (i < 50) {
    return 4 * tile_height;
  }
  else if (i < 60) {
    return 5 * tile_height;
  }
  else if (i < 70) {
    return 6 * tile_height;
  }
  else if (i < 80) {
    return 7 * tile_height;
  }
  else if (i < 90) {
    return 8 * tile_height;
  }
  else {
    return 9 * tile_height;
  }
}


function getLeft(i) {

  var w = window.innerWidth;
  var tile_width = w/w_ratio;

  return (i % 10) * tile_width;

}

function getListLocation() {
  var w = window.innerWidth;
  var tile_width = w/w_ratio;

  return (10) * tile_width + 10;
}

function getNews() {


  var url = 'http://newsapi.org/v2/everything?' +
            'q=climate change&' +
            'pageSize=100&' +
            'apiKey=810bc4fe4b3647a9b4490cee1793528c';
  var req = new Request(url);
  fetch(req)
      .then(response => response.json())
      .then((json) => {
        console.log("This is json ", json);
        news = json;

        //for (var i = 0; i < news.totalResults; i++) {}

      var w = window.innerWidth;
      var h = window.innerHeight;
  
      var body = d3.select(".site-container")
                    .attr("width", w)
                    .attr("height", h);

      var new_rows = [10, 20, 30, 40, 50, 60, 70, 80, 90]

      var divs = body.selectAll("articles")
          .data(news.articles)
          .enter()
          .append("a")
            .attr("class", "article-image")
            .attr("href", function(d) {
              return d.url;
            })
            .attr("target", "_blank")
            .style("width", (w/w_ratio) - 2 + "px")
            .style("height", (w/h_ratio) - 2 + "px")
            .style("top", function(d, i) {
              return getTop(i) + "px";
            })
            .style("left", function(d, i) {
              return getLeft(i) + "px";
            })
            .style("margin", "1px")
            .style("background-image", function(d) {
              var value = "url(" + d.urlToImage + ")";

              return value;
            })
            .on('mouseover', function(d) {
                /*
                d3.select(this)
                  .html(d.title)
                  .style("background", "lightgrey");
                  */

                //var hover_tile = d3.select(this);

                //hover_tile.select('div')
                  //.style('display', 'block');

                var title = d.title;
                var hover_tile_index = 0;

                d3.selectAll(".article-list-elements")
                  //.transition()
                  //.duration(1000)
                  .style("font-size", function(b, i) {
                    if (b.title === title) {
                      return "20px";
                    }
                    else {
                      return "4px";
                    }
                  })

            })
            .on('mouseout', function(d) {
              ///var hover_tile = d3.select(this);

                ///hover_tile.select('div')
                  //.style('display', 'none');

                var title = d.title;
                var hover_tile_index = 0;

                d3.selectAll(".article-list-elements")
                  //.transition()
                  //.duration(1000)
                  .style("font-size", function(b, i) {
                    if (b.title === title) {
                      return "4px";
                    }
                    else {
                      return "4px";
                    }
                  })
            });

        d3.select("#article-list")
          .style("left", function(d) {
            return getListLocation() + "px";
          })
          .selectAll("article-list-elements")
            .data(news.articles)
            .enter()
            .append("li")
            .html(function(d) {
              return d.title;
            })
            .attr("class", "article-list-elements")
            .style("font-size", "4px")
            .style("margin-bottom", "0px")
            .on("mouseover", function(d) {

              var above = this.previousElementSibling;
              var below = this.nextElementSibling;

              d3.select(this)
                //.transition()
                //.duration(1000)
                .style("font-size", "20px");

              d3.select(above)
                //.transition()
                //.duration(1000)
                .style("font-size", "15px");


              d3.select(below)
                //.transition()
                //.duration(1000)
                .style("font-size", "15px");

            })
            .on("mouseout", function(d) {

              var above = this.previousElementSibling;
              var below = this.nextElementSibling;

              d3.select(this)
                //.transition()
                //.duration(1500)
                .style("font-size", "4px");


              d3.select(above)
                //.transition()
                //.duration(1500)
                .style("font-size", "4px");


              d3.select(below)
                //.transition()
                //.duration(1500)
                .style("font-size", "4px");

            });


        var info_panels = divs.append("div")
                            .style("width", (w/w_ratio) - 2 + "px")
                            .style("height", (w/h_ratio) - 2 + "px")
                            .style("background-color", "white")
                            .style('display', 'none')
                            .style('opacity', .9)
                            .html(function(d) {
                              console.log(d);
                              return d.title;
                            });
            

      })
}
