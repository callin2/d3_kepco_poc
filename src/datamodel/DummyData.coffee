import * as d3 from "d3"
import * as faker  from 'faker'
import { randomN } from '../Util'

faker.locale = "ko";

# --------- dummy data gen ---------
export dummyCarDataGen = (v) ->
  ({type:'car', id:"car_#{idx}" , depth:2 } for idx in [0..randomN(5)])
export dummyStationDataGen = (v) -> ({
    type:'station',
    id: "st_#{idx}",
    depth:1,
    children: dummyCarDataGen("st_#{idx}")
  } for idx in [0..randomN(3)])

export dummyBlockDataGen = (v) -> {
  type:'block',
  id: v,
  depth:0,
  ts:d3.now(),
  totalElectricPower : faker.random.number()
  totalTradeAmount : faker.random.number()
  children: dummyStationDataGen(v)
}
# ----------------------------------