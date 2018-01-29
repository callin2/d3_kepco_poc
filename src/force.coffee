import * as d3 from "d3"
import * as most from "most"
import {periodic} from "most"
import ForceBlock from "./view/ForceBlock"
import {$countdownFrom , $everyNsec, randomN,  } from "./Util.coffee"

svg = d3.select('svg')

# --------- dummy data gen ---------
dummyCarDataGen = (v) ->
  ({type:'car', id:"car_#{idx}" , depth:2 } for idx in [0..randomN(5)])
dummyStationDataGen = (v) ->
  ({type:'station', id: "st_#{idx}", depth:1, children: dummyCarDataGen("st_#{idx}")} for idx in [0..randomN(3)])
dummyBlockDataGen = (v) -> {type:'block', id: v, depth:0, ts:d3.now(), children: dummyStationDataGen(v)}
# ------------------------------------

toD3Tree = (dur, interval) ->
  now = d3.now()
  timeRange = dur*1000

  timeScale = d3.scaleTime().domain([now, now-timeRange]).range([-500,500])
  timeScaleNext = d3.scaleTime().domain([now + interval*1000, now-timeRange + interval*1000]).range([-500,500])

  (v)->
    now = d3.now()
    timeScale.domain([now, now-timeRange])
    timeScaleNext.domain([now + interval*1000, now-timeRange + interval*1000])

    blockGrp = svg.selectAll("g.block").data(v,(v)->v.id)

    # exit
    blockGrp.exit().remove()

    # enter
    blockGrpEnter = blockGrp.enter()
      .append('g').attr('class',"block")
      .attr('transform', 'translate(0 -400)')
      .attr('transform', (d)->"translate(0 #{timeScale(d.ts)})")
      .each(ForceBlock)

    # update
    blockGrp.merge(blockGrpEnter)
      .transition()
      .duration(interval*1000)
      .ease(d3.easeLinear)
      .attr('transform', (d)->"translate(0 #{timeScaleNext(d.ts)})")

toWindowedBlock = (windowsSize) ->
  blocklist = []
  (v) ->
    blocklist.push v
    blocklist.shift() if blocklist.length > windowsSize
    blocklist

animateAxis = (dur, interval)->
  now = d3.now()
  timeRange = dur*1000

  timeScale = d3.scaleTime().domain([now, now-timeRange]).range([-500,500])
  yAxis = d3.axisLeft(timeScale)

  yaxisG = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  yaxisG.selectAll('path').style('stroke','#8284d7');

  ->
    now = d3.now()
    timeRange = dur*1000

    timeScale.domain([now + interval*1000, now-timeRange + interval*1000])

    yaxisG.transition()
      .duration(interval*1000)
      .ease(d3.easeLinear)
      .call(yAxis);
#----------------------------------------------------

$main = most.zip ((a,b)->b), $everyNsec(5), $countdownFrom(100)
  .tap animateAxis(20, 5)
  .map dummyBlockDataGen
  .map toWindowedBlock(5)
  .map toD3Tree(20, 5)

#-------------------
window.onload = -> $main.observe console.log