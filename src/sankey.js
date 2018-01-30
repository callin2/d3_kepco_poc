(function(global){
    console.log('global', global)



    global['drawsankey'] = function(parentNodeSelector) {
        // var svg = d3.select(parentNodeSelector).append("svg"),

        var sankeyData = [
            {source: '화력', target: 'tSTA0001', value: 20},
            {source: '화력', target: 'tSTA0002', value: 30},
            {source: '화력', target: 'tSTA0003', value: 20},
            {source: '화력', target: 'tSTA0004', value: 20},
            {source: '수력', target: 'tSTA0005', value: 10},
            {source: '수력', target: 'tSTA0006', value: 20},
            {source: '원자력', target: 'tSTA0007', value: 40},
            {source: '원자력', target: 'tSTA0008', value: 50},
            {source: '원자력', target: 'tSTA0009', value: 20},
            {source: '원자력', target: 'tSTA00010', value: 20},
            {source: '원자력', target: 'tSTA00011', value: 10},
            {source: '풍력', target: 'tSTA00012', value: 20},
            {source: '지열', target: 'tSTA00013', value: 30},
            {source: '화력', target: 'tSTA00014', value: 40},
            {source: '태양광', target: 'tSTA00015', value: 20},

            {source: 'tSTA00015', target: '닛산', value: 5},
            {source: 'tSTA00015', target: '현대', value: 4},
            {source: 'tSTA00015', target: '기아', value: 7},
            {source: 'tSTA00015', target: '테슬라', value: 3},

            {source: 'tSTA00014', target: '닛산', value: 2},
            {source: 'tSTA00014', target: '현대', value: 8},
            {source: 'tSTA00014', target: '기아', value: 1},
            {source: 'tSTA00014', target: '테슬라', value: 12},

            {source: 'tSTA00013', target: '닛산', value: 3},
            {source: 'tSTA00013', target: '현대', value: 9},
            {source: 'tSTA00013', target: '기아', value: 8},
            {source: 'tSTA00013', target: '테슬라', value: 14},

            {source: 'tSTA00012', target: '닛산', value: 10},
            {source: 'tSTA00012', target: '현대', value: 5},
            {source: 'tSTA00012', target: '기아', value: 5},
            {source: 'tSTA00012', target: '테슬라', value: 2},

            {source: 'tSTA00011', target: '닛산', value: 5},
            {source: 'tSTA00011', target: '현대', value: 3},
            {source: 'tSTA00011', target: '기아', value: 8},
            {source: 'tSTA00011', target: '테슬라', value: 9},

            {source: 'tSTA00010', target: '닛산', value: 3},
            {source: 'tSTA00010', target: '현대', value: 8},
            {source: 'tSTA00010', target: '기아', value: 6},
            {source: 'tSTA00010', target: '테슬라', value: 8},

            {source: 'tSTA0009', target: '닛산', value: 2},
            {source: 'tSTA0009', target: '현대', value: 2},
            {source: 'tSTA0009', target: '기아', value: 2},
            {source: 'tSTA0009', target: '테슬라', value: 2},

            {source: 'tSTA0008', target: '닛산', value: 3},
            {source: 'tSTA0008', target: '현대', value: 4},
            {source: 'tSTA0008', target: '기아', value: 3},
            {source: 'tSTA0008', target: '테슬라', value: 4},

            {source: 'tSTA0007', target: '닛산', value: 6},
            {source: 'tSTA0007', target: '현대', value: 7},
            {source: 'tSTA0007', target: '기아', value: 2},
            {source: 'tSTA0007', target: '테슬라', value: 3},

            {source: 'tSTA0006', target: '닛산', value: 1},
            {source: 'tSTA0006', target: '현대', value: 2},
            {source: 'tSTA0006', target: '기아', value: 3},
            {source: 'tSTA0006', target: '테슬라', value: 4},

            {source: 'tSTA0005', target: '닛산', value: 7},
            {source: 'tSTA0005', target: '현대', value: 6},
            {source: 'tSTA0005', target: '기아', value: 5},
            {source: 'tSTA0005', target: '테슬라', value: 4},

            {source: 'tSTA0004', target: '닛산', value: 9},
            {source: 'tSTA0004', target: '현대', value: 1},
            {source: 'tSTA0004', target: '기아', value: 2},
            {source: 'tSTA0004', target: '테슬라', value: 8},

            {source: 'tSTA0003', target: '닛산', value: 2},
            {source: 'tSTA0003', target: '현대', value: 4},
            {source: 'tSTA0003', target: '기아', value: 4},
            {source: 'tSTA0003', target: '테슬라', value: 2},

            {source: 'tSTA0002', target: '닛산', value: 5},
            {source: 'tSTA0002', target: '현대', value: 5},
            {source: 'tSTA0002', target: '기아', value: 5},
            {source: 'tSTA0002', target: '테슬라', value: 2},

            {source: 'tSTA0001', target: '닛산', value: 2},
            {source: 'tSTA0001', target: '현대', value: 2},
            {source: 'tSTA0001', target: '기아', value: 2},
            {source: 'tSTA0001', target: '테슬라', value: 10}
        ]

        var formatNumber = d3.format(",.0f"),
            format = function(d) { return formatNumber(d) + " TWh"; },
            color = d3.scaleOrdinal(d3.schemeCategory10);

        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var sankey = d3.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);

        var link = svg.append("g")
            .attr("class", "links")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .selectAll("path");

        var node = svg.append("g")
            .attr("class", "nodes")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g");



        //set up graph in same style as original example but empty
        var graph = {"nodes" : [], "links" : []};

        sankeyData.forEach(function (d) {
            graph.nodes[d.source] = true;
            graph.nodes[d.target] = true;
            graph.links.push({ "source": d.source,
                "target": d.target,
                "value": +d.value });
        });

        graph.nodes = Object.keys(graph.nodes)//.map((v)=>{name:v})

        // loop through each link replacing the text with its index from node
        graph.links.forEach(function (d, i) {
            graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
            graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        });

        //now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        graph.nodes.forEach(function (d, i) {
            graph.nodes[i] = { "name": d };
        });


        console.log('graph',graph)

        sankey(graph);

        link = link
            .data(graph.links)
            .enter().append("path")
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("stroke-width", function(d) { return Math.max(1, d.width); });

        link.append("title")
            .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

        node = node
            .data(graph.nodes)
            .enter().append("g");

        node.append("rect")
            .attr("x", function(d) { return d.x0; })
            .attr("y", function(d) { return d.y0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
            .attr("stroke", "#000");

        node.append("text")
            .attr("x", function(d) { return d.x0 - 6; })
            .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .text(function(d) { return d.name; })
            .filter(function(d) { return d.x0 < width / 2; })
            .attr("x", function(d) { return d.x1 + 6; })
            .attr("text-anchor", "start");

        node.append("title")
            .text(function(d) { return d.name + "\n" + format(d.value); });


    }
})(window);

