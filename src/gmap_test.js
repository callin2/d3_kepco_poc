// import { setTimeout } from "timers";

var data = {"KMAE":[-120.12,36.98,"MADERA MUNICIPAL AIRPORT",[26,1,2,5,6,3,2,1,2,7,29,12,3]],"KSJC":[-121.92,37.37,"SAN JOSE INTERNATIONAL  AIRPORT",[28,1,1,1,6,10,5,3,2,4,14,21,7]],"KMCE":[-120.50,37.28,"MERCED MUNICIPAL AIRPORT",[29,1,1,3,7,5,2,1,3,6,12,26,5]],"KMER":[-120.57,37.37,"Merced / Castle Air Force Base",[34,1,1,1,4,5,2,1,1,4,17,22,7]],"KAPC":[-122.28,38.20,"NAPA COUNTY AIRPORT",[23,2,1,6,3,3,8,18,11,13,4,3,5]],"KSUU":[-121.95,38.27,"Fairfield / Travis Air Force Base",[13,7,4,3,3,6,4,13,33,4,1,2,7]],"KSQL":[-122.25,37.52,"San Carlos Airport",[18,3,2,2,3,4,3,2,5,17,16,12,12]],"KSNS":[-121.60,36.67,"SALINAS MUNICIPAL AIRPORT",[21,1,1,6,12,3,1,2,9,21,17,5,1]],"KMOD":[-120.95,37.62,"MODESTO CITY CO SHAM FLD",[27,1,1,2,10,5,1,1,1,3,17,24,8]],"KOAK":[-122.23,37.72,"METRO OAKLAND INTERNATIONAL  AIRPORT ",[16,3,3,2,4,6,3,4,9,23,20,6,2]],"KSCK":[-121.23,37.90,"STOCKTON METROPOLITAN AIRPORT ",[21,2,2,3,6,8,2,1,4,15,19,12,4]],"KCCR":[-122.05,38.00,"CONCORD BUCHANAN FIELD",[24,3,2,1,1,5,17,12,9,9,7,6,4]],"KMRY":[-121.85,36.58,"MONTEREY PENINSULA AIRPORT",[26,1,2,9,5,3,4,9,13,14,9,4,1]],"KPAO":[-122.12,37.47,"Palo Alto Airport",[31,3,1,1,2,5,1,1,1,4,10,25,14]],"KSAC":[-121.50,38.50,"SACRAMENTO EXECUTIVE AIRPORT ",[32,1,0,1,3,11,12,16,5,2,4,9,3]],"KHWD":[-122.12,37.67,"HAYWARD AIR TERMINAL",[20,2,7,2,2,6,3,3,6,23,18,6,2]],"KSTS":[-122.82,38.50,"SANTA ROSA SONOMA COUNTY",[46,1,0,1,5,13,10,4,3,3,4,6,3]],"KSMF":[-121.60,38.70,"SACRAMENTO INTERNATIONAL  AIRPORT",[19,2,1,2,4,21,18,8,3,2,5,12,4]],"KNUQ":[-122.05,37.43,"MOFFETT FIELD",[35,3,1,1,4,7,2,1,2,5,6,17,15]],"KRHV":[-121.82,37.33,"San Jose / Reid / Hillv",[35,0,0,1,4,4,2,1,1,10,28,11,1]],"KWVI":[-121.78,36.93,"WATSONVILLE MUNICIPAL AIRPORT ",[44,1,2,3,4,5,7,9,8,4,6,5,2]],"KMHR":[-121.30,38.55,"Sacramento, Sacramento Mather Airport",[21,1,1,2,8,15,12,12,7,4,5,7,3]],"KVCB":[-121.95,38.38,"VACAVILLE NUT TREE AIRPORT",[36,2,1,1,2,6,10,18,10,2,2,5,6]],"KSFO":[-122.37,37.62,"SAN FRANCISCO INTERNATIONAL  AIRPORT ",[13,3,3,2,3,4,4,4,7,31,20,2,3]],"KLVK":[-121.82,37.70,"LIVERMORE MUNICIPAL AIRPORT ",[32,2,7,3,1,1,2,7,9,17,16,2,1]]}

var stations;
var echargers;
var D3Overlay;
var evehicles;
var activeCharger;
var map;
var image = './asset/image/map-marker-icon.png';
var polyLines = [];
var subNodeOverlay;
var projection;
var infowindow;
var list_idx = 1;

// sub node size
var padding = 10;

function handleMarkerClick(evt) {
    console.log('HandleMarkerClick', this, evt);
    polyLines.forEach(p=>p.setMap(null));
    label: ''+this._station.NUM_ECHARGER,
        drawLinkFrom(this._station);
    // showSubNodeFrom(this._station)
    showInfo(this._station, this)
}

function handleZoomChange(evt) {
    console.log(this);
    if(this.zoom > 13) {
        showSubNode()
    }else {
        hideSubNode()
    }
}

//test

function showSubNodeFrom( station ) {
    console.log('station', station)
    var subNode = new D3Overlay(station)

    subNode.setMap(map)
}

function showSubNode() {

}

function hideSubNode() {

}

function initMap() {
    var uluru = {lat: 34.988375, lng: 126.719749};
    map = new google.maps.Map(document.getElementById('main'), {
        zoom: 12,
        disableDefaultUI: true,
        center: uluru
    });

    D3Overlay = ovlInit(google)
    map.addListener('zoom_changed', handleZoomChange)
    addControl();

    Promise.all([
        getStations(),
        getEchargers(),
        getEVehicle()
    ]).then(([stations, chargers, vehicles])=>{
        console.log('stations, chargers, vehicles', stations, chargers, vehicles)
        stations.forEach(addStationMarker)
    });

    $('#recentEvents').remove()
    Promise.all([
        getStations(),
        getEchargers(),
        getEVehicle()
    ]).then(([stations,charges,vehicles])=>{
        var resultArray = new Array();
        var resultJson = new Object();

        // 충전거래 데이터 생성
        d3.interval(function() {
            // 충전 시간 Date 생성
            var date = vehicles[Math.floor(Math.random()*vehicles.length)].ec_charge_time;
            var dateYear = (Number)(date.substring(0,4));
            var dateMonth = (Number)(date.substring(4,6));
            var dateDate = (Number)(date.substring(6,8));
            var dateHour = (Number)(date.substring(8,10));
            var dateMinute = (Number)(date.substring(10,12));
            var dateSecond = (Number)(date.substring(12,14));

			// Date 양식 생성
            date = new Date(dateYear, dateMonth, dateDate, dateHour, dateMinute, dateSecond);
			
			// 충전 중 - 충전 완료 데이터 생성
            resultArray = to_json(date,stations,charges,vehicles);
            console.log('TO_JSON Interval Result Array', resultArray);
            // 결과값 생성
			resultArray.forEach(addToRankControl);
			
			// 실시간 데이터를 위한 Array Object
			resultArray = new Array();

			// Callback
            resultArray.push(to_json(function(b){
                var date = new Date();
                b.charging_end_time = date.getFullYear()+'-'+numberFormat(date.getMonth())+'-'+numberFormat(date.getDate())+' '+
                    numberFormat(date.getHours())+':'+numberFormat(date.getMinutes())+':'+numberFormat(date.getSeconds());

				console.log('setTimeout result',b);	
				return b;
            },stations,charges,vehicles));
			
			resultArray.forEach(addToRankControl);
			
        }, 5000);
    });


    $('#recentEvents').on('click',(evt)=>{
		alert();
        var sid = $(evt.target).parents('tr').data('stationid')
        console.log('sid', sid)
        var stn = getStation(sid)

        // map.setCenter({lat: stn.ESTATION_LOC_LONGITUDE, lng: stn.ESTATION_LOC_LATITUDE})

        map.panTo({lat: stn.ESTATION_LOC_LATITUDE, lng: stn.ESTATION_LOC_LONGITUDE})
    })



    $('.showChart').on('click',(evt)=>{
        $('#detailInfo').toggleClass('show'); 
        $('.detailInfo-box').toggleClass('show');
    });
}


function getStation(sid) {
    var idx = stations.findIndex(s=>s.ECHARE_STATION_ID === sid)
    return stations[idx]
}



function drawLinkFrom(fromStation) {
    fromStation.COMMWITH.forEach(t=>{
        var _t = getStation(t)

        var path = [
            {lat: fromStation.ESTATION_LOC_LATITUDE, lng: fromStation.ESTATION_LOC_LONGITUDE},
            {lat: _t.ESTATION_LOC_LATITUDE, lng: _t.ESTATION_LOC_LONGITUDE}
        ];

        var pline = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 1,
            map: map
        });

        polyLines.push(pline)
    });
}

function drawLink() {
    stations.forEach(s=>{
        drawLinkFrom(s)
    });

}

/**
*	Station List 생성
*/
function addToRankControl(s) {
    var cnt = $('div[name=station_list').length;
    // console.log('cnt', cnt);
    if(cnt >= 10){
		var div_list = new Array();

		$('div[name=station_list]').each(function(i,e){
			div_list.push($(this).attr('id'));
		});

		$('div[id='+div_list[div_list.length-1]+']').remove();
    }

	// $('div[name=station_list]').css("opacity",1);
	var per = Math.floor((s.amount/s.max_amount)*100);
    var div_str =
        '<div class="card realtime" name="station_list" id="station_list_'+list_idx+'">'+
			'<ul>'+
                '<li>'+
                    '<h2 class="realtime-title title"><span>'+s.ECHARE_STATION_ID+'</span><br/>'+
                    '<small><i class="fa fa-map-marker"></i> 제주시 노형동 중앙초등학교점</small></h2>'+
                '</li>'+
                '<li>'+
                    '<div><i class="fa fa-car"></i> '+s.evehicle_model_name+'</div>'+
                    '<div class="realtime__subtitle">HYUNDAI</div>'+
                '</li>'+
				'<li>'+
				    '<div>'+per+'%';
	
	// percentage 범위별 베터리 image 변경
	if(per >= 0 && per <= 25){
		div_str += ' <i class="fa fa-battery-quarter"></i></div>';
	}else if(per > 25 && per <= 50){
		div_str += ' <i class="fa fa-battery-half"></i></div>';
	}else if(per > 50 && per < 100){
		div_str += ' <i class="fa fa-battery-three-quarters"></i></div>';
	}else {
		div_str += ' <i class="fa fa-battery-full"></i></div>';
	}

	div_str += 
        '<div class="realtime__subtitle">('+(Math.floor((Number)(s.amount)))+'/'+(Math.floor((Number)(s.max_amount)))+')</div>'+
        '</li>'+
        '<li>';

    $.each(s, function(key, value){
        // console.log('s key', key);
        if(key == 'charging_start_time_a'){
            div_str +=
                '<div>충전중</div>'+
                '<div class="realtime__subtitle"><span>'+s.charging_start_time_a.substring(10,s.charging_start_time_a.length-3)+'</span> - <span><i class="fa fa-bolt"></i></span></div>'+
                '</li>'+
                '<ul>'+
                '</div>';
        }else if(key == 'charging_end_time'){

            div_str +=
                '<div>충전완료</div>'+
                '<div class="realtime__subtitle"><span>'+s.charged_start_time.substring(10,s.charged_start_time.length-3)+
					'</span> - <span>'+s.charging_end_time.substring(10,s.charging_end_time.length-3)+'</i></span></div>'+
                '</li>'+
                '<ul>'+
                '</div>';
        }
    });

    $('#recentEvents').prepend(''+div_str);
    list_idx = list_idx + 1;

    setTimeout(()=>{
        $('.realtime').css('top','0');
    },0)
}

function showInfo(station, marker) {
    if(infowindow) {
        infowindow.close()
    }

    var contentString = '<div id="content">' +
        '<h2 class="title">tSTA0001 충전기 현황<br/><small><i class="fa fa-map-marker"></i> 제주시 노형동 중앙초등학교점</small></h2>' +
        '<ul>' +
        '   <li>충전기 A  <a href="#" class="button button-sm"><i class="fa fa-plug"></i></a> </li>' +
        '   <li>충전기 B  <a href="#" class="button button-sm button-diabled"><i class="fa fa-plug"></i></a></li>' +
        '   <li>충전기 C  <a href="#" class="button button-sm button-diabled"><i class="fa fa-plug"></i></a></li>' +
        '</ul>' +

        '</div>';

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    infowindow.open(map, marker);
}

function addStationMarker(s) {
    var marker = new google.maps.Marker({
        position: {lat: s.ESTATION_LOC_LATITUDE  ,  lng: s.ESTATION_LOC_LONGITUDE  },
        // label: ''+s.NUM_ECHARGER,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: image,
    });

    marker.addListener('click', handleMarkerClick);
    marker['_station'] = s
}

function getBusyStation(limit) {
    return fetch('https://gist.githubusercontent.com/jhs9396/13dee5bf7ca8a94e98fa350dfff9d8bc/raw/7f5b7d15d97ab15ed7c5258ceafbac3975a2934f/station_temp.txt')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json)
            return stations = json.station
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
}

function getStations() {
    return fetch('https://gist.githubusercontent.com/jhs9396/13dee5bf7ca8a94e98fa350dfff9d8bc/raw/7f5b7d15d97ab15ed7c5258ceafbac3975a2934f/station_temp.txt')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            return stations = json.station
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
}

function getEchargers() {
    return fetch('https://gist.githubusercontent.com/jhs9396/b11b778cdfa8fbe883371593347a191b/raw/458b545a9b65bbd4e2188aca5c446e3b874449c0/Echarger')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            return echargers = json.echarger
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
}

function getEVehicle() {
    return fetch('https://gist.githubusercontent.com/jhs9396/413612e9dec20e8cd7c8afff17235414/raw/ed6591eac936d1dd2965ea11d11f7b43aac8f516/EVehicle')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json)
            return evehicles = json.evehicle
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
}


function addControl(m) {
    var divElem =  document.getElementById('recentEvents');

    // Setup the click event listeners: simply set the map to Chicago.
    divElem.addEventListener('click', function(evt) {
        console.log(evt)
    });

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(divElem);
    //============================


    var divElem2 = document.getElementById('toolbar');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(divElem2);

    // $(divElem2).find('button').click(()=>{
    //     console.log('dd');
    //     $('detailInfo').toggleClass('show')
    // })

}


function numberFormat(number){
    return (number<10?'0'+number:number);
}

// 결과값 json format으로 저장
function to_json(param,stations,charges,vehicles){
    var carArray = new Array();
    var carObject = new Object();

    carObject.car = 'SM3';
    carObject.amount = 230;
    carArray.push(carObject);

    carObject = new Object();
    carObject.car = 'SOUL';
    carObject.amount = 190;
    carArray.push(carObject);

    carObject = new Object();
    carObject.car = 'RAY';
    carObject.amount = 200;
    carArray.push(carObject);

    carObject = new Object();
    carObject.car = 'IONIQ';
    carObject.amount = 240;
    carArray.push(carObject);

    carObject = new Object();
    carObject.car = 'LEAF';
    carObject.amount = 220;
    carArray.push(carObject);

    carObject = new Object();
    carObject.car = 'SPARK';
    carObject.amount = 185;
    carArray.push(carObject);

    carObject = new Object();
    carObject.car = 'I3';
    carObject.amount = 230;
    carArray.push(carObject);


    // console.log('stations, charges, vehicles', stations, charges, vehicles);
    // JSON Data Array Random 호출
    var random1 = Math.floor((Math.random()*stations.length));
    var random2 = Math.floor((Math.random()*charges.length));
    var random3 = Math.floor((Math.random()*vehicles.length));

    // ID Random으로 발생 - log
    console.log('random1', stations[random1].ECHARE_STATION_ID);
    console.log('random2', charges[random2].ECHARGER_ID);
    console.log('random3', vehicles[random3].eVehicle_id);

    // Station, ECharger, EVehicle Object 저장
    var station_id = stations[random1].ECHARE_STATION_ID;				// 충전소 ID
    var echarger_id = charges[random2].ECHARGER_ID;						// 충전기 ID
    var evehicle_id = vehicles[random3].eVehicle_id;					// 전기차 ID
    var evehicle_remain_amt = vehicles[random3].remaining_amount;		// 전기차 잔여전기량
    var evehicle_model_name = vehicles[random3].evehicle_model_name;	// 전기차 차종
    var evehicle_max_amount;											// 전기차 총 충전가능량
    var ec_charge_time = vehicles[random3].ec_charge_time;				// 충전 시간
    var evehicle_model_name = vehicles[random3].evehicle_model_name;	// 차량정보

    // 차종에 따른 최대 충전량 조회
    for(var i=0; i<carArray.length; i++){
        for(var key in carArray[i]){
            if(key == 'car'){
                if(carArray[i][key] == evehicle_model_name){
                    evehicle_max_amount = carArray[i].amount;
                }
            }
        }
    }
    console.log('evehicle_max_amount', evehicle_max_amount);

    // 사용량 Random 발생
    var amount = Math.random()*10+90;										// 충전량 생성 (90~100 사이 값)
    console.log('amount', amount);
    console.log('amount sum', evehicle_remain_amt+amount);

    var amount_sum = evehicle_remain_amt+amount;							// 충전후 총 량

    // 충전 후 최대값보다 클 시 최대값으로 보정
    if(amount_sum >= evehicle_max_amount){
        amount_sum = evehicle_max_amount;
    }

    // A object (충전시작)
    var jsonObj = new Object();
    jsonObj.ECHARE_STATION_ID	= station_id;
    jsonObj.ECHARGER_ID			= echarger_id;
    jsonObj.eVehicle_id			= evehicle_id;
    jsonObj.evehicle_model_name = evehicle_model_name;
    jsonObj.amount				= evehicle_remain_amt;						// 충전 전 용량
    jsonObj.max_amount			= evehicle_max_amount;						// 충전 가능 용량

    // B object (충전 끝)
    var jsonObj2 = new Object();
    jsonObj2.ECHARE_STATION_ID	= station_id;
    jsonObj2.ECHARGER_ID		= echarger_id;
    jsonObj2.eVehicle_id		= evehicle_id;
    jsonObj2.evehicle_model_name = evehicle_model_name;
    jsonObj2.amount				= amount_sum;								// 충전 용량
    jsonObj2.max_amount			= evehicle_max_amount;						// 충전 가능 용량

	var date = new Date();
	jsonObj2.charged_start_time = date.getFullYear()+'-'+numberFormat(date.getMonth())+'-'+
	numberFormat(date.getDate())+' '+numberFormat(date.getHours())+':'+numberFormat(date.getMinutes())+':'+numberFormat(date.getSeconds());

    // case : param type is Date
    if(param instanceof Date){
        var jsonArray = new Array();
        var y = param.getFullYear();
        var m = param.getMonth();
        var d = param.getDate();
        var h = param.getHours();
        var mm = param.getMinutes();
        var s = param.getSeconds();

        jsonObj.charging_start_time_a = y+'-'+numberFormat(m)+'-'+numberFormat(d)+' '+numberFormat(h)+':'+numberFormat(mm)+':'+numberFormat(s);



        var endTimeMinutes = mm+Math.floor(Math.random()*5)+15;
        var EndDate = new Date(y, m, d, h, endTimeMinutes, s);
        var EndDateFormat = EndDate.getFullYear()+'-'+numberFormat(EndDate.getMonth())+'-'+numberFormat(EndDate.getDate())+' '+
            numberFormat(EndDate.getHours())+':'+numberFormat(EndDate.getMinutes())+':'+numberFormat(EndDate.getSeconds());

		jsonObj2.charged_start_time = y+'-'+numberFormat(m)+'-'+numberFormat(d)+' '+numberFormat(h)+':'+numberFormat(mm)+':'+numberFormat(s);
        jsonObj2.charging_end_time = EndDateFormat;

        jsonArray.push(jsonObj);
        jsonArray.push(jsonObj2);
        console.log('jsonObj_result', jsonArray);

        return jsonArray;
    }
    // case : param type is Function
    else{
        var timeout = 5000 + Math.random() * 5000

        setTimeout(function(){
            param(jsonObj2);
        }, timeout);

        var date = new Date();
        jsonObj.charging_start_time_a = date.getFullYear()+'-'+numberFormat(date.getMonth())+'-'+
            numberFormat(date.getDate())+' '+numberFormat(date.getHours())+':'+numberFormat(date.getMinutes())+':'+numberFormat(date.getSeconds());

        return jsonObj;
    }
}


function chart1() {
    var myChart = echarts.init(document.getElementById('chart1'));

    // specify chart configuration item and data
    var option = {
        title: {
            text: "전기 사용 현황",
            borderThickness: 2,
        },
        tooltip: {},
        legend: {
            data:['충전양']
        },
        xAxis: {
            data: ["8월","9월","10월","11월","12월","1월"]
        },
        yAxis: {},
        series: [{
            name: '충전양s',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }],
        textStyle: {
            color: 'red',
            
        }
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
}

function chart2() {
    var myChart = echarts.init(document.getElementById('chart2'));

    option = {
        title: {
            text: '요일 전기 판매량 비교',
            fontSize: '50',
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['2016','2017']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['월','화','수','목','금','토','일']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'2016',
                type:'line',
                stack: 'aa',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'2017',
                type:'line',
                stack: 'aa',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };


    // use configuration item and data specified to show chart
    myChart.setOption(option);
}

function chart3() {
    var myChart = echarts.init(document.getElementById('chart3'));

    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['레이','소울 EV','SM3 ZE','i3','LEAF','아이오닉','라보','트위지']
        },
        series: [
            {
                name:'단자별',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'차데모', selected:true},
                    {value:679, name:'DC콤보'},
                    {value:1548, name:'AC3상'}
                ]
            },
            {
                name:'차종별',
                type:'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:[
                    {value:335, name:'레이'},
                    {value:310, name:'소울 EV'},
                    {value:234, name:'SM3 ZE'},
                    {value:135, name:'i3'},
                    {value:1048, name:'LEAF'},
                    {value:251, name:'아이오닉'},
                    {value:147, name:'라보'},
                    {value:102, name:'트위지'}
                ]
            }
        ]
    };

    myChart.setOption(option);
}

function chart4() {
    window.drawsankey('#chart4')
}

$(function(){
    chart1();
    chart2();
    chart3();
    chart4();

    $('.abn_detail').click(()=>{
        $('#abn').show()
    });

    $('#gen_json').click(()=>{
        var limitTo = Date.now();
        var limitFrom = limitTo - (1000*60*60*24*7);

        var allTransaction = []

        for(var idx=0; idx<200 ; idx++) {
            var dt = new Date( limitFrom + Math.floor((limitTo-limitFrom)* Math.random()) );

            var tr = to_json(dt,stations,echargers,evehicles);
            allTransaction.push(tr[0])
            allTransaction.push(tr[1])
        }

        var cytoElements = [];

        stations.forEach((s)=>{
            cytoElements.push( { group:"nodes",  data: {id: s.ECHARE_STATION_ID, vlabel:'station'}, scratch: s , classes: "station"} )
        });

        evehicles.forEach((v)=>{
            cytoElements.push( { group:"nodes",  data: {id: v.eVehicle_id, vlabel:'vehicle'}, scratch: v , classes: "vehicle"} )
        });

        echargers.forEach((ch)=>{
            cytoElements.push( { group:"nodes",  data: {id: ch.ECHARGER_ID, vlabel:'charger'}, scratch: ch , classes: "charger"} )
        });

        // console.error('transaction', allTransaction)

        allTransaction.forEach((tr, idx)=>{
            cytoElements.push( { group:"edges",  data: {id: 'tr_a:'+idx, source: tr.ECHARE_STATION_ID, target: tr.ECHARGER_ID  },   scratch: tr , classes:'tr_a'} )
            cytoElements.push( { group:"edges",  data: {id: 'tr_b:'+idx, source: tr.ECHARGER_ID, target: tr.eVehicle_id  },   scratch: tr , classes:'tr_b'} )
        });

        console.error(JSON.stringify(cytoElements))

    })
});
