// Create emty straininfo object
function MyClass() {};
var strainInfo = new MyClass();
var old_SFSBlink = '';
var old_SFSBname = '';

// Read in Strain/Breeder-IDS and create the first selectbox
function SFselectastrain() {
	document.getElementById('SFSBselect').innerHTML = '<span class="pleasewaitasec">please wait a second...</span>';
	if(typeof BREEDER == "undefined") {
		var thescript = document.createElement('script'); thescript.type = "text/javascript"; thescript.src = 'https:\/\/en.seedfinder.eu\/api\/json\/ids.json?output=1&strains=1'; document.getElementsByTagName('head')[0].appendChild(thescript);
		setTimeout('SFselectBreeder()',1000);
		}
	else {
		SFselectBreeder();
		}
	}

 // Output Breeder Select-Box
function SFselectBreeder() {
	document.getElementById('SFSBselect').innerHTML = '';
	var breeselect = document.createElement('select'); breeselect.id = 'sfbreeder'; breeselect.name = 'sfbreeder'; breeselect.size = 1; breeselect.onchange = function(){SFselectStrain();}; document.getElementById('SFSBselect').appendChild(breeselect);
	var firstBree = document.createElement('option'); firstBree.id = 'nix'; firstBree.name = 'nix'; firstBree.value = 'nix'; firstBree.selected = 'selected'; firstBree.innerHTML = 'please select a breeder'; document.getElementById('sfbreeder').appendChild(firstBree);
	for(var bree in BREEDER) {
		var BreeOpt = document.createElement('option'); BreeOpt.id = bree; BreeOpt.name = bree; BreeOpt.value = bree; BreeOpt.innerHTML = BREEDER[bree].name; document.getElementById('sfbreeder').appendChild(BreeOpt);
		}
	}

// Show selectbox for strains
function SFselectStrain() {
	if(document.getElementById('sfstrains')) {document.getElementById('sfstrains').innerHTML = '';}
	else {
		var strainselect = document.createElement('select'); strainselect.id = 'sfstrains'; strainselect.name = 'sfstrains'; strainselect.size = 1; strainselect.onchange = function(){SFopenStrainInfoBox();}; document.getElementById('SFSBselect').appendChild(strainselect);
		}
	var firstStrai = document.createElement('option'); firstStrai.id = 'nix'; firstStrai.name = 'nix'; firstStrai.value = 'nix'; firstStrai.selected = 'selected'; firstStrai.innerHTML = '...select a strain'; document.getElementById('sfstrains').appendChild(firstStrai);
	var thebreeder = document.getElementById('sfbreeder').value;
	if(thebreeder != 'nix') {
		for(var strainid in BREEDER[thebreeder].strains) {
			var StraiOpt = document.createElement('option'); StraiOpt.id = strainid; StraiOpt.name = strainid; StraiOpt.value = strainid; StraiOpt.innerHTML = BREEDER[thebreeder].strains[strainid]; document.getElementById('sfstrains').appendChild(StraiOpt);
			}
		}
	}

// Switch to boxed version
function SFswitchToBox() {
	if(document.getElementById('SeedFinderStrainBrowser').className == 'Closed') {
		old_SFSBlink = document.getElementById('SFSBlink').innerHTML;
		old_SFSBname = document.getElementById('SFSBname').innerHTML;
		document.getElementById('SeedFinderStrainBrowser').className = 'Boxed';
		document.getElementById('SFSBlink').innerHTML = '';
		document.getElementById('SFSBname').innerHTML = '';
		var thclosea = document.createElement('a'); thclosea.className = 'closethebox'; thclosea.href = '#'; thclosea.onclick = function(){SFcloseStrainInfoBox();}; thclosea.innerHTML = 'X'; document.getElementById('SFSBlink').appendChild(thclosea);
		var thccca = document.createElement('a'); thccca.title = 'Content is licensed below a Creative Commons BY-NC-SA 3.0 License from https:\/\/en.seedfinder.eu\/'; thccca.href = 'https:\/\/en.seedfinder.eu\/'; thccca.id = 'cclink'; document.getElementById('SFSBname').appendChild(thccca);
		var thcccimg = document.createElement('img'); thcccimg.src = 'cchoch.gif'; thcccimg.width = 11; thcccimg.height = 52; thcccimg.alt = 'licence'; document.getElementById('cclink').appendChild(thcccimg);
		var search2 = document.createElement('h2'); search2.id = 'SearchH2'; search2.className = 'imloading'; search2.style.display = 'none'; document.getElementById('SFSBrowser').appendChild(search2);
		var searcdiv = document.createElement('div'); searcdiv.id = 'SFSearchinfo'; searcdiv.style.display = 'none'; document.getElementById('SFSBrowser').appendChild(searcdiv);
		var thinfh2 = document.createElement('h2'); thinfh2.id = 'TheStrainName'; thinfh2.className = 'imloading'; document.getElementById('SFSBrowser').appendChild(thinfh2);
		var thinfdiv = document.createElement('div'); thinfdiv.id = 'SFSBstraininfo'; document.getElementById('SFSBrowser').appendChild(thinfdiv);
		var strainlinkp = document.createElement('p'); strainlinkp.id = 'seedfinderLink'; strainlinkp.style.display = 'none'; document.getElementById('SFSBrowser').appendChild(strainlinkp);
		}
	}

// Close box and switch back to the small select-box
function SFcloseStrainInfoBox() {
	document.getElementById('SeedFinderStrainBrowser').className = 'Closed';
	document.getElementById('SFSBlink').innerHTML = old_SFSBlink;
	document.getElementById('SFSBname').innerHTML = old_SFSBname;
	document.getElementById('SFSBrowser').innerHTML = '';
	}

// Switch to boxed version and read in the search results
function SFshowsearch() {
	var thequery = document.getElementById('SFsearchthis').value;
	thequeryescaped = escape(thequery);
	if(thequeryescaped != "undefined" && thequeryescaped != "") {
		var thescript = document.createElement('script'); thescript.type = "text/javascript"; thescript.src = 'https:\/\/en.seedfinder.eu\/api\/json\/search.json?q=' + thequeryescaped + '&output=1'; document.getElementsByTagName('head')[0].appendChild(thescript);
		// open boxed version if closed
		SFswitchToBox();
		document.getElementById('SearchH2').innerHTML = 'please wait while loading...';
		document.getElementById('SFSearchinfo').innerHTML = '';
		document.getElementById('SearchH2').style.display = 'block';
		document.getElementById('SFSearchinfo').style.display = 'none';
		setTimeout('SFsearchOutput(\'' + thequeryescaped + '\')',1500);
		}
	else {
		alert('Please insert something.');
		}
	}

// Show the search results
function SFsearchOutput(thequeryescaped) {
	if(SFSEARCH.error == false) {
		document.getElementById('SearchH2').innerHTML = SFSEARCH.info;
		if(SFSEARCH.count > 0) {
			document.getElementById('SFSearchinfo').style.display = 'block';
			var strainsUl = document.createElement('ul'); strainsUl.id = 'strainsearchul'; document.getElementById('SFSearchinfo').appendChild(strainsUl);
			for(var onestr in SFSEARCH.strains) {
				var strainsUlli = document.createElement('li'); strainsUlli.innerHTML = '<a href="#TheStrainName" title="Get more info." onClick="SFreadinStrainInfo(\'' + SFSEARCH.strains[onestr].brid + '\',\'' + SFSEARCH.strains[onestr].id + '\')">' + SFSEARCH.strains[onestr].name + ' (from ' + SFSEARCH.strains[onestr].brname + ')</a>'; document.getElementById('strainsearchul').appendChild(strainsUlli);
				}
			}
		}
	else {
		alert(SFSEARCH.error);
		}
	}

// Switch to boxed version and show strain-info
function SFopenStrainInfoBox() {
	var thebreeder = document.getElementById('sfbreeder').value;
	var thestrain = document.getElementById('sfstrains').value;
	if(thestrain != 'nix') {
		// open boxed version if closed
		SFswitchToBox();
		// read in and show strain info
		SFreadinStrainInfo(thebreeder,thestrain);
		}
	}

// Read in Strain-Info JSON onto the first click, or directly go to the output if JSON was loaded before
function SFreadinStrainInfo(thebreeder,thestrain) {
	var seedid = thebreeder + '_-_' + thestrain;
	document.getElementById('TheStrainName').innerHTML = 'please wait while loading...';
	document.getElementById('SFSBstraininfo').innerHTML = '';
	document.getElementById('seedfinderLink').innerHTML = '';

	if(typeof strainInfo[seedid] == "object") {
		SFStrainInfoOutput('' + seedid + '');
		}
	else {
		var infoscript = document.createElement('script');
		infoscript.type="text/javascript";
		infoscript.src = 'https:\/\/en.seedfinder.eu\/api\/json\/strain.json?br=' + thebreeder + '&str=' + thestrain + '&parents=1&hybrids=1&output=1&comments=3&commlng=es|fr|en|de&reviews=1&tasting=1&medical=1&pics=1&piecharts=1&chsize=100&chcol=dee6d9';
		document.getElementsByTagName('head')[0].appendChild(infoscript);
		// wait 1.5 seconds before adding the straininfo to the object
		setTimeout('SFStrainInfoOutput(\'' + seedid + '\')',1500);
		}
	}

// Strain-Info Output
function SFStrainInfoOutput(seedid) {
	// Add straininfo to strain-object if new
	if(typeof strainInfo[seedid] == "undefined" && typeof STRAIN == "object") {
		strainInfo[seedid] = STRAIN;
		}

	// Output Straininfos (if available for the selected strain)
	if(typeof strainInfo[seedid] == "object") {
		// Name
		document.getElementById('TheStrainName').innerHTML = strainInfo[seedid].name + ' (from ' + strainInfo[seedid].brinfo.name + ')';
		document.getElementById('TheStrainName').className = 'strainname';

		// Breeders description
		var StrInfoBreeDescr = '&nbsp;';
		if(strainInfo[seedid].brinfo.descr != false) {
			StrInfoBreeDescr = strainInfo[seedid].brinfo.descr;
			}
		// create empty breeders p
		var descrp = document.createElement('p');
		descrp.id = 'BreedersDescr';
		document.getElementById('SFSBstraininfo').appendChild(descrp);
		// + span for type and flowering time
		var FloweringTime = 'unknown';
		if(strainInfo[seedid].brinfo.flowering.days != false) {
			FloweringTime = '~' + strainInfo[seedid].brinfo.flowering.days + ' days';
			if(strainInfo[seedid].brinfo.flowering.auto == true) {
				FloweringTime = FloweringTime + '<br />from seed to harvest - Autoflowering Strain!';
				}
			}
		var descrpspanInfo = document.createElement('span');
		descrpspanInfo.className = 'infobox';
		descrpspanInfo.id = 'infobox';
		descrpspanInfo.innerHTML = '<strong>Type:</strong> ' + strainInfo[seedid].brinfo.type + '<br /><strong>Flowering time:</strong> ' + FloweringTime;
		document.getElementById('BreedersDescr').appendChild(descrpspanInfo);

		// + picture if available
		if(strainInfo[seedid].pics != false) {
			// add newest user picture
			var imglinktitle = "";
			var theimgsrc = "";
			var imgalt = "";
			for(var picid in strainInfo[seedid].pics) {
				imgalt = strainInfo[seedid].name + ' (Picture from ' + strainInfo[seedid].pics[picid].user + '.)';
				imglinktitle = strainInfo[seedid].name + ' (Picture from ' + strainInfo[seedid].pics[picid].user + '.) Click to show the full picture.';
				theimgsrc = 'https:\/\/en.seedfinder.eu\/seedlist\/pics\/galerie\/' + strainInfo[seedid].brinfo.id + '\/' + strainInfo[seedid].id + '\/' + picid + '.jpg';
				// nur eins
				break;
				}
			var abreak = document.createElement('br'); document.getElementById('infobox').appendChild(abreak);
			var picplusa = document.createElement('a'); picplusa.title = imglinktitle; picplusa.id = 'piclink'; picplusa.href = 'https:\/\/en.seedfinder.eu\/strain-info\/' + strainInfo[seedid].id + '\/' + strainInfo[seedid].brinfo.id + '\/gallery\/' + picid + '\/'; document.getElementById('infobox').appendChild(picplusa);
			var strainpic = document.createElement('img'); strainpic.src = theimgsrc; strainpic.alt = imgalt; document.getElementById('piclink').appendChild(strainpic);
			}
		else {
			// add breeder picture
			if(strainInfo[seedid].brinfo.pic != false) {
				var abreak = document.createElement('br'); document.getElementById('infobox').appendChild(abreak);
				var strainpic = document.createElement('img'); strainpic.src = strainInfo[seedid].brinfo.pic; strainpic.alt = 'breeders picture'; document.getElementById('infobox').appendChild(strainpic);
				}
			}

		// + span for breeders description
		var descrpspantex = document.createElement('span');	descrpspantex.className = 'BreedersDescription'; descrpspantex.innerHTML = StrInfoBreeDescr;	document.getElementById('BreedersDescr').appendChild(descrpspantex);

		// Parents
		if(strainInfo[seedid].parents != false && typeof strainInfo[seedid].parents == "object") {
			OutputTheParents(strainInfo[seedid].parents);
			}
		// Hybrids
		if(strainInfo[seedid].hybrids != false && typeof strainInfo[seedid].hybrids == "object") {
			OutputTheHybrids(strainInfo[seedid].hybrids);
			}
		// Reviews + Tasting
		if(strainInfo[seedid].reviews != false && typeof strainInfo[seedid].reviews == "object") {
			OutputTheReview(strainInfo[seedid].reviews);
			}
		// Medicinal Info
		if(strainInfo[seedid].medical != false && typeof strainInfo[seedid].medical == "object") {
			OutputMedicalInfo(strainInfo[seedid].medical);
			}
		// User-Comments
		if(strainInfo[seedid].comments != false && typeof strainInfo[seedid].comments == "object") {
			OutputUserComments(strainInfo[seedid].comments);
			}

		// Add Link to the Straininfo on seedfinder.eu
		var strlnk = document.createElement('a'); strlnk.href = 'https:\/\/en.seedfinder.eu\/strain-info\/' + strainInfo[seedid].id + '\/' + strainInfo[seedid].brinfo.id + '\/'; strlnk.innerHTML = 'https:\/\/en.seedfinder.eu\/strain-info\/' + strainInfo[seedid].id + '\/' + strainInfo[seedid].brinfo.id + '\/'; strlnk.title = 'Visit SeedFinders strain-description.';
		document.getElementById('seedfinderLink').innerHTML = '...more info about this strain: ';
		document.getElementById('seedfinderLink').appendChild(strlnk);
		document.getElementById('seedfinderLink').style.display = 'block';
		}
	}

// Output Parents
function OutputTheParents(parents) {
	var theParentsVar = parents.info;
	var thevar = '/' + parID + '/gi';
	for(var parID in parents.strains) {
		var brname = parents.strains[parID].brid.replace(/_/g, " ");
		thevar = eval('/' + parID + '/g');
		var thereplace = '<a onClick="SFreadinStrainInfo(\'' + parents.strains[parID].brid + '\',\'' + parents.strains[parID].id + '\')" href="#SFSBstraininfo" title="' + parents.strains[parID].name + ' (' + brname + ')">' + parents.strains[parID].name + '</a>';
		theParentsVar = theParentsVar.replace(thevar,thereplace);
		}
	theParentsVar = '<strong>Parents:</strong> ' + theParentsVar;
	var parentsp = document.createElement('p'); parentsp.id = 'TheParents'; parentsp.innerHTML = theParentsVar; document.getElementById('SFSBstraininfo').appendChild(parentsp);
	}

// Output Hybrids
function OutputTheHybrids(hybrids) {
	var theHybridsVar = '<strong>Hybrids:</strong>';
	var sortable = [];
	for(var hybID in hybrids) {
		var hybOut = '<a onClick="SFreadinStrainInfo(\'' + hybrids[hybID].brid + '\',\'' + hybrids[hybID].id + '\')" href="#SFSBstraininfo" title="' + hybrids[hybID].name + ' (' + hybrids[hybID].brname + ')">' + hybrids[hybID].name + '</a>';
		var sortbyid = hybrids[hybID].id + hybrids[hybID].brid;
		sortable.push([sortbyid, hybOut]);
		}
	sortable.sort();
	hy = 0;
	for(var alphaH in sortable) {
		if(hy != 0) {theHybridsVar = theHybridsVar + ';';}
		theHybridsVar = theHybridsVar + ' ' + sortable[alphaH][1];
		hy++;
		}
	var hybsp = document.createElement('p'); hybsp.id = 'TheHybrids'; hybsp.innerHTML = theHybridsVar; document.getElementById('SFSBstraininfo').appendChild(hybsp);
	}

// Output User Reviews
function OutputTheReview(rev) {
	var ush3 = document.createElement('h3'); ush3.className = 'userreviewh3'; ush3.innerHTML = rev.count.val + ' user reviews about this strain'; document.getElementById('SFSBstraininfo').appendChild(ush3);
	var revpTi = document.createElement('div'); revpTi.id = 'userreviews'; document.getElementById('SFSBstraininfo').appendChild(revpTi);

	var revTitle =  '<strong>' + rev.average.title + ':</strong> <abbr title="' + rev.average.val + ' from 10 points">' + rev.average.info + '</abbr>';
	var revpBewTop = document.createElement('p'); revpBewTop.className = 'userreviewTitle'; revpBewTop.innerHTML = revTitle; document.getElementById('userreviews').appendChild(revpBewTop);

	// Show tastings
	if(rev.tasting != false) {
		// Strength
		if(rev.tasting.strength != false) {
			var revTitle =  '<strong>' + rev.tasting.strength.title + ':</strong> <abbr title="' + rev.tasting.strength.val + ' from 10 points">' + rev.tasting.strength.info + '</abbr>';
			var revpBewTop = document.createElement('p'); revpBewTop.className = 'userreviewTitle'; revpBewTop.innerHTML = revTitle; document.getElementById('userreviews').appendChild(revpBewTop);
			}

		// Effect
		if(rev.tasting.effect != false) {OutputAromaTasteHigh(rev.tasting.effect, 'effect');}
		// Aroma
		if(rev.tasting.smell != false) {OutputAromaTasteHigh(rev.tasting.smell, 'smell');}
		// Taste
		if(rev.tasting.taste != false) {OutputAromaTasteHigh(rev.tasting.taste, 'taste');}
		}

	// Show indoor Reviews
	if(rev.indoor != false) {OutputTheReviewIndoor(rev.indoor);}

	// Show outdoor Reviews
	if(rev.outdoor != false) {OutputTheReviewOutdoor(rev.outdoor);}
	}


// Output Clouds/Piecharts for Taste/Aroma/Effect
function OutputAromaTasteHigh(das,was) {
	var tasth4 = document.createElement('h4'); tasth4.className = 'tastingh4'; tasth4.innerHTML = das.title; document.getElementById('userreviews').appendChild(tasth4);
	var tastp = document.createElement('p'); tastp.className = 'acloud'; tastp.id = was + 'cloud'; document.getElementById('userreviews').appendChild(tastp);
	var piech = document.createElement('img'); piech.src = das.imurl; piech.alt = ''; piech.useMap = '#SFpiechart_' + was; piech.className = 'piechart'; document.getElementById(was + 'cloud').appendChild(piech);
	var piemp = document.createElement('map'); piemp.name = 'SFpiechart_' + was; piemp.id = was + 'map'; piemp.innerHTML = das.immap; document.getElementById(was + 'cloud').appendChild(piemp);
	for(var wert in das.cloud) {
		var clspa = document.createElement('span'); clspa.className = 'cl' + das.cloud[wert].size; clspa.style.color = '#' + das.cloud[wert].color; clspa.title = '~ ' + das.cloud[wert].val + '%'; clspa.innerHTML = das.cloud[wert].title; document.getElementById(was + 'cloud').appendChild(clspa);
		}
	}

// Output User Reviews (Indoor)
function OutputTheReviewIndoor(rev) {
	// Title, average and yield
	OutputTheReviewInAndOutdoorTitleYield(rev,'Indoor');
	// Flowering Time
	if(rev.flowering != false) {
		var flowpi = document.createElement('p'); flowpi.className = 'floweringindoors'; flowpi.innerHTML = '<strong>' + rev.flowering.title + ':</strong> ' + rev.flowering.info; document.getElementById('userreviews').appendChild(flowpi);
		}
	// Stretch
	if(rev.stretch != false) {
		var flowpi = document.createElement('p'); flowpi.className = 'stretch'; flowpi.innerHTML = '<strong>' + rev.stretch.title + ':</strong> ' + rev.stretch.texper + '<br />' + rev.stretch.texcm; document.getElementById('userreviews').appendChild(flowpi);
		}
	}

// Output User Reviews (Outdoor)
function OutputTheReviewOutdoor(rev) {
	// Title, average and yield
	OutputTheReviewInAndOutdoorTitleYield(rev,'Outdoor');
	// Flowering Time
	if(rev.flowering != false) {
		var FlowOut = '<strong>' + rev.flowering.title + ':</strong>';
		for(var zoneId in rev.flowering.zones) {
			FlowOut = FlowOut + '<br />...in [' + zoneId + '] climates: ' + rev.flowering.zones[zoneId].harvest + ' (' + rev.flowering.zones[zoneId].weeks + ')';
			}
		var flowpi = document.createElement('p'); flowpi.className = 'floweringoutdoors'; flowpi.innerHTML = FlowOut; document.getElementById('userreviews').appendChild(flowpi);
		}
	}

// Output User Reviews SubTitle, Average and Yield (In- and Outdoor)
function OutputTheReviewInAndOutdoorTitleYield(rev,inout) {
	var ush4i = document.createElement('h4'); ush4i.className = 'userreviewh4'; ush4i.innerHTML = rev.count.val + ' ' + inout + '-Review(s):'; document.getElementById('userreviews').appendChild(ush4i);
	// show average if available
	if(rev.average != false) {
		var averagep = document.createElement('p'); averagep.className = 'average'; averagep.innerHTML = '<strong>' + rev.average.title + ':</strong> <abbr title="' + rev.average.val + ' from 10 points">' + rev.average.info + '</abbr>'; document.getElementById('userreviews').appendChild(averagep);
		}
	// show yield if available
	if(rev.yield != false) {
		var ushYie = document.createElement('p'); ushYie.className = 'yield'; ushYie.innerHTML = '<strong>' + rev.yield.title + ':</strong> <abbr title="' + rev.yield.val + ' from 10 points">' + rev.yield.info + '</abbr>'; document.getElementById('userreviews').appendChild(ushYie);
		}
	}

// Output Medicinal Info
function OutputMedicalInfo(medical) {
	var medh3 = document.createElement('h3'); medh3.className = 'medicalh3'; medh3.innerHTML = 'Medicinal info about this strain'; document.getElementById('SFSBstraininfo').appendChild(medh3);
	var MedOut = ''; m = 0;
	for(var med in medical) {
		if(m != 0) {MedOut = MedOut + '<br />';}
		MedOut = MedOut + medical[med].effect.info;
		m++;
		}
	var medp = document.createElement('p'); medp.className = 'medicalp'; medp.innerHTML = MedOut; document.getElementById('SFSBstraininfo').appendChild(medp);
	}

// Output User Comments
function OutputUserComments(comm) {
	var commTitle = comm.count + ' comments about this strain.';
	if(comm.count > 3) {commTitle = 'Comments about this strain';}
	var commh3 = document.createElement('h3'); commh3.className = 'commh3'; commh3.innerHTML = commTitle; document.getElementById('SFSBstraininfo').appendChild(commh3);
	if(comm.count > 3) {
		var acommp1 = document.createElement('p'); acommp1.className = 'commPeh'; acommp1.innerHTML = 'Here the 3 most actual comments about this strain. To read more comments (' + comm.count + ' all together) check out the link below.'; document.getElementById('SFSBstraininfo').appendChild(acommp1);
		}
	for(var oneComm in comm.last3) {
		var acommp = document.createElement('p'); acommp.className = 'commPeh'; acommp.innerHTML = '<span class="CommUsername">' + comm.last3[oneComm].user + '</span>: ' + comm.last3[oneComm].text; document.getElementById('SFSBstraininfo').appendChild(acommp);
		}
	}