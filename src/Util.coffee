import * as most from "most"
import {periodic} from "most"
R = require('ramda');

export getProp = R.curry (propName,obj)->obj[propName]

_getPropAt = (obj, propPathArr) ->
  if propPathArr.length == 1
    obj[propPathArr[0]]
  else
    firstProp = propPathArr.shift()
    _getPropAt(obj[firstProp], propPathArr)

export getPropAt = (propPath) -> (obj) ->
  props = propPath.split('.')
  _getPropAt(obj, props)

export randomN = (n)-> Math.floor(Math.random()*n) + 1

export $everyNsec = (n) -> periodic n*1000

delayPromise = ( ms, value) ->
  new Promise (res) =>
    setTimeout =>
      res(value)
    ,ms

countdown = (delay, start) -> yield delayPromise(delay, i) for i in [start..1]
export $countdownFrom = (n) -> most.generate(countdown,1,n)

plist = (list, interval) -> yield delayPromise(interval, li) for li in list
export $plist = (list, interval) -> most.generate(plist, list, interval)
