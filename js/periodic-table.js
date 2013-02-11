var onLoad = function () {
    var periodicTable = document.getElementById('PeriodicTable');

    for (var r = 0; r < 11; ++r) {
        var row = document.createElement('tr');

        for (var c = 0; c < 19; ++c) {
            var tableIndex = c + 19 * r;
            var atomicElement = atomicElements[tableIndex];
            var cell = document.createElement('td');
            cell.id = 'c' + tableIndex.toString();
            cell.className = 'empty';

            if (atomicElement) {
                if (atomicElement.atomicNumber && atomicElement.atomicSymbol && atomicElement.atomicName && atomicElement.description) {
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

                    cell.appendChild(container);
                    cell.className = 'atomicElement ' + atomicTypes[atomicElement.description];
                    cell.onclick = onClick;
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

            row.appendChild(cell);
        }

        periodicTable.appendChild(row);

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
    }
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

    // removes 'c' prefix
    id = domNode.id.slice(1);

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

var containers, showElementContainer;

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

var atomicElements = [
    // row 0
    {},
    { label:{ txt:'1', type:'atomicGroup' } },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    { label:{ txt:'18', type:'atomicGroup' } },

    // row 1
    { label:{ txt:'1', type:'atomicPeriod' } },
    { atomicNumber:1, atomicSymbol:'H', atomicName:'Hydrogen', description:8 },
    { label:{ txt:'2', type:'atomicGroup' } },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    { label:{ txt:'13', type:'atomicGroup' } },
    { label:{ txt:'14', type:'atomicGroup' } },
    { label:{ txt:'15', type:'atomicGroup' } },
    { label:{ txt:'16', type:'atomicGroup' } },
    { label:{ txt:'17', type:'atomicGroup' } },
    { atomicNumber:2, atomicSymbol:'He', atomicName:'Helium', description:10 },

    // row 2
    { label:{ txt:'2', type:'atomicPeriod' } },
    { atomicNumber:3, atomicSymbol:'Li', atomicName:'Lithium', description:1 },
    { atomicNumber:4, atomicSymbol:'Be', atomicName:'Beryllium', description:2 },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    { atomicNumber:5, atomicSymbol:'B', atomicName:'Boron', description:7 },
    { atomicNumber:6, atomicSymbol:'C', atomicName:'Carbon', description:8 },
    { atomicNumber:7, atomicSymbol:'N', atomicName:'Nitrogen', description:8 },
    { atomicNumber:8, atomicSymbol:'O', atomicName:'Oxygen', description:8 },
    { atomicNumber:9, atomicSymbol:'F', atomicName:'Fluorine', description:9 },
    { atomicNumber:10, atomicSymbol:'Ne', atomicName:'Neon', description:10 },

    // row 3
    { label:{ txt:'3', type:'atomicPeriod' } },
    { atomicNumber:11, atomicSymbol:'Na', atomicName:'Sodium', description:1 },
    { atomicNumber:12, atomicSymbol:'Mg', atomicName:'Magnesium', description:2 },
    { label:{ txt:'3', type:'atomicGroup' } },
    { label:{ txt:'4', type:'atomicGroup' } },
    { label:{ txt:'5', type:'atomicGroup' } },
    { label:{ txt:'6', type:'atomicGroup' } },
    { label:{ txt:'7', type:'atomicGroup' } },
    { label:{ txt:'8', type:'atomicGroup' } },
    { label:{ txt:'9', type:'atomicGroup' } },
    { label:{ txt:'10', type:'atomicGroup' } },
    { label:{ txt:'11', type:'atomicGroup' } },
    { label:{ txt:'12', type:'atomicGroup' } },
    { atomicNumber:13, atomicSymbol:'Al', atomicName:'Aluminum', description:6 },
    { atomicNumber:14, atomicSymbol:'Si', atomicName:'Silicon', description:7 },
    { atomicNumber:15, atomicSymbol:'P', atomicName:'Phosphorus', description:8 },
    { atomicNumber:16, atomicSymbol:'S', atomicName:'Sulfur', description:8 },
    { atomicNumber:17, atomicSymbol:'Cl', atomicName:'Chlorine', description:9 },
    { atomicNumber:18, atomicSymbol:'Ar', atomicName:'Argon', description:10 },

    // row 4
    { label:{ txt:'4', type:'atomicPeriod' } },
    { atomicNumber:19, atomicSymbol:'K', atomicName:'Potassium', description:1 },
    { atomicNumber:20, atomicSymbol:'Ca', atomicName:'Calcium', description:2 },
    { atomicNumber:21, atomicSymbol:'Sc', atomicName:'Scandium', description:5 },
    { atomicNumber:22, atomicSymbol:'Ti', atomicName:'Titanium', description:5 },
    { atomicNumber:23, atomicSymbol:'V', atomicName:'Vanadium', description:5 },
    { atomicNumber:24, atomicSymbol:'Cr', atomicName:'Chromium', description:5 },
    { atomicNumber:25, atomicSymbol:'Mn', atomicName:'Manganese', description:5 },
    { atomicNumber:26, atomicSymbol:'Fe', atomicName:'Iron', description:5 },
    { atomicNumber:27, atomicSymbol:'Co', atomicName:'Cobalt', description:5 },
    { atomicNumber:28, atomicSymbol:'Ni', atomicName:'Nickel', description:5 },
    { atomicNumber:29, atomicSymbol:'Cu', atomicName:'Copper', description:5 },
    { atomicNumber:30, atomicSymbol:'Zn', atomicName:'Zinc', description:5 },
    { atomicNumber:31, atomicSymbol:'Ga', atomicName:'Gallium', description:6 },
    { atomicNumber:32, atomicSymbol:'Ge', atomicName:'Germanium', description:7 },
    { atomicNumber:33, atomicSymbol:'As', atomicName:'Arsenic', description:7 },
    { atomicNumber:34, atomicSymbol:'Se', atomicName:'Selenium', description:8 },
    { atomicNumber:35, atomicSymbol:'Br', atomicName:'Bromine', description:9 },
    { atomicNumber:36, atomicSymbol:'Kr', atomicName:'Krypton', description:10 },

    // row 5
    { label:{ txt:'5', type:'atomicPeriod' } },
    { atomicNumber:37, atomicSymbol:'Rb', atomicName:'Rubidium', description:1 },
    { atomicNumber:38, atomicSymbol:'Sr', atomicName:'Strontium', description:2 },
    { atomicNumber:39, atomicSymbol:'Y', atomicName:'Yttrium', description:5 },
    { atomicNumber:40, atomicSymbol:'Zr', atomicName:'Zirconium', description:5 },
    { atomicNumber:41, atomicSymbol:'Nb', atomicName:'Niobium', description:5 },
    { atomicNumber:42, atomicSymbol:'Mo', atomicName:'Molybdenum', description:5 },
    { atomicNumber:43, atomicSymbol:'Tc', atomicName:'Technetium', description:5 },
    { atomicNumber:44, atomicSymbol:'Ru', atomicName:'Ruthenium', description:5 },
    { atomicNumber:45, atomicSymbol:'Rh', atomicName:'Rhodium', description:5 },
    { atomicNumber:46, atomicSymbol:'Pd', atomicName:'Palladium', description:5 },
    { atomicNumber:47, atomicSymbol:'Ag', atomicName:'Silver', description:5 },
    { atomicNumber:48, atomicSymbol:'Cd', atomicName:'Cadmium', description:5 },
    { atomicNumber:49, atomicSymbol:'In', atomicName:'Indium', description:6 },
    { atomicNumber:50, atomicSymbol:'Sn', atomicName:'Tin', description:6 },
    { atomicNumber:51, atomicSymbol:'Sb', atomicName:'Antimony', description:7 },
    { atomicNumber:52, atomicSymbol:'Te', atomicName:'Tellurium', description:7 },
    { atomicNumber:53, atomicSymbol:'I', atomicName:'Iodine', description:9 },
    { atomicNumber:54, atomicSymbol:'Xe', atomicName:'Xenon', description:10 },

    // row 6
    { label:{ txt:'6', type:'atomicPeriod' } },
    { atomicNumber:55, atomicSymbol:'Cs', atomicName:'Cesium', description:1 },
    { atomicNumber:56, atomicSymbol:'Ba', atomicName:'Barium', description:2 },
    { label:{ txt:'57-71', type:'atomicRange' } },
    { atomicNumber:72, atomicSymbol:'Hf', atomicName:'Hafnium', description:5 },
    { atomicNumber:73, atomicSymbol:'Ta', atomicName:'Tantalum', description:5 },
    { atomicNumber:74, atomicSymbol:'W', atomicName:'Tungsten', description:5 },
    { atomicNumber:75, atomicSymbol:'Re', atomicName:'Rhenium', description:5 },
    { atomicNumber:76, atomicSymbol:'Os', atomicName:'Osmium', description:5 },
    { atomicNumber:77, atomicSymbol:'Ir', atomicName:'Iridium', description:5 },
    { atomicNumber:78, atomicSymbol:'Pt', atomicName:'Platinum', description:5 },
    { atomicNumber:79, atomicSymbol:'Au', atomicName:'Gold', description:5 },
    { atomicNumber:80, atomicSymbol:'Hg', atomicName:'Mercury', description:5 },
    { atomicNumber:81, atomicSymbol:'Tl', atomicName:'Thallium', description:6 },
    { atomicNumber:82, atomicSymbol:'Pb', atomicName:'Lead', description:6 },
    { atomicNumber:83, atomicSymbol:'Bi', atomicName:'Bismuth', description:6 },
    { atomicNumber:84, atomicSymbol:'Po', atomicName:'Polonium', description:6 },
    { atomicNumber:85, atomicSymbol:'At', atomicName:'Astatine', description:9 },
    { atomicNumber:86, atomicSymbol:'Rn', atomicName:'Radon', description:10 },

    // row 7
    { label:{ txt:'7', type:'atomicPeriod' } },
    { atomicNumber:87, atomicSymbol:'Fr', atomicName:'Francium', description:1 },
    { atomicNumber:88, atomicSymbol:'Ra', atomicName:'Radium', description:2 },
    { label:{ txt:'89-103', type:'atomicRange' } },
    { atomicNumber:104, atomicSymbol:'Rf', atomicName:'Rutherfordium', description:5 },
    { atomicNumber:105, atomicSymbol:'Db', atomicName:'Dubnium', description:5 },
    { atomicNumber:106, atomicSymbol:'Sg', atomicName:'Seaborgium', description:5 },
    { atomicNumber:107, atomicSymbol:'Bh', atomicName:'Bohrium', description:5 },
    { atomicNumber:108, atomicSymbol:'Hs', atomicName:'Hassium', description:5 },
    { atomicNumber:109, atomicSymbol:'Mt', atomicName:'Meitnerium', description:11 },
    { atomicNumber:110, atomicSymbol:'Ds', atomicName:'Darmstadtium', description:11 },
    { atomicNumber:111, atomicSymbol:'Rg', atomicName:'Roentgenium', description:11 },
    { atomicNumber:112, atomicSymbol:'Cn', atomicName:'Copernicium', description:5 },
    { atomicNumber:113, atomicSymbol:'Uut', atomicName:'Ununtrium', description:11 },
    { atomicNumber:114, atomicSymbol:'Fl', atomicName:'Flerovium', description:11 },
    { atomicNumber:115, atomicSymbol:'Uup', atomicName:'Ununpentium', description:11 },
    { atomicNumber:116, atomicSymbol:'Lv', atomicName:'Livermorium', description:11 },
    { atomicNumber:117, atomicSymbol:'Uus', atomicName:'Ununseptium', description:11 },
    { atomicNumber:118, atomicSymbol:'Uuo', atomicName:'Ununoctium', description:11 },

    // row 8
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},

    // row 9
    {},
    {},
    {},
    { atomicNumber:57, atomicSymbol:'La', atomicName:'Lanthanum', description:3 },
    { atomicNumber:58, atomicSymbol:'Ce', atomicName:'Cerium', description:3 },
    { atomicNumber:59, atomicSymbol:'Pr', atomicName:'Praseodymium', description:3 },
    { atomicNumber:60, atomicSymbol:'Nd', atomicName:'Neodymium', description:3 },
    { atomicNumber:61, atomicSymbol:'Pm', atomicName:'Promethium', description:3 },
    { atomicNumber:62, atomicSymbol:'Sm', atomicName:'Samarium', description:3 },
    { atomicNumber:63, atomicSymbol:'Eu', atomicName:'Europium', description:3 },
    { atomicNumber:64, atomicSymbol:'Gd', atomicName:'Gadolinium', description:3 },
    { atomicNumber:65, atomicSymbol:'Tb', atomicName:'Terbium', description:3 },
    { atomicNumber:66, atomicSymbol:'Dy', atomicName:'Dysprosium', description:3 },
    { atomicNumber:67, atomicSymbol:'Ho', atomicName:'Holmium', description:3 },
    { atomicNumber:68, atomicSymbol:'Er', atomicName:'Erbium', description:3 },
    { atomicNumber:69, atomicSymbol:'Tm', atomicName:'Thulium', description:3 },
    { atomicNumber:70, atomicSymbol:'Yb', atomicName:'Ytterbium', description:3 },
    { atomicNumber:71, atomicSymbol:'Lu', atomicName:'Lutetium', description:3 },
    {},

    // row 10
    {},
    {},
    {},
    { atomicNumber:89, atomicSymbol:'Ac', atomicName:'Actinium', description:4 },
    { atomicNumber:90, atomicSymbol:'Th', atomicName:'Thorium', description:4 },
    { atomicNumber:91, atomicSymbol:'Pa', atomicName:'Protactinium', description:4 },
    { atomicNumber:92, atomicSymbol:'U', atomicName:'Uranium', description:4 },
    { atomicNumber:93, atomicSymbol:'Np', atomicName:'Neptunium', description:4 },
    { atomicNumber:94, atomicSymbol:'Pu', atomicName:'Plutonium', description:4 },
    { atomicNumber:95, atomicSymbol:'Am', atomicName:'Americium', description:4 },
    { atomicNumber:96, atomicSymbol:'Cm', atomicName:'Curium', description:4 },
    { atomicNumber:97, atomicSymbol:'Bk', atomicName:'Berkelium', description:4 },
    { atomicNumber:98, atomicSymbol:'Cf', atomicName:'Californium', description:4 },
    { atomicNumber:99, atomicSymbol:'Es', atomicName:'Einsteinium', description:4 },
    { atomicNumber:100, atomicSymbol:'Fm', atomicName:'Fermium', description:4 },
    { atomicNumber:101, atomicSymbol:'Md', atomicName:'Mendelevium', description:4 },
    { atomicNumber:102, atomicSymbol:'No', atomicName:'Nobelium', description:4 },
    { atomicNumber:103, atomicSymbol:'Lr', atomicName:'Lawrencium', description:4 },
    {}
];