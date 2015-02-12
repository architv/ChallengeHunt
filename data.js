// get all the challenge data
function getChallengeData() {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com",
		beforeSend: function () {
	      	// $("#target").loadingOverlay();
		},
	    success: function (data) {
	    	// $('#target').loadingOverlay('remove');
	    	if(!((typeof localStorage["data"]) === 'undefined')) {
				localStorage.removeItem('data');
			}
	    	localStorage.setItem('data', data);
	    	$("#loader-drop-down").hide();
	    	// $("#cd-tabs").show();
	    	document.getElementById("c-tabs").style.visibility = "visible";
	    	generateCards(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

getChallengeData();

// get all the hosts
function getHosts() {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com/hosts",
		beforeSend: function () {
	      	
		},
	    success: function (data) {
	    	$("#loader-select-menu").hide();
	    	loadDropDownWithHosts(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

getHosts();

function toTimeZone(time) {

	var dateTimeTimezone = time.split("T");
	var date = dateTimeTimezone[0].split("-");
	var timeAndTimeZone = dateTimeTimezone[1].split("T")
	var time = timeAndTimeZone[0].split(":");
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0)
	var offset = -(d.getTimezoneOffset());
	var newD = new Date(d.getTime() + offset*60000);
    return newD.toLocaleString()
}

function generateCards(data) {

	var active_tabs = document.getElementById("active-contests");
	active_tabs.innerHTML = "";

	var active_contest_data = JSON.parse(data)["active"];

	var randomNumber = 0;
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	for (var i = 0; i < active_contest_data.length; i++) {

	
		var newDiv = document.createElement('div');
		newDiv.style.width = "360px";
	 	newDiv.style.height = "130px"; 
	 	newDiv.style.borderStyle = "solid"; 
	 	newDiv.style.borderWidth = "2px";
	 	newDiv.style.borderColor = "black";
	 	newDiv.style.borderRadius = "8px 8px 8px 8px";
	 	newDiv.style.borderColor = "black";
	 	newDiv.style.marginBottom = "15px";
	 

	 	if(randomNumber<9){
	 		randomNumber = randomNumber+1;
		}else{
			randomNumber = 1;
		}


	 	if(randomNumber==1){
			newDiv.style.background = "#66FF33"; 
	 	}else if(randomNumber==4){
			newDiv.style.background = "#FFFF4D"; 
	 	}else if(randomNumber==6){
			newDiv.style.background = "#FF8533"; 
	 	}else if(randomNumber==2){
			newDiv.style.background = "#FF85AD"; 
	 	}else if(randomNumber==8){
			newDiv.style.background = "#DB94FF"; 
	 	}else if(randomNumber==3){
			newDiv.style.background = "#70B8FF"; 
	 	}else if(randomNumber==5){
			newDiv.style.background = "#82FFFF"; 
	 	}else if(randomNumber==7){
			newDiv.style.background = "#CCFF33"; 
	 	}else if(randomNumber==9){
			newDiv.style.background = "#47DAB5"; 
	 	}

		var startTime = toTimeZone(active_contest_data[i].start).split(",");
		var endTime = toTimeZone(active_contest_data[i].end).split(",");
	
		var lengthOfContestname = active_contest_data[i].contest_name.length;

		if(lengthOfContestname < 30) {
	 		 	newDiv.innerHTML ="<img src='/img/codechef.com.png' style='width:98px;height:48px'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"  "+ "<a href="+active_contest_data[i].contest_url+" target='_blank'>" + active_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+ active_contest_data[i].host_name +"</div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

	 	}else{
				newDiv.innerHTML ="<img src='/img/codechef.com.png' style='width:98px;height:48px'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-20px; '>"+"  "+ "<marquee>"+active_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+ active_contest_data[i].host_name +"</div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

	 	}

	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("active-contests").appendChild(newDiv);
		}
		else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
			document.getElementById("active-contests").appendChild(newDiv);
		}
	}
}

// select all the options from drop down which are already in the local storage
function loadDropDownWithHosts(data) {

	var dropDown = document.getElementById("tokenize");
	var hosts = (JSON.parse(data))["hosts"]
	selected_hosts = JSON.parse(localStorage.getItem('hosts'));

	for (var i = 0; i < hosts.length; i++) {
		var newOption = document.createElement('option');
		newOption.value = hosts[i];

		if (!((typeof localStorage["hosts"]) === 'undefined') && selected_hosts.hasOwnProperty(hosts[i])) {
			newOption.selected = true;
		}
		newOption.innerText = hosts[i];
		dropDown.appendChild(newOption);
	}
	loadDropDown();
}

function loadDropDown() {
	$('#tokenize').tokenize({
		placeholder: "Add more programming challenges platforms..",
		// displayDropdownOnFocus: true,
		onAddToken: function(value, text){
			if((typeof localStorage["hosts"]) === 'undefined') {
				var hosts = {}
				hosts[value] = true;
				localStorage.setItem('hosts', JSON.stringify(hosts));
			} else {
				var hosts = JSON.parse(localStorage.getItem('hosts'));
				if (hosts.hasOwnProperty(value)) {
					console.log("already there")
				} else {
					hosts[value] = true;
					localStorage.setItem('hosts', JSON.stringify(hosts));
				}
			}

			if((typeof localStorage["data"]) === 'undefined') {
				getChallengeData();
			} else {
				// if data already exists in localstorage, then call generateCards(data) else call getChallengeData()
				var data = localStorage.getItem('data');
				generateCards(data);
			}
		},
		onRemoveToken: function(value){
			hosts = JSON.parse(localStorage.getItem('hosts'));
			
			// check if hosts contain that value. should not be the case
			if (!hosts.hasOwnProperty(value)) {
				console.log("not there")
			} else {
				delete hosts[value];
				var hostsLength = Object.keys(hosts).length;
				// if all the hosts have been removed, delete the host key
				if (hostsLength == 0) {
					localStorage.removeItem('hosts');
				} else {
					localStorage.setItem('hosts', JSON.stringify(hosts));
				}
			}

			// if data already exists in localstorage, then call generateCards(data) else call getChallengeData()
			if((typeof localStorage["data"]) === 'undefined') {
				getChallengeData();
			} else {
				var data = localStorage.getItem('data');
				generateCards(data);
			}
		},
	});
	
}