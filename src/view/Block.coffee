import * as d3 from "d3"

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
    .text((d)->d.data.type)


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
#      when 'station' then StationNode.call(@,d,i,node,template)
      when 'station' then StationCircle.call(@,d,i,node,template)
      when 'car' then CarCircle.call(@,d,i,node,template)
#      when 'car' then CarNode.call(@,d,i,node,template)

# factory for sel.each()
Block = do ->
  tree = d3.tree()
#    .size([250,400])
    .nodeSize([25,150])

  update = (source)->
    console.log('update')
    link = selection.selectAll(".link")
      .data(tree(root).links())
      .exit().remove()



  togglefold = (d) ->
    console.log 'click', d
    return if d3.event.defaultPrevented

    if d.children
      d._children = d.children;
      d.children = null;
    else
      d.children = d._children;
      d._children = null;

  #    update(d)

  (d,i,n) ->
    root = d3.hierarchy(d)
    selection = d3.select(@)
    direction = if d.id % 2 then 1 else -1

    switch (d.id % 4)
      when 0 then tree.nodeSize([20,150])
      when 1 then tree.nodeSize([20,150])
      when 2 then tree.nodeSize([20,200])
      when 3 then tree.nodeSize([20,200])

    link = selection.selectAll(".link")
      .data(tree(root).links())
      .enter().append("path")
      .attr("stroke", "#8284d7")
      .attr("fill", "none")
      .attr("d", (d)-> d3.linkHorizontal().x(direction*d.source.y).y(d.source.x)(d))
      .transition()
      .delay((d)->
        console.log d

        if d.source.parent
          d.target.delay = 2200 + (Math.random() * 7700)
        else
          0
      )
      .duration((d)->
        if d.source.parent
          200
        else
          2000
      )
      .ease(d3.easeQuad)
      .attr("d", d3.linkHorizontal().x((d)-> direction*d.y).y((d)-> d.x));

    node = selection.selectAll(".node")
      .data(root.descendants()).enter()
      .append("g")
      .attr('opacity',(d)-> if d.data.type == 'block' then 1 else 0 )
      .attr("class", (d)-> "node" + (if d.children then " node--internal" else " node--leaf"))
      .attr("transform", (d) ->
        switch d.data.type
          when 'car' then  "translate(" + direction*d.parent.y + "," + d.parent.x + ")"
          else "translate(" + 0 + "," + 0 + ")"

      )
      .each(StationOrCar)
      .on('click', togglefold)
      .transition()
      .delay((d)->
        switch d.data.type
          when 'block' then 0
          when 'station' then 0
          when 'car' then d.delay
      )
      .duration((d)->
        switch d.data.type
          when 'block' then 0
          when 'station' then 2000
          when 'car' then 200
      )
      .attr("transform", (d) -> "translate(" + direction*d.y + "," + d.x + ")" )
      .attr('opacity',1)



export default Block