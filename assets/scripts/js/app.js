"use strict";

var resolution = 20;
var chart_width = 30 * resolution;
var chart_height = 20 * resolution;
var r = resolution / 2 + resolution / 4;

var svg = d3.select("#chart").append("svg").attrs({
    "width": chart_width,
    "height": chart_height
});

svg.selectAll(".vertical").data(d3.range(1, chart_width / resolution)).enter().append("line").attrs({
    "class": "vertical",
    "x1": function x1(d) {
        return d * resolution;
    },
    "y1": 0,
    "x2": function x2(d) {
        return d * resolution;
    },
    "y2": chart_height
});

svg.selectAll(".horizontal").data(d3.range(1, chart_height / resolution)).enter().append("line").attrs({
    "class": "horizontal",
    "x1": 0,
    "y1": function y1(d) {
        return d * resolution;
    },
    "x2": chart_width,
    "y2": function y2(d) {
        return d * resolution;
    }
});

var points = d3.range(10).map(function () {
    return {
        "x": resolution * Math.round(Math.random() * chart_width / resolution),
        "y": resolution * Math.round(Math.random() * chart_height / resolution)
    };
});

svg.selectAll('circle').data(points).enter().append('circle').attrs({
    'cx': function cx(d) {
        return d.x;
    },
    'cy': function cy(d) {
        return d.y;
    },
    'r': r
}).call(d3.drag().on("start", function (d, i, a) {
    return d3.select(a[i]).raise().classed("active", true);
}).on("drag", function (d, i, a) {
    var x = d3.event.x;
    var y = d3.event.y;
    var gridX = resolution * Math.round(Math.max(r, Math.min(chart_width - r, x)) / resolution);
    var gridY = resolution * Math.round(Math.max(r, Math.min(chart_height - r, y)) / resolution);
    d3.select(a[i]).attr('cx', d.x = gridX).attr('cy', d.y = gridY);
}).on("end", function (d, i, a) {
    return d3.select(a[i]).classed("active", false);
}));