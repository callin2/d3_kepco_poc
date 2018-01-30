import * as d3 from "d3"
import * as most from "most"
import {periodic} from "most"
import Block from "./view/Block"
import { dummyBlockDataGen } from "./datamodel/DummyData"
import {$countdownFrom , $everyNsec, randomN,  } from "./Util.coffee"
svg = d3.select('svg')

# ------------------------------------

toD3Tree = (dur, interval, lTime=10) ->
  now = d3.now()
  timeRange = dur*1000

  timeScale = d3.scaleTime().domain([now + lTime*1000, now-timeRange]).range([-500,500])
  timeScaleNext = d3.scaleTime().domain([now + interval*1000 + lTime*1000, now-timeRange + interval*1000]).range([-500,500])

  (v)->
    now = d3.now()
    timeScale.domain([now + lTime*1000, now-timeRange])
    timeScaleNext.domain([now + interval*1000 + lTime*1000, now-timeRange + interval*1000])

    blockGrp = svg.selectAll("g.block").data(v,(v)->v.id)

    # exit
    blockGrp.exit().remove()

    # enter
    blockGrpEnter = blockGrp.enter()
      .append('g').attr('class',"block")
      .attr('transform', 'translate(0 -400)')
      .attr('transform', (d)->"translate(0 #{timeScale(d.ts)})")
      .each(Block)

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

animateAxis = (dur, interval, lTime=10)->
  now = d3.now()
  timeRange = dur*1000

  timeScale = d3.scaleTime().domain([now + lTime*1000, now-timeRange]).range([-500,500])
  yAxis = d3.axisLeft(timeScale)

  yaxisG = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  yaxisG.selectAll('path').style('stroke','#8284d7');

  ->
    now = d3.now()
    timeRange = dur*1000

    timeScale.domain([now + interval*1000 + lTime*1000, now-timeRange + interval*1000])

    yaxisG.transition()
      .duration(interval*1000)
      .ease(d3.easeLinear)
      .call(yAxis);
#----------------------------------------------------
blockGenPeriodSec = 10
axisRangeSec = 60
leadTimeSec = 10

$main = most.zip ((a,b)->b), $everyNsec(blockGenPeriodSec), $countdownFrom(100)
  .tap animateAxis(axisRangeSec, blockGenPeriodSec, leadTimeSec)
  .map dummyBlockDataGen
  .tap console.log
  .map toWindowedBlock(blockGenPeriodSec)
  .map toD3Tree(axisRangeSec, blockGenPeriodSec, leadTimeSec)

#-------------------
window.onload = -> $main.observe console.log