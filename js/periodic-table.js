window.PeriodicTable = ( function(PeriodicTable) {
    var onLoad = function () {
		var periodicTable = document.getElementById('PeriodicTable');

		for (var r = 0; r < 11; ++r) {
			var row = document.createElement('tr');

			for (var c = 0; c < 19; ++c) {
				var tableIndex = c + 19 * r;
				var cell = document.createElement('td');
				cell.id = 'c' + tableIndex.toString();
				cell.className = 'empty';

				row.appendChild(cell);
			}
			
			periodicTable.appendChild(row);
		}
		
		for (var e = 0; e < atomicElements.length; ++e) {
			atomicElement = atomicElements[e];
			cell = document.getElementById('c' + atomicElement.tableIndex.toString());
			
			if (atomicElement.atomicNumber) {
				var container, atomicNumberDiv, atomicSymbolDiv, atomicNameDiv;
				var atomicNumberTxt, atomicSymbolTxt, atomicNameTxt;

				atomicNumberTxt = document.createTextNode(atomicElement.atomicNumber.toString());
				atomicSymbolTxt = document.createTextNode(atomicElement.atomicSymbol);
				atomicNameTxt = document.createTextNode(atomicElement.atomicName);

				atomicNumberDiv = document.createElement('div');
				atomicNumberDiv.className = 'atomicNumber';
				atomicNumberDiv.appendChild(atomicNumberTxt);

				atomicSymbolDiv = document.createElement('div');
				atomicSymbolDiv.className = 'atomicSymbol';
				atomicSymbolDiv.appendChild(atomicSymbolTxt);

				atomicNameDiv = document.createElement('div');
				atomicNameDiv.className = 'atomicName';
				atomicNameDiv.appendChild(atomicNameTxt);

				container = document.createElement('div');
				container.appendChild(atomicNumberDiv);
				container.appendChild(atomicSymbolDiv);
				container.appendChild(atomicNameDiv);

				// 
				cell.id='e' + e.toString();
				cell.appendChild(container);
				cell.className = 'atomicElement ' + atomicTypes[atomicElement.description];
				cell.addEventListener('click', onClick);
			}
			else {
				if (atomicElement.label) {
					var labelDiv;
					var labelTxt;

					labelTxt = document.createTextNode(atomicElement.label.txt);

					labelDiv = document.createElement('div');
					labelDiv.appendChild(labelTxt);

					cell.className = atomicElement.label.type;
					cell.appendChild(labelDiv);
				}
			}
		}
		
		containers = {
			atomicNumber:document.getElementsByClassName('atomicNumber'),
			atomicSymbol:document.getElementsByClassName('atomicSymbol'),
			atomicName:document.getElementsByClassName('atomicName')
		};

		showElementContainer = {
		   showElement:document.getElementById('showElement'),
		   atomicNumber:document.getElementById('showElementAtomicNumber'),
		   atomicSymbol:document.getElementById('showElementAtomicSymbol'),
		   atomicName:document.getElementById('showElementAtomicName')
		};
	};

	var onChange = function (elem) {
		if (elem.name) {
			var atomicElements = containers[elem.name];
			var len = atomicElements.length;

			for (var n = 0; n < len; ++n) {
				atomicElements[n].style.visibility = elem.checked ? 'visible' : 'hidden';
			}
		}
	};

	var onClick = function (evt) {
		var id, domNode = evt.target;

		// loop until id is found
		while (!domNode.id) {
			domNode = domNode.parentNode;
		}

		// removes 'c[n]_' prefix
		id = domNode.id;
		id = id.slice(1);

		var atomicElement = atomicElements[id];

		showElementContainer.showElement.className = 'atomicElement ' + atomicTypes[atomicElement.description];
		showElementContainer.atomicNumber.textContent = atomicElement.atomicNumber;
		showElementContainer.atomicSymbol.textContent = atomicElement.atomicSymbol;
		showElementContainer.atomicName.textContent = atomicElement.atomicName;
	};

	var clearShowElement = function () {
		showElementContainer.showElement.className = 'atomicElement';
		showElementContainer.atomicNumber.textContent = '';
		showElementContainer.atomicSymbol.textContent = '';
		showElementContainer.atomicName.textContent = '';
	};

	// some 'static' variables used in multiple functions
	var containers, showElementContainer;

	// an 'enum' of the types of elements
	// determines visual style of element's table cell
	var atomicTypes = [
		'empty',
		'alkali',
		'alkaliEarth',
		'lanthanide',
		'actinide',
		'transition',
		'postTransition',
		'metalloid',
		'nonMetal',
		'halogen',
		'nobleGas',
		'unknown'
	];

	// contains all the data for the elements
	var atomicElements = [
		{"label":{"txt":"1","type":"atomicGroup","tableIndex":2},"tableIndex":1},
		{"label":{"txt":"18","type":"atomicGroup"},"tableIndex":18},
		{"label":{"txt":"1","type":"atomicPeriod"},"tableIndex":19},
		{"atomicNumber":1,"atomicSymbol":"H","atomicName":"Hydrogen","description":8,"tableIndex":20},
		{"label":{"txt":"2","type":"atomicGroup"},"tableIndex":21},
		{"label":{"txt":"13","type":"atomicGroup"},"tableIndex":32},
		{"label":{"txt":"14","type":"atomicGroup"},"tableIndex":33},
		{"label":{"txt":"15","type":"atomicGroup"},"tableIndex":34},
		{"label":{"txt":"16","type":"atomicGroup"},"tableIndex":35},
		{"label":{"txt":"17","type":"atomicGroup"},"tableIndex":36},
		{"atomicNumber":2,"atomicSymbol":"He","atomicName":"Helium","description":10,"tableIndex":37},
		{"label":{"txt":"2","type":"atomicPeriod"},"tableIndex":38},
		{"atomicNumber":3,"atomicSymbol":"Li","atomicName":"Lithium","description":1,"tableIndex":39},
		{"atomicNumber":4,"atomicSymbol":"Be","atomicName":"Beryllium","description":2,"tableIndex":40},
		{"atomicNumber":5,"atomicSymbol":"B","atomicName":"Boron","description":7,"tableIndex":51},
		{"atomicNumber":6,"atomicSymbol":"C","atomicName":"Carbon","description":8,"tableIndex":52},
		{"atomicNumber":7,"atomicSymbol":"N","atomicName":"Nitrogen","description":8,"tableIndex":53},
		{"atomicNumber":8,"atomicSymbol":"O","atomicName":"Oxygen","description":8,"tableIndex":54},
		{"atomicNumber":9,"atomicSymbol":"F","atomicName":"Fluorine","description":9,"tableIndex":55},
		{"atomicNumber":10,"atomicSymbol":"Ne","atomicName":"Neon","description":10,"tableIndex":56},
		{"label":{"txt":"3","type":"atomicPeriod"},"tableIndex":57},
		{"atomicNumber":11,"atomicSymbol":"Na","atomicName":"Sodium","description":1,"tableIndex":58},
		{"atomicNumber":12,"atomicSymbol":"Mg","atomicName":"Magnesium","description":2,"tableIndex":59},
		{"label":{"txt":"3","type":"atomicGroup"},"tableIndex":60},
		{"label":{"txt":"4","type":"atomicGroup"},"tableIndex":61},
		{"label":{"txt":"5","type":"atomicGroup"},"tableIndex":62},
		{"label":{"txt":"6","type":"atomicGroup"},"tableIndex":63},
		{"label":{"txt":"7","type":"atomicGroup"},"tableIndex":64},
		{"label":{"txt":"8","type":"atomicGroup"},"tableIndex":65},
		{"label":{"txt":"9","type":"atomicGroup"},"tableIndex":66},
		{"label":{"txt":"10","type":"atomicGroup"},"tableIndex":67},
		{"label":{"txt":"11","type":"atomicGroup"},"tableIndex":68},
		{"label":{"txt":"12","type":"atomicGroup"},"tableIndex":69},
		{"atomicNumber":13,"atomicSymbol":"Al","atomicName":"Aluminum","description":6,"tableIndex":70},
		{"atomicNumber":14,"atomicSymbol":"Si","atomicName":"Silicon","description":7,"tableIndex":71},
		{"atomicNumber":15,"atomicSymbol":"P","atomicName":"Phosphorus","description":8,"tableIndex":72},
		{"atomicNumber":16,"atomicSymbol":"S","atomicName":"Sulfur","description":8,"tableIndex":73},
		{"atomicNumber":17,"atomicSymbol":"Cl","atomicName":"Chlorine","description":9,"tableIndex":74},
		{"atomicNumber":18,"atomicSymbol":"Ar","atomicName":"Argon","description":10,"tableIndex":75},
		{"label":{"txt":"4","type":"atomicPeriod"},"tableIndex":76},
		{"atomicNumber":19,"atomicSymbol":"K","atomicName":"Potassium","description":1,"tableIndex":77},
		{"atomicNumber":20,"atomicSymbol":"Ca","atomicName":"Calcium","description":2,"tableIndex":78},
		{"atomicNumber":21,"atomicSymbol":"Sc","atomicName":"Scandium","description":5,"tableIndex":79},
		{"atomicNumber":22,"atomicSymbol":"Ti","atomicName":"Titanium","description":5,"tableIndex":80},
		{"atomicNumber":23,"atomicSymbol":"V","atomicName":"Vanadium","description":5,"tableIndex":81},
		{"atomicNumber":24,"atomicSymbol":"Cr","atomicName":"Chromium","description":5,"tableIndex":82},
		{"atomicNumber":25,"atomicSymbol":"Mn","atomicName":"Manganese","description":5,"tableIndex":83},
		{"atomicNumber":26,"atomicSymbol":"Fe","atomicName":"Iron","description":5,"tableIndex":84},
		{"atomicNumber":27,"atomicSymbol":"Co","atomicName":"Cobalt","description":5,"tableIndex":85},
		{"atomicNumber":28,"atomicSymbol":"Ni","atomicName":"Nickel","description":5,"tableIndex":86},
		{"atomicNumber":29,"atomicSymbol":"Cu","atomicName":"Copper","description":5,"tableIndex":87},
		{"atomicNumber":30,"atomicSymbol":"Zn","atomicName":"Zinc","description":5,"tableIndex":88},
		{"atomicNumber":31,"atomicSymbol":"Ga","atomicName":"Gallium","description":6,"tableIndex":89},
		{"atomicNumber":32,"atomicSymbol":"Ge","atomicName":"Germanium","description":7,"tableIndex":90},
		{"atomicNumber":33,"atomicSymbol":"As","atomicName":"Arsenic","description":7,"tableIndex":91},
		{"atomicNumber":34,"atomicSymbol":"Se","atomicName":"Selenium","description":8,"tableIndex":92},
		{"atomicNumber":35,"atomicSymbol":"Br","atomicName":"Bromine","description":9,"tableIndex":93},
		{"atomicNumber":36,"atomicSymbol":"Kr","atomicName":"Krypton","description":10,"tableIndex":94},
		{"label":{"txt":"5","type":"atomicPeriod"},"tableIndex":95},
		{"atomicNumber":37,"atomicSymbol":"Rb","atomicName":"Rubidium","description":1,"tableIndex":96},
		{"atomicNumber":38,"atomicSymbol":"Sr","atomicName":"Strontium","description":2,"tableIndex":97},
		{"atomicNumber":39,"atomicSymbol":"Y","atomicName":"Yttrium","description":5,"tableIndex":98},
		{"atomicNumber":40,"atomicSymbol":"Zr","atomicName":"Zirconium","description":5,"tableIndex":99},
		{"atomicNumber":41,"atomicSymbol":"Nb","atomicName":"Niobium","description":5,"tableIndex":100},
		{"atomicNumber":42,"atomicSymbol":"Mo","atomicName":"Molybdenum","description":5,"tableIndex":101},
		{"atomicNumber":43,"atomicSymbol":"Tc","atomicName":"Technetium","description":5,"tableIndex":102},
		{"atomicNumber":44,"atomicSymbol":"Ru","atomicName":"Ruthenium","description":5,"tableIndex":103},
		{"atomicNumber":45,"atomicSymbol":"Rh","atomicName":"Rhodium","description":5,"tableIndex":104},
		{"atomicNumber":46,"atomicSymbol":"Pd","atomicName":"Palladium","description":5,"tableIndex":105},
		{"atomicNumber":47,"atomicSymbol":"Ag","atomicName":"Silver","description":5,"tableIndex":106},
		{"atomicNumber":48,"atomicSymbol":"Cd","atomicName":"Cadmium","description":5,"tableIndex":107},
		{"atomicNumber":49,"atomicSymbol":"In","atomicName":"Indium","description":6,"tableIndex":108},
		{"atomicNumber":50,"atomicSymbol":"Sn","atomicName":"Tin","description":6,"tableIndex":109},
		{"atomicNumber":51,"atomicSymbol":"Sb","atomicName":"Antimony","description":7,"tableIndex":110},
		{"atomicNumber":52,"atomicSymbol":"Te","atomicName":"Tellurium","description":7,"tableIndex":111},
		{"atomicNumber":53,"atomicSymbol":"I","atomicName":"Iodine","description":9,"tableIndex":112},
		{"atomicNumber":54,"atomicSymbol":"Xe","atomicName":"Xenon","description":10,"tableIndex":113},
		{"label":{"txt":"6","type":"atomicPeriod"},"tableIndex":114},
		{"atomicNumber":55,"atomicSymbol":"Cs","atomicName":"Cesium","description":1,"tableIndex":115},
		{"atomicNumber":56,"atomicSymbol":"Ba","atomicName":"Barium","description":2,"tableIndex":116},
		{"label":{"txt":"57-71","type":"atomicRange"},"tableIndex":117},
		{"atomicNumber":72,"atomicSymbol":"Hf","atomicName":"Hafnium","description":5,"tableIndex":118},
		{"atomicNumber":73,"atomicSymbol":"Ta","atomicName":"Tantalum","description":5,"tableIndex":119},
		{"atomicNumber":74,"atomicSymbol":"W","atomicName":"Tungsten","description":5,"tableIndex":120},
		{"atomicNumber":75,"atomicSymbol":"Re","atomicName":"Rhenium","description":5,"tableIndex":121},
		{"atomicNumber":76,"atomicSymbol":"Os","atomicName":"Osmium","description":5,"tableIndex":122},
		{"atomicNumber":77,"atomicSymbol":"Ir","atomicName":"Iridium","description":5,"tableIndex":123},
		{"atomicNumber":78,"atomicSymbol":"Pt","atomicName":"Platinum","description":5,"tableIndex":124},
		{"atomicNumber":79,"atomicSymbol":"Au","atomicName":"Gold","description":5,"tableIndex":125},
		{"atomicNumber":80,"atomicSymbol":"Hg","atomicName":"Mercury","description":5,"tableIndex":126},
		{"atomicNumber":81,"atomicSymbol":"Tl","atomicName":"Thallium","description":6,"tableIndex":127},
		{"atomicNumber":82,"atomicSymbol":"Pb","atomicName":"Lead","description":6,"tableIndex":128},
		{"atomicNumber":83,"atomicSymbol":"Bi","atomicName":"Bismuth","description":6,"tableIndex":129},
		{"atomicNumber":84,"atomicSymbol":"Po","atomicName":"Polonium","description":6,"tableIndex":130},
		{"atomicNumber":85,"atomicSymbol":"At","atomicName":"Astatine","description":9,"tableIndex":131},
		{"atomicNumber":86,"atomicSymbol":"Rn","atomicName":"Radon","description":10,"tableIndex":132},
		{"label":{"txt":"7","type":"atomicPeriod"},"tableIndex":133},
		{"atomicNumber":87,"atomicSymbol":"Fr","atomicName":"Francium","description":1,"tableIndex":134},
		{"atomicNumber":88,"atomicSymbol":"Ra","atomicName":"Radium","description":2,"tableIndex":135},
		{"label":{"txt":"89-103","type":"atomicRange"},"tableIndex":136},
		{"atomicNumber":104,"atomicSymbol":"Rf","atomicName":"Rutherfordium","description":5,"tableIndex":137},
		{"atomicNumber":105,"atomicSymbol":"Db","atomicName":"Dubnium","description":5,"tableIndex":138},
		{"atomicNumber":106,"atomicSymbol":"Sg","atomicName":"Seaborgium","description":5,"tableIndex":139},
		{"atomicNumber":107,"atomicSymbol":"Bh","atomicName":"Bohrium","description":5,"tableIndex":140},
		{"atomicNumber":108,"atomicSymbol":"Hs","atomicName":"Hassium","description":5,"tableIndex":141},
		{"atomicNumber":109,"atomicSymbol":"Mt","atomicName":"Meitnerium","description":11,"tableIndex":142},
		{"atomicNumber":110,"atomicSymbol":"Ds","atomicName":"Darmstadtium","description":11,"tableIndex":143},
		{"atomicNumber":111,"atomicSymbol":"Rg","atomicName":"Roentgenium","description":11,"tableIndex":144},
		{"atomicNumber":112,"atomicSymbol":"Cn","atomicName":"Copernicium","description":5,"tableIndex":145},
		{"atomicNumber":113,"atomicSymbol":"Uut","atomicName":"Ununtrium","description":11,"tableIndex":146},
		{"atomicNumber":114,"atomicSymbol":"Fl","atomicName":"Flerovium","description":11,"tableIndex":147},
		{"atomicNumber":115,"atomicSymbol":"Uup","atomicName":"Ununpentium","description":11,"tableIndex":148},
		{"atomicNumber":116,"atomicSymbol":"Lv","atomicName":"Livermorium","description":11,"tableIndex":149},
		{"atomicNumber":117,"atomicSymbol":"Uus","atomicName":"Ununseptium","description":11,"tableIndex":150},
		{"atomicNumber":118,"atomicSymbol":"Uuo","atomicName":"Ununoctium","description":11,"tableIndex":151},
		{"atomicNumber":57,"atomicSymbol":"La","atomicName":"Lanthanum","description":3,"tableIndex":174},
		{"atomicNumber":58,"atomicSymbol":"Ce","atomicName":"Cerium","description":3,"tableIndex":175},
		{"atomicNumber":59,"atomicSymbol":"Pr","atomicName":"Praseodymium","description":3,"tableIndex":176},
		{"atomicNumber":60,"atomicSymbol":"Nd","atomicName":"Neodymium","description":3,"tableIndex":177},
		{"atomicNumber":61,"atomicSymbol":"Pm","atomicName":"Promethium","description":3,"tableIndex":178},
		{"atomicNumber":62,"atomicSymbol":"Sm","atomicName":"Samarium","description":3,"tableIndex":179},
		{"atomicNumber":63,"atomicSymbol":"Eu","atomicName":"Europium","description":3,"tableIndex":180},
		{"atomicNumber":64,"atomicSymbol":"Gd","atomicName":"Gadolinium","description":3,"tableIndex":181},
		{"atomicNumber":65,"atomicSymbol":"Tb","atomicName":"Terbium","description":3,"tableIndex":182},
		{"atomicNumber":66,"atomicSymbol":"Dy","atomicName":"Dysprosium","description":3,"tableIndex":183},
		{"atomicNumber":67,"atomicSymbol":"Ho","atomicName":"Holmium","description":3,"tableIndex":184},
		{"atomicNumber":68,"atomicSymbol":"Er","atomicName":"Erbium","description":3,"tableIndex":185},
		{"atomicNumber":69,"atomicSymbol":"Tm","atomicName":"Thulium","description":3,"tableIndex":186},
		{"atomicNumber":70,"atomicSymbol":"Yb","atomicName":"Ytterbium","description":3,"tableIndex":187},
		{"atomicNumber":71,"atomicSymbol":"Lu","atomicName":"Lutetium","description":3,"tableIndex":188},
		{"atomicNumber":89,"atomicSymbol":"Ac","atomicName":"Actinium","description":4,"tableIndex":193},
		{"atomicNumber":90,"atomicSymbol":"Th","atomicName":"Thorium","description":4,"tableIndex":194},
		{"atomicNumber":91,"atomicSymbol":"Pa","atomicName":"Protactinium","description":4,"tableIndex":195},
		{"atomicNumber":92,"atomicSymbol":"U","atomicName":"Uranium","description":4,"tableIndex":196},
		{"atomicNumber":93,"atomicSymbol":"Np","atomicName":"Neptunium","description":4,"tableIndex":197},
		{"atomicNumber":94,"atomicSymbol":"Pu","atomicName":"Plutonium","description":4,"tableIndex":198},
		{"atomicNumber":95,"atomicSymbol":"Am","atomicName":"Americium","description":4,"tableIndex":199},
		{"atomicNumber":96,"atomicSymbol":"Cm","atomicName":"Curium","description":4,"tableIndex":200},
		{"atomicNumber":97,"atomicSymbol":"Bk","atomicName":"Berkelium","description":4,"tableIndex":201},
		{"atomicNumber":98,"atomicSymbol":"Cf","atomicName":"Californium","description":4,"tableIndex":202},
		{"atomicNumber":99,"atomicSymbol":"Es","atomicName":"Einsteinium","description":4,"tableIndex":203},
		{"atomicNumber":100,"atomicSymbol":"Fm","atomicName":"Fermium","description":4,"tableIndex":204},
		{"atomicNumber":101,"atomicSymbol":"Md","atomicName":"Mendelevium","description":4,"tableIndex":205},
		{"atomicNumber":102,"atomicSymbol":"No","atomicName":"Nobelium","description":4,"tableIndex":206},
		{"atomicNumber":103,"atomicSymbol":"Lr","atomicName":"Lawrencium","description":4,"tableIndex":207}
	];

	return { onChange: onChange, onLoad: onLoad, clearShowElement: clearShowElement };
} )();
