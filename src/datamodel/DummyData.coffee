import * as d3 from "d3"
import * as faker  from 'faker'
import { randomN } from '../Util'

faker.locale = "ko";

stations = [
  {"ECHARE_STATION_ID":"tSTA0001", "addr":"전라남도 나주시 빛가람로 719 ", "name": "빛가람동주민센터", "chargerType": "AC완속", "ESTATION_LOC_LATITUDE":34.995541,"ESTATION_LOC_LONGITUDE":126.708152,"NUM_ECHARGER":1,"PEER_TYPE":"aggrePeer","ESTATION_OPEN_TYPE":0,"COMMWITH":["tSTA0005","tSTA0010","tSTA0014"]},
  {"ECHARE_STATION_ID":"tSTA0002", "addr":"전라남도 나주시 토계길 61 ", "name": "송월동주민센터", "chargerType": "AC완속", "ESTATION_LOC_LATITUDE":34.995793,"ESTATION_LOC_LONGITUDE":126.720037,"NUM_ECHARGER":2,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":1,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0003", "addr":"전라남도 나주시 성북2길 6 ", "name": "성북동주민센터", "chargerType": "AC완속", "ESTATION_LOC_LATITUDE":35.025341,"ESTATION_LOC_LONGITUDE":126.713062,"NUM_ECHARGER":3,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":2,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0004", "addr":"전라남도 나주시 영산포로182-7 ", "name": "이창동주민센터", "chargerType": "AC완속", "ESTATION_LOC_LATITUDE":35.028351,"ESTATION_LOC_LONGITUDE":126.714340,"NUM_ECHARGER":4,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":0,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0005", "addr":"전라남도 나주시 나주역길 56 ", "name": "나주역(KTX)", "chargerType": "AC완속", "ESTATION_LOC_LATITUDE":35.029079,"ESTATION_LOC_LONGITUDE":126.725340,"NUM_ECHARGER":5,"PEER_TYPE":"aggrePeer","ESTATION_OPEN_TYPE":1,"COMMWITH":["tSTA0001","tSTA0010","tSTA0014"]},
  {"ECHARE_STATION_ID":"tSTA0006", "addr":"전라남도 나주시 나주역길 56 ", "name": "나주역(KTX)", "chargerType": "AC완속", "ESTATION_LOC_LATITUDE":35.042165,"ESTATION_LOC_LONGITUDE":126.716205,"NUM_ECHARGER":1,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":2,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0007", "addr":"전라남도 나주시 왕건길 53 ", "name": "나주지사", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":35.020839,"ESTATION_LOC_LONGITUDE":126.781584,"NUM_ECHARGER":2,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":0,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0008", "addr":"전라남도 나주시 왕건길 53 ", "name": "나주지사", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":35.023886,"ESTATION_LOC_LONGITUDE":126.785650,"NUM_ECHARGER":3,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":1,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0009", "addr":"전라남도 나주시 전력로 55 ", "name": "한전본사 남측주차장", "chargerType": "DC차데모+AC3상", "ESTATION_LOC_LATITUDE":34.983464,"ESTATION_LOC_LONGITUDE":126.685057,"NUM_ECHARGER":4,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":2,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0010", "addr":"전라남도 나주시 전력로 55 ", "name": "한전본사 파빌리온주차장", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":34.976902,"ESTATION_LOC_LONGITUDE":126.678130,"NUM_ECHARGER":5,"PEER_TYPE":"aggrePeer","ESTATION_OPEN_TYPE":0,"COMMWITH":["tSTA0005","tSTA0001","tSTA0014"]},
  {"ECHARE_STATION_ID":"tSTA0011", "addr":"전라남도 나주시 송월동 100 ", "name": "나주시청", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":34.989929,"ESTATION_LOC_LONGITUDE":126.779338,"NUM_ECHARGER":1,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":2,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0012", "addr":"전라남도 나주시 성북동 145-4 ", "name": "성북동 주민센터", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":35.000918,"ESTATION_LOC_LONGITUDE":126.802599,"NUM_ECHARGER":2,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":1,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0013", "addr":"전라남도 나주시 이창동 511-9 ", "name": "이창동 주민센터", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":34.913115,"ESTATION_LOC_LONGITUDE":126.657689,"NUM_ECHARGER":3,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":2,"COMMWITH":[]},
  {"ECHARE_STATION_ID":"tSTA0014", "addr":"전라남도 나주시 다시면 회진리 163 ", "name": "천연염색문화관", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":34.956448,"ESTATION_LOC_LONGITUDE":126.782025,"NUM_ECHARGER":4,"PEER_TYPE":"aggrePeer","ESTATION_OPEN_TYPE":1,"COMMWITH":["tSTA0005","tSTA0010","tSTA0001"]},
  {"ECHARE_STATION_ID":"tSTA0015", "addr":"전라남도 나주시 반남면 신촌리 262-1 ", "name": "반남국립박물관", "chargerType": "DC차데모+AC3상+DC콤보", "ESTATION_LOC_LATITUDE":35.044207,"ESTATION_LOC_LONGITUDE":126.847201,"NUM_ECHARGER":5,"PEER_TYPE":"Vpeer","ESTATION_OPEN_TYPE":0,"COMMWITH":[]}
]

# --------- dummy data gen ---------
export dummyCarDataGen = (v) ->
  ({type:'car', id:"#{v}_car_#{idx}" , depth:2 } for idx in [0..randomN(5)])
export dummyStationDataGen = (v) -> ({
    type:'station',
    id: "B#{v}_st_#{idx}",
    depth:1,
    children: dummyCarDataGen("B#{v}_st_#{idx}")
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