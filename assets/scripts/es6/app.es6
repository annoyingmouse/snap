const resolution = 20
const chart_width = 30 * resolution
const chart_height = 20 * resolution
const r = (resolution / 2) + (resolution / 4)

const svg = d3.select("#chart")
    .append("svg")
    .attrs({
        "width": chart_width,
        "height": chart_height
    })

svg.selectAll(".vertical")
    .data(d3.range(1, chart_width / resolution))
    .enter()
    .append("line")
    .attrs({
        "class": "vertical",
        "x1": d => d * resolution,
        "y1": 0,
        "x2": d => d * resolution,
        "y2": chart_height
    })

svg.selectAll(".horizontal")
    .data(d3.range(1, chart_height / resolution))
    .enter()
    .append("line")
    .attrs({
        "class": "horizontal",
        "x1": 0,
        "y1": d => d * resolution,
        "x2": chart_width,
        "y2": d => d * resolution
    })

const points = d3.range(10).map(() => ({
    "x": resolution * Math.round((Math.random() * chart_width) / resolution),
    "y": resolution * Math.round((Math.random() * chart_height) / resolution)
}))

svg.selectAll('circle')
    .data(points)
    .enter()
    .append('circle')
    .attrs({
        'cx': d => d.x,
        'cy': d => d.y,
        'r': r
    })
    .call(d3.drag()
        .on("start", (d, i, a) => d3.select(a[i]).raise().classed("active", true))
        .on("drag", (d, i, a) => {
            d3.select(a[i])
                .attrs({
                    'cx': d.x = resolution * Math.round(Math.max(r, Math.min(chart_width - r, d3.event.x)) / resolution),
                    'cy': d.y = resolution * Math.round(Math.max(r, Math.min(chart_height - r, d3.event.y)) / resolution)
                });
        })
        .on("end", (d, i, a) => d3.select(a[i]).classed("active", false))
    )