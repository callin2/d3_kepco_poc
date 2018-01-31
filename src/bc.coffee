import * as d3 from "d3"
import Viva from "vivagraphjs"
import { $countdownFrom , $everyNsec, randomN } from "./Util.coffee"
import { dummyBlockDataGen } from "./datamodel/DummyData"
import * as most from "most"



appender = (graph) ->
  prevRoot = null

  (data)->
    root = d3.hierarchy(data)
    nodes = root.descendants()
    links = root.links()

    for n in nodes
      console.log n
      graph.addNode(n.data.id)

    for l in links
      console.log l
      graph.addLink(l.source.data.id, l.target.data.id)


    if prevRoot
      graph.addLink(root.data.id, prevRoot.data.id)

    prevRoot = root


window.onload = ->
  graph = Viva.Graph.graph();
#  graph.addLink(1, 2);

  graphics = Viva.Graph.View.webglGraphics()
  renderer = Viva.Graph.View.renderer(graph,{graphics});

  renderer.run();



  $main = most.zip ((a,b)->b), $everyNsec(5), $countdownFrom(100)
    .map dummyBlockDataGen
    .tap appender(graph)
    .observe console.log