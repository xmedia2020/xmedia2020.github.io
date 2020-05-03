

function setup(){
	createCanvas(windowWidth, windowHeight)
    background(0)


}


function draw(){
	background(0)
	fill(255)
    noStroke()

    let letterSize = min(width,height)/2

	translate(width/2, height/2)
	push()
	stroke(255)
	fill(255)
	translate(width/40-mouseX*0.05,height/40-mouseY*0.05)
	beginShape()
    for (const p of punti) {
    	vertex(p.x * letterSize, p.y * letterSize)
    }
    endShape()
    pop()
	
    push()
    stroke(0)
	fill(0)
	beginShape()
    for (const p of punti) {
    	vertex(p.x * letterSize, p.y * letterSize)
    }
    endShape()
    pop()

 


}



// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}


function keyPressed(){

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

}

const punti = [
	{x:0.40384218768440994, y:-0.17137292940133997},
	{x:0.40384218768440994, y:-0.15390027878233056},
	{x:0.40384218768440994, y:-0.1365768842943924},
	{x:0.40384218768440994, y:-0.11924347261644948},
	{x:0.40384218768440994, y:-0.10183762489369869},
	{x:0.40384218768440994, y:-0.08448577536764844},
	{x:0.40384218768440994, y:-0.06676350205147935},
	{x:0.40384218768440994, y:-0.04938859977035361},
	{x:0.40384218768440994, y:-0.031904851835183705},
	{x:0.40384218768440994, y:-0.014499624310026698},
	{x:0.40384218768440994, y:0.0026650954248691244},
	{x:0.40384218768440994, y:0.020322180551520505},
	{x:0.40384218768440994, y:0.03751816341220483},
	{x:0.40384218768440994, y:0.05504998574831268},
	{x:0.40384218768440994, y:0.07240432507705477},
	{x:0.40384218768440994, y:0.0899772959989269},
	{x:0.40384218768440994, y:0.10725079679959726},
	{x:0.40384218768440994, y:0.12487459191166012},
	{x:0.40384218768440994, y:0.14209637465052904},
	{x:0.40384218768440994, y:0.15957715152529567},
	{x:0.40384218768440994, y:0.17703572024926625},
	{x:0.40384218768440994, y:0.19442643073469346},
	{x:0.40384218768440994, y:0.21193612146837018},
	{x:0.40384218768440994, y:0.22928168946601205},
	{x:0.40384218768440994, y:0.24686917662026064},
	{x:0.40384218768440994, y:0.2641821464676012},
	{x:0.40384218768440994, y:0.28182369631294163},
	{x:0.40384218768440994, y:0.2990557264877312},
	{x:0.40384218768440994, y:0.31664550117448886},
	{x:0.40384218768440994, y:0.33405072869964586},
	{x:0.40384218768440994, y:0.35153447663481574},
	{x:0.40384218768440994, y:0.3689093789159415},
	{x:0.40384218768440994, y:0.3862962031402052},
	{x:0.40384218768440994, y:0.4036762062423741},
	{x:0.40384218768440994, y:0.4211164179286771},
	{x:0.40384218768440994, y:0.4384933590962494},
	{x:0.40384218768440994, y:0.4560461556467927},
	{x:0.40384218768440994, y:0.4735188062658021},
	{x:0.38650695419756037, y:0.47363631726234706},
	{x:0.3693081481557489, y:0.47363631726234706},
	{x:0.35172922782712346, y:0.47363631726234706},
	{x:0.33426647128448284, y:0.47363631726234706},
	{x:0.3168145783516684, y:0.47363631726234706},
	{x:0.2994599904098079, y:0.47363631726234706},
	{x:0.2820027581636556, y:0.47363631726234706},
	{x:0.2645233872289202, y:0.47363631726234706},
	{x:0.24718815374207062, y:0.47363631726234706},
	{x:0.24468822504263765, y:0.4586921347990233},
	{x:0.24468822504263765, y:0.4413122957947337},
	{x:0.24468822504263765, y:0.4238865337531527},
	{x:0.24468822504263765, y:0.40636297642363983},
	{x:0.24468822504263765, y:0.389080821027478},
	{x:0.24401967417417605, y:0.37281146990180875},
	{x:0.22952934057820143, y:0.3828042794735871},
	{x:0.21534162754579184, y:0.39276121352527754},
	{x:0.20106050829501762, y:0.40289659014122786},
	{x:0.18695704591838005, y:0.412985968171784},
	{x:0.17263277864389834, y:0.42288992982657364},
	{x:0.15792573093336545, y:0.4322875044570058},
	{x:0.14285655150241613, y:0.4410754484849089},
	{x:0.12744666826350068, y:0.4491466223480296},
	{x:0.1116594070197945, y:0.45663289861423484},
	{x:0.09594331891195866, y:0.46359019114840727},
	{x:0.0797428560898283, y:0.4699676508649708},
	{x:0.06310928970392184, y:0.4757927444517031},
	{x:0.04647894399818977, y:0.48097887067576933},
	{x:0.029546399793834912, y:0.48568275848347936},
	{x:0.012693437557660564, y:0.48973891296433897},
	{x:-0.004399533531228546, y:0.4930187228138231},
	{x:-0.02164656157067793, y:0.4955811764775857},
	{x:-0.038954376701765846, y:0.49749511599435486},
	{x:-0.05623339077052799, y:0.4988266659539613},
	{x:-0.07365851722897665, y:0.4996479393984351},
	{x:-0.09117412142442165, y:0.5},
	{x:-0.1085613789175938, y:0.49983312201515673},
	{x:-0.1259400538824988, y:0.4988707327805815},
	{x:-0.1434157875508452, y:0.497028013476157},
	{x:-0.16049358865171523, y:0.4943202233728708},
	{x:-0.17762483940753615, y:0.4906373009204081},
	{x:-0.19433605437952245, y:0.48604125719873964},
	{x:-0.21084161171510984, y:0.48045246803319086},
	{x:-0.22712448596386023, y:0.4738339215749833},
	{x:-0.24276174532710473, y:0.4663575281217326},
	{x:-0.25796769327925084, y:0.457943501166094},
	{x:-0.2727423298202985, y:0.44859184070806757},
	{x:-0.2868997272265705, y:0.43844401966962887},
	{x:-0.3004566869294201, y:0.42753656290154607},
	{x:-0.3134297863411162, y:0.41590550825657724},
	{x:-0.32578998333531767, y:0.4035733428678453},
	{x:-0.3373941719233881, y:0.3905853007338683},
	{x:-0.3482027883869753, y:0.3769228759302571},
	{x:-0.35817748163277263, y:0.3625659797890891},
	{x:-0.3671676597010627, y:0.34769338522160775},
	{x:-0.3751733225918455, y:0.33230509222781307},
	{x:-0.382194470305121, y:0.316401100807705},
	{x:-0.38823110284088924, y:0.29998141096128367},
	{x:-0.3932231368196365, y:0.2832722048560896},
	{x:-0.3972089233346694, y:0.2662935711600454},
	{x:-0.4002263021313838, y:0.2490653306921678},
	{x:-0.40228967617593264, y:0.23185268227725153},
	{x:-0.403482821301028, y:0.2144418540803836},
	{x:-0.40384218768440994, y:0.19703911573212918},
	{x:-0.4035003345611397, y:0.17961006082306455},
	{x:-0.4024881785940661, y:0.16214418277695045},
	{x:-0.4007598474114458, y:0.14489341418695073},
	{x:-0.3982366457873088, y:0.1277166761936464},
	{x:-0.394805374686659, y:0.11050359516216436},
	{x:-0.3904616105442368, y:0.09368032844132794},
	{x:-0.38503814259322516, y:0.07697345749159298},
	{x:-0.37856062751213054, y:0.06078237100448651},
	{x:-0.37097385920651166, y:0.04515619733928183},
	{x:-0.36222156992626514, y:0.030145009631392116},
	{x:-0.35226679327576005, y:0.015761645148367386},
	{x:-0.3413797173744059, y:0.0020717982984627173},
	{x:-0.3298019825182519, y:-0.010728963880695202},
	{x:-0.31734379421941933, y:-0.022895420891471806},
	{x:-0.3040051524779082, y:-0.03442757273386703},
	{x:-0.2903283912645388, y:-0.044933106797442904},
	{x:-0.27583518762695713, y:-0.05485045115755395},
	{x:-0.26112947104431905, y:-0.0638316684624556},
	{x:-0.2456689075458043, y:-0.07226907132258582},
	{x:-0.2301166066087734, y:-0.07985735743866994},
	{x:-0.2141261324586797, y:-0.0868168885403628},
	{x:-0.19785368483732865, y:-0.0932223409025551},
	{x:-0.1813898892044463, y:-0.09910298797564251},
	{x:-0.1647706860131886, y:-0.10448425105575974},
	{x:-0.14803121703997466, y:-0.10939098652134958},
	{x:-0.13120582538448688, y:-0.11384748583316295},
	{x:-0.11432805546967074, y:-0.1178774755342589},
	{x:-0.09743065304173502, y:-0.12150411725000457},
	{x:-0.08010728968750676, y:-0.12482946953007991},
	{x:-0.06303125233109715, y:-0.12774556735060408},
	{x:-0.04579002281462305, y:-0.13035009114914492},
	{x:-0.028398775996083654, y:-0.1326537743618482},
	{x:-0.011120345513270449, y:-0.13465073567607688},
	{x:0.006139370447672467, y:-0.13651052263743368},
	{x:0.023332425309309967, y:-0.13827855268035394},
	{x:0.04094313047619522, y:-0.14000462946801845},
	{x:0.05823407599620833, y:-0.1416182162086236},
	{x:0.07569206183373478, y:-0.14316816854255704},
	{x:0.09281119770238755, y:-0.14461290333305074},
	{x:0.11034321129578768, y:-0.14601750299419364},
	{x:0.12752236398755945, y:-0.1473222226100891},
	{x:0.14511439440407858, y:-0.14858680709663372},
	{x:0.16233975752537896, y:-0.1497567711164415},
	{x:0.17971361607996264, y:-0.1508701654473795},
	{x:0.1972359700678296, y:-0.15192699008944763},
	{x:0.21463797142576188, y:-0.1529125117295094},
	{x:0.2321840024452235, y:-0.1538431649270838},
	{x:0.24468822504263765, y:-0.15922749284801216},
	{x:0.24468822504263765, y:-0.17669345327795632},
	{x:0.24430953538987268, y:-0.19409961522222277},
	{x:0.2428181526833045, y:-0.2113653699584927},
	{x:0.23997535049831195, y:-0.22858637282427471},
	{x:0.2355339286448957, y:-0.24552091696712497},
	{x:0.22923090819752454, y:-0.26191186743763517},
	{x:0.22115118264934397, y:-0.27700200076963866},
	{x:0.21099254051511768, y:-0.2914144146839744},
	{x:0.19918835158420062, y:-0.30430786232444174},
	{x:0.1859887575145741, y:-0.3154958818928789},
	{x:0.17147884659858773, y:-0.32505701642837787},
	{x:0.15596347309734682, y:-0.3330959769964477},
	{x:0.13980604791270834, y:-0.33967115141186305},
	{x:0.12310173045587378, y:-0.34492906763594594},
	{x:0.10633279160973336, y:-0.3489195812783316},
	{x:0.08912474938433063, y:-0.35189502548804735},
	{x:0.07167302634121589, y:-0.3541487191666625},
	{x:0.05451686563717106, y:-0.3559019120035373},
	{x:0.037097726007594985, y:-0.3572343385595622},
	{x:0.019811400475372394, y:-0.3581303110055005},
	{x:0.0022736541037283423, y:-0.3586240101083645},
	{x:-0.015085201665486443, y:-0.3587098840908373},
	{x:-0.03271602309684814, y:-0.3582401258101569},
	{x:-0.049834782353706315, y:-0.3572289426216087},
	{x:-0.06743438396595804, y:-0.35566620496657975},
	{x:-0.0846825580740582, y:-0.35365998257352294},
	{x:-0.10180065176696904, y:-0.35123857489681354},
	{x:-0.1190388229359388, y:-0.34839723370585174},
	{x:-0.13637720206214957, y:-0.3451587505075169},
	{x:-0.153490490708026, y:-0.34161185796260185},
	{x:-0.170206048078937, y:-0.33782438515397345},
	{x:-0.18734661186004045, y:-0.33361487824634173},
	{x:-0.2039907233761954, y:-0.32921822125002703},
	{x:-0.22074844178817982, y:-0.324490210807543},
	{x:-0.23761976709599375, y:-0.31943084691888957},
	{x:-0.25428913108230644, y:-0.3141429689538898},
	{x:-0.27075033913242774, y:-0.3086446445387238},
	{x:-0.2873168945921247, y:-0.30283905684562845},
	{x:-0.30366719046873986, y:-0.29684665833913054},
	{x:-0.31958491523273674, y:-0.2950855680178563},
	{x:-0.31958491523273674, y:-0.3123790169486046},
	{x:-0.31958491523273674, y:-0.3297216169271533},
	{x:-0.31958491523273674, y:-0.3472751781153016},
	{x:-0.31958491523273674, y:-0.36463874225959225},
	{x:-0.31958491523273674, y:-0.38198744978449883},
	{x:-0.31958491523273674, y:-0.3995224224852912},
	{x:-0.31958491523273674, y:-0.4168395879290321},
	{x:-0.31958491523273674, y:-0.4343436347232083},
	{x:-0.31958491523273674, y:-0.4519160850676696},
	{x:-0.3072308016553465, y:-0.45983731305509984},
	{x:-0.2904121890121613, y:-0.4638835652430845},
	{x:-0.27341996807163127, y:-0.46766973127371875},
	{x:-0.256457389076658, y:-0.4712220408598342},
	{x:-0.23931592597256232, y:-0.4746306081132465},
	{x:-0.22222848068776274, y:-0.4778811737322156},
	{x:-0.20508681304450274, y:-0.4810190382716542},
	{x:-0.18770313985668596, y:-0.4840943722665776},
	{x:-0.17079183850553792, y:-0.48693678485316194},
	{x:-0.1535663942179025, y:-0.48955488615622833},
	{x:-0.1360466115795296, y:-0.49192432627526467},
	{x:-0.11891954088996327, y:-0.4939521859899166},
	{x:-0.10150009932162087, y:-0.49571957968876995},
	{x:-0.08413132502626412, y:-0.4971829697497094},
	{x:-0.06681321800389307, y:-0.4983423561727347},
	{x:-0.04920770748245041, y:-0.4992114723017349},
	{x:-0.031991928481991616, y:-0.4997568905932867},
	{x:-0.014490752414263416, y:-0.5},
	{x:0.0030501545744671126, y:-0.4999425098848908},
	{x:0.02039741938520644, y:-0.4996213237396803},
	{x:0.03770232267402478, y:-0.4990222394848948},
	{x:0.05511628064477186, y:-0.4981166569448877},
	{x:0.07277060784676129, y:-0.4968631240665222},
	{x:0.08992982040500365, y:-0.49529304248149864},
	{x:0.10725018385148882, y:-0.4933243627650516},
	{x:0.12466990787867718, y:-0.4909175796385897},
	{x:0.1418185769299978, y:-0.4880866845549477},
	{x:0.1589586715696847, y:-0.48474867844323954},
	{x:0.17577009936889212, y:-0.48089427749806346},
	{x:0.1926106853622995, y:-0.4762866919235523},
	{x:0.20916880439313243, y:-0.47094331566530523},
	{x:0.22541653199548356, y:-0.4648314711568351},
	{x:0.24157312603685124, y:-0.4578024925155547},
	{x:0.2571047003385662, y:-0.45004210779595755},
	{x:0.27223921055258976, y:-0.4414118293738707},
	{x:0.28694690110049603, y:-0.4318768368915616},
	{x:0.30106012778723895, y:-0.4215166863439836},
	{x:0.3144018473561748, y:-0.4103067453717787},
	{x:0.3268428154053652, y:-0.39828612803180286},
	{x:0.3383830319348101, y:-0.38545483432405614},
	{x:0.34917223909269907, y:-0.3716061985262582},
	{x:0.3588977062367744, y:-0.35714163037167884},
	{x:0.36759917240467205, y:-0.3420968949941903},
	{x:0.37531579223641537, y:-0.32650723156981354},
	{x:0.38204989358249347, y:-0.31031070693825935},
	{x:0.3877129694245247, y:-0.2936966042394956},
	{x:0.39231568501893344, y:-0.27703503871465357},
	{x:0.39603171359613254, y:-0.2601511553514822},
	{x:0.3989813728845326, y:-0.2428135099689402},
	{x:0.4011675556523145, y:-0.22538422454748405},
	{x:0.40263836756293003, y:-0.2082733741383122},
	{x:0.40351809050859316, y:-0.19089466508354652},
	{x:0.40383950919535355, y:-0.1732828690411183},
	{x:0.24468822504263765, y:0.23953815858623984},
	{x:0.24468822504263765, y:0.2222193738249712},
	{x:0.24468822504263765, y:0.20471069717463664},
	{x:0.24468822504263765, y:0.18729230174048023},
	{x:0.24468822504263765, y:0.16969616691836417},
	{x:0.24468822504263765, y:0.15255061828142974},
	{x:0.24468822504263765, y:0.13497418757953003},
	{x:0.24468822504263765, y:0.11770072781660622},
	{x:0.24468822504263765, y:0.10026553216225036},
	{x:0.24468822504263765, y:0.08255639618771204},
	{x:0.24468822504263765, y:0.06524786234140958},
	{x:0.24468822504263765, y:0.047925322724024055},
	{x:0.24468822504263765, y:0.030384693806084478},
	{x:0.24468822504263765, y:0.012820671976769598},
	{x:0.24468822504263765, y:-0.004333119989245006},
	{x:0.24468822504263765, y:-0.021756188779642464},
	{x:0.23044072001785712, y:-0.024249341916342104},
	{x:0.2132687951882207, y:-0.023158417673596738},
	{x:0.19577151510457433, y:-0.021983908339026664},
	{x:0.17831094168428677, y:-0.020754920160377405},
	{x:0.1609512417851877, y:-0.01948197229467015},
	{x:0.1434052148240428, y:-0.01814823084401768},
	{x:0.12606205500069817, y:-0.016787249971325496},
	{x:0.10897998779725838, y:-0.015408574837594604},
	{x:0.09146043729460372, y:-0.013958181130221865},
	{x:0.07408325863108521, y:-0.012485754821202382},
	{x:0.056727227856161515, y:-0.010924284172663366},
	{x:0.03947822422811725, y:-0.009184574687365459},
	{x:0.02223592493934732, y:-0.007233384692792825},
	{x:0.004764968721481397, y:-0.005009271273319803},
	{x:-0.01247663091348048, y:-0.0025323604333830356},
	{x:-0.02967983075533469, y:0.0002670307489764471},
	{x:-0.04668307408416323, y:0.0034188818712692056},
	{x:-0.06382387000098491, y:0.0070707987837464945},
	{x:-0.0807951662603415, y:0.011279760253606747},
	{x:-0.09737793063714612, y:0.01620622887857163},
	{x:-0.1138285448572179, y:0.02204285944816658},
	{x:-0.12989521633932088, y:0.028791270419112305},
	{x:-0.14571609343234743, y:0.03663580190157269},
	{x:-0.1605506372219618, y:0.04529167206909793},
	{x:-0.17497030091334334, y:0.05518274937986323},
	{x:-0.18866785044844336, y:0.06626378035543011},
	{x:-0.20101752260398018, y:0.0781420449303585},
	{x:-0.21210468163784263, y:0.09180774966556873},
	{x:-0.2211602473056413, y:0.10667392884592848},
	{x:-0.22825824330493316, y:0.1226865451722212},
	{x:-0.23335419048411601, y:0.13931289100096247},
	{x:-0.23665847198361484, y:0.15639938663964204},
	{x:-0.23835728337601253, y:0.1735275206081974},
	{x:-0.23869438989200956, y:0.1912567481041622},
	{x:-0.23780859895113876, y:0.2084042207637043},
	{x:-0.23554892818361117, y:0.2257031692843524},
	{x:-0.23164421709732355, y:0.24293152257343567},
	{x:-0.22600181919080725, y:0.25937508830897255},
	{x:-0.21847259619340537, y:0.27491172738999403},
	{x:-0.20890289049292615, y:0.2894155995306534},
	{x:-0.1973113443732016, y:0.3025828131025789},
	{x:-0.18422070149842665, y:0.3138871975989102},
	{x:-0.16949253106086296, y:0.32356674407727304},
	{x:-0.15395763218606473, y:0.3313466606637344},
	{x:-0.13792020331115012, y:0.3374688100501013},
	{x:-0.12106192955001072, y:0.34230921314004265},
	{x:-0.10384478046181644, y:0.34592061993470125},
	{x:-0.08680915176530675, y:0.3484181356604514},
	{x:-0.06947116223750417, y:0.3500461424121398},
	{x:-0.05194726284261803, y:0.350897228251474},
	{x:-0.03445558323608957, y:0.3510581307707316},
	{x:-0.017242641810703795, y:0.3505347718657172},
	{x:0.00029199751363490534, y:0.34924918640164415},
	{x:0.017492718535616982, y:0.34720737419399883},
	{x:0.03466309958156092, y:0.34435146202257055},
	{x:0.0517845957672366, y:0.34063945117895594},
	{x:0.06854744713824905, y:0.3361152153138979},
	{x:0.08523624559182388, y:0.3306778825295347},
	{x:0.10155370481593501, y:0.32439957560785665},
	{x:0.11750086373967096, y:0.31728507362267094},
	{x:0.13314531768685348, y:0.3096453150635575},
	{x:0.14852764982500277, y:0.30166698250110957},
	{x:0.1636478601541189, y:0.2933500759353271},
	{x:0.17875982398359488, y:0.2845423938780688},
	{x:0.19360054940128593, y:0.27538436220558826},
	{x:0.2084146392744701, y:0.2657118025253457},
	{x:0.22270829060737457, y:0.2558471334933492},
	{x:0.2367307035284941, y:0.24563211484613046},
]
const w =0.8076843753688199
const h =1

