import * as most from "most"
import * as d3 from "d3"
import {getProp, getPropAt, $plist} from "../Util.coffee"

BlockCircle = (d,i,node) ->
  selection = d3.select(@)
  selection.append 'circle'
    .attr("r", 0)
    .attr("fill","orange")
    .transition()
    .delay((d,i)->i*30)
    .duration(200)
    .ease(d3.easeBounce)
    .attr("r", 12)

  selection.append 'text'
    .style('stroke', 'white')
    .style('fill', 'white')
#    .attr("x", -8)
    .attr("y", 5)
    .attr('text-anchor','middle')
    .text(-> '\uf1b2' )

StationCircle = (d,i,node,template) ->
  selection = d3.select(@)
  selection.append 'circle'
    .attr("r", 0)
    .attr("fill","#8284d7")
    .transition()
    .delay((d,i)->i*30)
    .duration(200)
    .ease(d3.easeBounce)
    .attr("r", 12)

  selection.append 'text'
    .style('stroke', 'white')
    .style('fill', 'white')
    .attr("y", 5)
    .attr('text-anchor','middle')
    .text(-> '\uf0e7' )

StationNode = (d,i,node,template) ->
  selection = d3.select(@)
  selection.append -> template.cloneNode(true)
  selection.select('.card-title strong')
    .text(getPropAt("data.type"))


CarCircle = (d,i,node) ->

  selection = d3.select(@)
  selection.append 'circle'
    .attr("r", 0)
    .attr("fill","#8284d7")
    .transition()
    .delay((d,i)->i*30)
    .duration(200)
    .ease(d3.easeBounce)
    .attr("r", 12)

  selection.append 'text'
    .style('stroke', 'white')
    .style('fill', 'white')
    .attr("y", 5)
    .attr('text-anchor','middle')
    .text(-> '\uf1b9' )


CarNode = (d,i,node,template) ->
  selection = d3.select(@)
  selection.append -> template.cloneNode(true)


StationOrCar = do ()->
  template = d3.select('#citem').remove().node()

  (d,i,node) ->
    switch d.data.type
      when 'block' then BlockCircle.call(@,d,i,node)
      when 'station' then StationCircle.call(@,d,i,node,template)
      when 'car' then CarCircle.call(@,d,i,node,template)

# factory for sel.each()
ForceBlock = do ->
  return (d,i,n) ->
    root = d3.hierarchy(d)
    selection = d3.select(@)
    direction = if d.id % 2 then 1 else -1

    allNodes = []

    forceLink = d3.forceLink()
      .distance(120)
      .id(getProp('id'));

    forceSim = d3.forceSimulation()
      .force('colide', d3.forceCollide(15))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("link", forceLink)
      .force("x", d3.forceX( 100*direction ))
      .force("y", d3.forceY())
      .alphaTarget(1)

    root.fx = 0
    root.fy = 0

    $plist(root.descendants(), 200).observe (n)->
      allNodes.push n
      forceSim.nodes(allNodes)

    setTimeout(->
      forceLink.links(root.links())
    ,10*1000)

    forceSim.on('tick', ->
      node = selection.selectAll(".node")
        .data(allNodes)

      nodeEnter = node.enter()
        .append("g")
        .attr("class", (d)-> "node" + (if d.children then " node--internal" else " node--leaf"))
        .each(StationOrCar)

      node.merge(nodeEnter)
        .attr("transform", (d) -> "translate(" + d.x + "," + d.y + ")" )


#      node = selection.selectAll(".node")
#        .data(root.descendants()).enter()
#        .append("g")
#        .attr("class", (d)-> "node" + (if d.children then " node--internal" else " node--leaf"))
#        .attr("transform", (d) -> "translate(" + d.x + "," + d.y + ")" )
#        .each(StationOrCar)
#        .attr('opacity',1)
    )


export default ForceBlock