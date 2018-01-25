import * as d3 from "d3"
import * as most from "most"

let blockList = []
let node = []
let link = []

const timeRange = 60*1000
const station = [
    { name:'제주도청 1청사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시청', charger:'DC차데모+AC3상'},
    { name:'제주도청 제2청사', charger:'DC차데모+AC3상'},
    { name:'제주해녀박물관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주애월읍사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림읍사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'구좌읍사무소', charger:'DC차데모+AC3상'},
    { name:'구좌체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'조천체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'산굼부리', charger:'DC차데모+AC3상'},
    { name:'한경면체육관', charger:'DC차데모+AC3상'},
    { name:'제주노루생태공원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한라도서관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'거문오름', charger:'DC차데모+AC3상'},
    { name:'동백동산습지센터', charger:'DC차데모+AC3상'},
    { name:'어리목휴게소', charger:'DC차데모+AC3상'},
    { name:'제주현대미술관', charger:'DC차데모+AC3상'},
    { name:'관음사지구안내소', charger:'DC차데모+AC3상'},
    { name:'비자림', charger:'DC차데모+AC3상'},
    { name:'제주소방서 항만119센터', charger:'DC차데모+AC3상'},
    { name:'노형동주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'방송통신융합센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'삼양동주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'녹고뫼안트레안내센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'돌문화공원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'봉성리종합복지회관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주종합경기장1', charger:'DC차데모+AC3상+DC콤보'},
    { name:'쇠소깍 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'생물종다양성연구소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주종합경기장2', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주농업기술원', charger:'DC차데모+AC3상'},
    { name:'성산읍사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선면사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'대정읍사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕면사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원읍동부보건소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주서귀포시청 제1청사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'별빛누리공원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주일출랜드', charger:'DC차데모+AC3상'},
    { name:'돈내코야영장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포시민회관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주국제컨벤션센터', charger:'DC차데모+AC3상'},
    { name:'제주국제컨벤션센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주영어교육도시', charger:'DC차데모+AC3상'},
    { name:'산방산', charger:'DC차데모+AC3상'},
    { name:'성읍민속마을', charger:'DC차데모+AC3상'},
    { name:'중문랜드', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포천지연폭포', charger:'DC차데모+AC3상'},
    { name:'제주월드컵경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주 서비스센터', charger:'DC차데모+DC콤보'},
    { name:'제주 서비스센터', charger:'AC완속'},
    { name:'제주 서비스센터', charger:'AC완속'},
    { name:'산지공업사', charger:'AC완속'},
    { name:'제주 사옥', charger:'DC차데모+DC콤보'},
    { name:'제주 사옥', charger:'AC완속'},
    { name:'GS25 너울빌리지점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'현대자동차 블루핸즈 노형북부점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'현대자동차 블루핸즈 한림점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'현대자동차 블루핸즈 아라점', charger:'AC완속'},
    { name:'현대자동차 블루핸즈 연동점', charger:'AC완속'},
    { name:'GS25 안덕서광점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주지방합동청사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주지방합동청사', charger:'AC완속'},
    { name:'라마다호텔 제주', charger:'AC완속'},
    { name:'라마다호텔 제주', charger:'AC완속'},
    { name:'형제공업사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'탑동2공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'탑동2공영주차장', charger:'AC완속'},
    { name:'제주대학교 병원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주대학교 병원', charger:'AC완속'},
    { name:'제주대학교 병원', charger:'AC완속'},
    { name:'하귀 농협 장례식장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'하귀 농협 장례식장', charger:'AC완속'},
    { name:'애월 농협', charger:'DC차데모+AC3상+DC콤보'},
    { name:'애월 농협', charger:'AC완속'},
    { name:'하귀 농협 복지센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'하귀 농협 복지센터', charger:'AC완속'},
    { name:'한국충전㈜', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한국충전㈜', charger:'AC완속'},
    { name:'한국충전㈜', charger:'AC완속'},
    { name:'한국충전㈜', charger:'DC차데모+AC3상+DC콤보'},
    { name:'기아오토큐 오라동대리점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'롯데리아 제주외도 DT', charger:'DC차데모+AC3상+DC콤보'},
    { name:'롯데리아 제주외도 DT', charger:'AC완속'},
    { name:'제주공항 입구주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항 입구주차장', charger:'AC완속'},
    { name:'토끼와거북이', charger:'DC차데모+AC3상+DC콤보'},
    { name:'일도이동공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'일도이동공영주차장', charger:'AC완속'},
    { name:'조천농협 농산물산지유통센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'조천농협 농산물산지유통센터', charger:'AC완속'},
    { name:'한경농협', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한경농협', charger:'AC완속'},
    { name:'기아오토큐 화북대리점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'롯데하이마트 신제주점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'KT 성산포지사', charger:'AC완속'},
    { name:'KT 성산포지사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'위미 농협', charger:'DC차데모+AC3상+DC콤보'},
    { name:'위미 농협', charger:'AC완속'},
    { name:'약천사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'약천사', charger:'AC완속'},
    { name:'코리아마트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'코리아마트', charger:'AC완속'},
    { name:'코리아마트', charger:'AC완속'},
    { name:'대유랜드', charger:'DC차데모+AC3상+DC콤보'},
    { name:'대유랜드', charger:'AC완속'},
    { name:'㈜상효원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'㈜상효원', charger:'AC완속'},
    { name:'롯데호텔', charger:'DC차데모+AC3상+DC콤보'},
    { name:'롯데호텔', charger:'AC완속'},
    { name:'서귀포중앙로터리 천지연공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포중앙로터리 천지연공영주차장', charger:'AC완속'},
    { name:'서귀포올레시장 (매일시장)', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산일출봉', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산일출봉', charger:'AC완속'},
    { name:'동광 R 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕농협 하나로마트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포시축산업협동조합(한우명품관)', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포시축산업협동조합(한우명품관)', charger:'AC완속'},
    { name:'성읍랜드', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성읍랜드', charger:'AC완속'},
    { name:'표선 농협', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선 농협', charger:'AC완속'},
    { name:'GS25 서귀대포점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'롯데하이마트 서귀포점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'GS25중문사거리점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'현대자동차 블루핸즈 외도점', charger:'AC완속'},
    { name:'함덕농협하나로마트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시농협 하나로마트 제주점', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시농협 하나로마트 제주점', charger:'AC완속'},
    { name:'제주대학교 제2도서관', charger:'AC완속'},
    { name:'제주대학교 제2도서관', charger:'AC완속'},
    { name:'제주대학교 학생주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주대학교 학생주차장', charger:'AC완속'},
    { name:'아모렉스 리조트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원 농협 하나로마트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원 농협 하나로마트', charger:'AC완속'},
    { name:'제주시농협 하나로유통센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시농협 하나로유통센터', charger:'AC완속'},
    { name:'넥슨박물관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'넥슨박물관', charger:'AC완속'},
    { name:'NH농협은행 제주수련원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'NH농협은행 제주수련원', charger:'AC완속'},
    { name:'NH농협은행 제주수련원', charger:'AC완속'},
    { name:'하얏트 리젠시 제주 호텔', charger:'AC완속'},
    { name:'하얏트 리젠시 제주 호텔', charger:'AC완속'},
    { name:'잠도둑 게스트하우스', charger:'DC차데모+AC3상+DC콤보'},
    { name:'잠도둑 게스트하우스', charger:'AC완속'},
    { name:'제주바다목장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주바다목장', charger:'AC완속'},
    { name:'다이아나호텔', charger:'DC차데모+AC3상+DC콤보'},
    { name:'다이아나호텔', charger:'AC완속'},
    { name:'제주필하우스', charger:'DC차데모+AC3상+DC콤보'},
    { name:'선반내주유소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한국수산자원관리공단', charger:'AC완속'},
    { name:'제주특별자치도청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도의회', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도의회', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포시청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포시청', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시 평생학습센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한경면사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'조천읍사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'축산진흥원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'아라동사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원읍사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'용담2동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주동물위생연구소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시 보건소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'양지공원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주4·3평화공원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주세계자연유산센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주절물자연휴양림', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주벤처마루', charger:'DC차데모+AC3상+DC콤보'},
    { name:'노형동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'외도동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'건입동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'해군호텔', charger:'DC차데모+AC3상+DC콤보'},
    { name:'무릉문화의집', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주농업기술센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'만장굴', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성판악', charger:'DC차데모+AC3상+DC콤보'},
    { name:'도남1차e편한세상아파트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'도남1차e편한세상아파트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'민속자연사박물관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한라생태숲', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주특별자치도 인재개발원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'외도부영2차아파트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선생활체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주 곶자왈 도립공원입구', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포예술의전당', charger:'DC차데모+AC3상+DC콤보'},
    { name:'동부소방서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포농업기술센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'교래자연휴양림', charger:'DC차데모+AC3상+DC콤보'},
    { name:'모구리야영장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'신천지아파트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'설문대여성문화센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'봉개동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'동홍동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'보건환경연구원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'추자면사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'자치경찰단', charger:'DC차데모+AC3상+DC콤보'},
    { name:'환경성질환예방관리센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'애월도서관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'영천동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'자치경찰단 서귀포지역경찰대', charger:'DC차데모+AC3상+DC콤보'},
    { name:'보목하수처리장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕면사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포 자기주도학습지원센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'경마공원', charger:'AC완속'},
    { name:'경마공원', charger:'AC완속'},
    { name:'바다어사또', charger:'AC완속'},
    { name:'JIBS사옥', charger:'AC완속'},
    { name:'KBS사옥', charger:'AC완속'},
    { name:'문예회관', charger:'AC3상'},
    { name:'문예회관', charger:'DC콤보'},
    { name:'중문교회', charger:'DC콤보'},
    { name:'노형 중흥S클래스 미리내마을', charger:'AC완속'},
    { name:'노형 중흥S클래스 미리내마을', charger:'AC완속'},
    { name:'노형 중흥S클래스 미리내마을', charger:'AC완속'},
    { name:'아모렉스리조트', charger:'AC완속'},
    { name:'보오메꾸뜨르호텔', charger:'AC완속'},
    { name:'올레리조트', charger:'AC완속'},
    { name:'올레리조트', charger:'AC완속'},
    { name:'에코랜드 테마파크', charger:'AC완속'},
    { name:'에코랜드 테마파크', charger:'AC완속'},
    { name:'에코랜드 테마파크', charger:'AC완속'},
    { name:'대명리조트', charger:'AC완속'},
    { name:'대명리조트', charger:'AC완속'},
    { name:'라온프라이빗타운', charger:'AC완속'},
    { name:'라온프라이빗타운', charger:'AC완속'},
    { name:'라온프라이빗타운', charger:'AC완속'},
    { name:'맥도날드(공항점)', charger:'AC완속'},
    { name:'중문덤장', charger:'AC완속'},
    { name:'중문덤장', charger:'AC완속'},
    { name:'신라호텔', charger:'AC완속'},
    { name:'신라호텔', charger:'AC완속'},
    { name:'신라호텔', charger:'AC완속'},
    { name:'신라호텔', charger:'DC차데모+AC3상+DC콤보'},
    { name:'금호리조트', charger:'AC완속'},
    { name:'금호리조트', charger:'AC완속'},
    { name:'사이프러스 CC', charger:'AC완속'},
    { name:'사이프러스 CC', charger:'AC완속'},
    { name:'홈플러스(서귀포점)', charger:'DC차데모+DC콤보'},
    { name:'홈플러스(서귀포점)', charger:'AC3상'},
    { name:'아프리카박물관', charger:'AC완속'},
    { name:'제주민속촌박물관', charger:'AC완속'},
    { name:'박물관은살아있다', charger:'AC완속'},
    { name:'박물관은살아있다', charger:'AC완속'},
    { name:'맥도널드(월드컵점)', charger:'AC완속'},
    { name:'리젠트마린호텔', charger:'AC완속'},
    { name:'리젠트마린호텔', charger:'AC완속'},
    { name:'호텔 휘슬락', charger:'AC완속'},
    { name:'첨단과학기술단지 지하', charger:'AC완속'},
    { name:'첨단과학기술단지 외부', charger:'AC완속'},
    { name:'제주시 소인국테마파크', charger:'AC완속'},
    { name:'제주시 소인국테마파크', charger:'AC완속'},
    { name:'제주시 앨리시안CC', charger:'AC완속'},
    { name:'제주시 앨리시안CC', charger:'AC완속'},
    { name:'서귀포시 해비치리조트', charger:'AC완속'},
    { name:'서귀포시 해비치리조트', charger:'AC완속'},
    { name:'서귀포시 해비치리조트', charger:'DC차데모+AC3상+DC콤보'},
    { name:'코리아마트 동흥점', charger:'AC완속'},
    { name:'기아 제주 서비스센터', charger:'DC차데모'},
    { name:'하원중문점', charger:'DC차데모'},
    { name:'서귀포지사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주전력지사', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주직할', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주직할', charger:'DC차데모+AC3상+DC콤보'},
    { name:'스마트그리드 홍보관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'스마트그리드 홍보관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'종합경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'종합경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'종합경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'종합경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'종합경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서부소방서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서부소방서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주 삼양 유적지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주 삼양 유적지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주의료원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주의료원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한경119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원생활체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원생활체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'난산리 다목적회관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'난산리 다목적회관', charger:'AC완속'},
    { name:'서귀포의료원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'수산1리 복지회관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'수산1리 복지회관', charger:'AC완속'},
    { name:'수산1리 복지회관', charger:'AC완속'},
    { name:'정방폭포', charger:'DC차데모+AC3상+DC콤보'},
    { name:'정방폭포', charger:'AC완속'},
    { name:'개인택시조합', charger:'DC차데모+AC3상+DC콤보'},
    { name:'개인택시조합', charger:'DC차데모+AC3상+DC콤보'},
    { name:'행복날개 주유소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'행복날개 주유소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'LH제주본부', charger:'DC차데모+AC3상+DC콤보'},
    { name:'국립제주박물관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'국립제주박물관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'김창열미술관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'김창열미술관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'도두동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'동부농업기술센타', charger:'DC차데모+AC3상+DC콤보'},
    { name:'베스트힐 주차장(조천읍)', charger:'DC차데모+AC3상+DC콤보'},
    { name:'부민장례식장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'부민장례식장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서부경찰서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서부경찰서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'송당리사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'애월119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'애월119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'유리의성', charger:'DC차데모+AC3상+DC콤보'},
    { name:'유수암', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주 동부보건소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주 동부보건소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'조천119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한라산국립공원 관음사탐방안내소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한라산국립공원 어리목탐방안내소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한라산국립공원 어리목탐방안내소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'해양경비안전센터 고산출장소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'해양경비안전센터 고산출장소', charger:'AC완속'},
    { name:'가시리 조랑말체험공원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'강창학경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'강창학경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'강창학경기장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원 의례회관 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'남원 의례회관 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'대천동주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'동부소방서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포해양경비안전서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포해양경비안전서', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산하수처리장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산하수처리장', charger:'AC완속'},
    { name:'안덕119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕계곡 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕계곡 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕생활체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕생활체육관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'영실매표소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'영어교육도시119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'영어교육도시119센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'예래동주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'용머리해안', charger:'DC차데모+AC3상+DC콤보'},
    { name:'용머리해안', charger:'DC차데모+AC3상+DC콤보'},
    { name:'용머리해안', charger:'AC완속'},
    { name:'제주국제평화센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주국제평화센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'청소년 문화의 집', charger:'DC차데모+AC3상+DC콤보'},
    { name:'화순리 종합복지관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서부농업기술센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서부농업기술센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주KCTV', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주KCTV', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주공항', charger:'AC완속'},
    { name:'제주공항', charger:'AC완속'},
    { name:'제주공항', charger:'AC완속'},
    { name:'제주공항', charger:'AC완속'},
    { name:'제주공항', charger:'AC완속'},
    { name:'제주공항', charger:'AC완속'},
    { name:'일성비치콘도미니엄', charger:'AC완속'},
    { name:'제주도농아복지관', charger:'AC완속'},
    { name:'제주도농아복지관', charger:'AC완속'},
    { name:'라마다제주시티호텔', charger:'AC완속'},
    { name:'남원읍 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'위미의례회관', charger:'DC차데모+AC3상+DC콤보'},
    { name:'대정감협 인근 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'퐁낭 작은 도서관 앞 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'월드컵경기장 인근 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'중문 관광단지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'중문 관광단지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'중문 관광단지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'중문 관광단지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'중문 관광단지', charger:'DC차데모+AC3상+DC콤보'},
    { name:'중앙공영주차장(우리은행 서귀포점 인근 공영주차장)', charger:'DC차데모+AC3상+DC콤보'},
    { name:'아랑조을거리 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포성당 뒤 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'국토교통부 인재개발원 앞 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'천지연폭포주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'천지연폭포주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산읍 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산일출봉 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'성산일출봉 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'안덕우체국 뒤 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'서귀포시 매일시장 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선민속마을 해비치 해변 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선민속마을 해비치 해변 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선민속마을 해비치 해변 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선민속마을 해비치 해변 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선민속마을 해비치 해변 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'표선 의례회관 앞 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'회수사거리 인근 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'오일장 인근 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'용암해수산업화지원센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주상공회의소 뒤편 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'이호동 주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한국폴리텍대학 제주캠퍼스', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한라수목원', charger:'DC차데모+AC3상+DC콤보'},
    { name:'탐라중학교 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'아라지구 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'상가리사무소', charger:'DC차데모+AC3상+DC콤보'},
    { name:'오일시장 일대 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'외도구획정리지구 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'삼성혈 인근 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'이도주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'영락교회 인근 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시 상하수도본부', charger:'DC차데모+AC3상+DC콤보'},
    { name:'하귀1지구 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한경도서관 앞 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림공원 인근 공영주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림읍체육관 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림읍체육관 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'한림읍체육관 주차장', charger:'DC차데모+AC3상+DC콤보'},
    { name:'화북동주민센터', charger:'DC차데모+AC3상+DC콤보'},
    { name:'제주시 LGBESTSHOP(제주삼도점)', charger:'AC완속'},
    { name:'서귀포시 이마트(서귀포점)', charger:'AC완속'},
    { name:'서귀포시 이마트(서귀포점)', charger:'AC완속'},
    { name:'제주시 이마트(신제주점)', charger:'AC완속'},
    { name:'제주시 이마트(제주점)', charger:'AC완속'},
    { name:'제주시 이마트(제주점)', charger:'AC완속'},
    { name:'제주시 LGBESTSHOP(제주본점)', charger:'AC완속'},
    { name:'서귀포시 블루핸즈(성산점)', charger:'AC완속'},
    { name:'서귀포시 블루핸즈(대정점)', charger:'AC완속'},
    { name:'서귀포시 블루핸즈(천지자동차)', charger:'AC완속'},
    { name:'제주시 자연인', charger:'AC완속'},
    { name:'제주시 자연인', charger:'AC완속'},
    { name:'제주시 자연인', charger:'AC완속'},
    { name:'제주시 자연인', charger:'AC완속'},
    { name:'제주시 자연인', charger:'AC완속'},
    { name:'제주시 카카오 본사', charger:'AC완속'},
    { name:'제주시 카카오 본사', charger:'AC완속'},
    { name:'제주시 카카오 본사', charger:'AC완속'}
].map((v,idx)=>{ v['id']=idx; return v })
const charger = []
const ecar = [
    {carType: '아이오닉'},
    {carType: '쏘울 ev'},
    {carType: 'SM3 ZE'},
    {carType: '볼트 ev'},
    {carType: '트위지'},
    {carType: '스파크 ev'},
    {carType: 'LEAF'},
    {carType: '레이 EV'},
    {carType: 'i3'},
];


let blockIdx=0;
let forceSim = d3.forceSimulation()
    .force(
        "link",
        d3.forceLink().id(function(d) {
            return d.id;
        })
    ).force(
        "charge",
        d3.forceManyBody().strength(100)
    )

function dummyStationGen() {
    let cnt = Math.floor(Math.random()*10 ) + 3
    let rslt = []
    for(let i=0;i<cnt;i++) {
        rslt.push(station[Math.floor(Math.random()*100)])
    }
    return rslt
}

function dummyDataGen() {
    let n = Date.now()
    blockIdx++
    return {timestamp: n, blockIdx: blockIdx, id: blockIdx, stations: dummyStationGen()}
}

let svg = d3.select('svg')

let timeScale = d3.scaleTime().domain([Date.now(), Date.now()-(timeRange)]).range([-500,500])
let yAxis = d3.axisLeft(timeScale)

let yaxisG = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

yaxisG.selectAll('path').style('stroke','#8284d7');

let blockG = svg.append('g')
    .attr('class', 'block')

const $log = r=>console.log('tap',JSON.stringify(r))

const updateBlockList = r=>{
    let n = Date.now()
    // blockList = blockList.filter(b=> n-b.timestamp > timeRange )
    blockList.push(r)
    node.push(r)
    r.stations.forEachChild(s=>{
        link.push({source: r.id, target:})
    })
}

most.periodic(5*1000)
    .map(dummyDataGen)
    .tap($log)
    .tap(updateBlockList)
    .observe(r=> {

    })

let _stations = context => {
    let selection = context.selection ? context.selection() : context

    selection
        .attr('cx', d=>Math.random()*100-50)
        .attr('cy', d=>Math.random()*100-50)
        .attr('r', 10)
        .style('fill', 'pink')
};


let _blocks = (data => context => {
    console.log('_blocks', data)
    let selection = context.selection ? context.selection() : context
    let block_g = selection.selectAll('g.ablock').data(data, d=>d.blockIdx).order()
    let block_g_exit = block_g.exit()
    let block_g_enter = block_g.enter()
        .append("g")
        .attr("class", "ablock")
        .attr('transform', d=>`translate(0 ${timeScale(d.timestamp+1000)})`)

    let blockCircle = block_g.select('circle')

    block_g = block_g.merge(block_g_enter);



    blockCircle = blockCircle.merge(block_g_enter).append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10)
        .style('fill', 'red')
        .transition()
        .duration(100)
        .attr('r', 3)
        .style('fill', '#8284d7')

    let stations = block_g_enter.selectAll('circle.station').data(d=>{
        console.log('ddd========', d.stations)
        return d.stations
    }).enter()
        .append('circle')
        .attr('class','station')
        .call(_stations)

    if (context !== selection) {
        block_g = block_g.transition(context);
    }

    block_g.attr('transform', d=>`translate(0 ${timeScale(d.timestamp)})`)

    block_g_exit.remove()

})(blockList);



function animate(ts?){
    let now = Date.now()
    timeScale.domain([now, now-(timeRange)])

    yaxisG.transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(yAxis);

    //-----------------

    blockG.transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(_blocks);

}



setInterval(animate,1000)

//
//
// animate(1)