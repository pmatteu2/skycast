$(document).ready(function(){

		var clat,clong;
		var days = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		    	var d = new Date()
		    	var year = d.getFullYear()
		    	var month = d.getMonth()+1
		    	if (Number(month) < 10){
		    		month = '0'.concat(month)
		    	}
		    	var dayOfM = d.getDate()
		    	if (Number(dayOfM) < 10){
		    		dayOfM = '0'.concat(dayOfM)
		    	}
		    	var today = year+'-'+month+'-'+dayOfM
		    	//console.log(today)
		    	var day = d.getDay()+1
		    	var hours = d.getHours()
		    	//console.log(d,d.getDay())
		    	$('#hist').val(today);
		$('.location').on('submit', function(event){
	    event.preventDefault();
	    
		    var city = $('#city').val();
		    var state = $('#state').val();
		    var street = $('#street').val();
		    var hist = $('#hist').val();
		    //I didnt have a great way of showing past data without making a ton of api calls for historic data
		    // so i made this huge if statement and just varied the code accordingl
			if (!hist || (hist === today)){
			    console.log(hist)
			    for (var i = 0 ; i < street.length ; i++){
			    	if (street[i] === ' '){
			    		street = street.replace(' ', '+')
			    	}
			    }
			    for (var i = 0 ; i < city.length ; i++){
			    	if (city[i] === ' '){
			    		city = city.replace(' ', '+')
			    	}
			    }
			    for (var i = 0 ; i < state.length ; i++){
			    	if (state[i] === ' '){
			    		state = state.replace(' ', '+')
			    	}
			    }


			    console.log(street,city,state,'here we are')
			    var sendData = {
			    	'street':street,
			    	'city':city,
			    	'state':state,
			    	'hist':hist,
			    	'today':today
			    	
			  	}
			  	//console.log(sendData)
			    $.ajax({
			      type: "GET",
			      url: '/gogo',
			      data: sendData,
			      contentType: 'application/json',
			      // success: function (data){
			      //   $('.info').text(data)
			      //  console.log('pjpjpjpjpjpjpjpjpj',data)
			      // }
			     })
			    .then(function(resp){
			    	console.log(resp)
			    	
			    	var pic = resp.currently.icon;
			    	for(var i = 0 ; i < pic.length ; i++){
			    		if (pic[i] === '-'){
			    			pic =pic.replace('-','_');

			    		}
			    	}
			    	pic = pic.toUpperCase()
			    	//console.log(pic)
			    	$('.currentInfo').empty();
			    	$('.currentInfo').append('<h1>Curent Weather</h1>').append(
			    		'<h3>Weather Summary: '+resp.currently.summary+'</h3>'+
			    		'<div class ="row">'+
			    		'<div class = "col-md-3">Tempuratue: '+resp.currently.temperature+' &#8457'+
			    		'</div><div class = "col-md-3">Feels Like: '+resp.currently.apparentTemperature+' &#8457'+'</div></div>'+
			    		'<div class ="row">'+
			    		'<div class = "col-md-3">Humidity: '+resp.currently.humidity+
			    		'</div><div class = "col-md-3">Wind Speed: '+resp.currently.windSpeed+' mph'+'</div></div>'+
			    		'<div class = "row">'+'<canvas id="icon1" width="170" height="170"></canvas>'+
			    		'</div>'
			    		)
			    	skycons.add("icon1", Skycons[pic]);
					skycons.play();
					var hourPics = []
					for (var i = 0 ; i < 6 ; i++){
						hourPics[i] = resp.hourly.data[i+1].icon;
					}
					for (var i = 0 ; i < 6 ; i++){
						for (var j = 0 ; j < hourPics[i].length ; j++){
							if (hourPics[i][j] === '-'){
			    			hourPics[i] =hourPics[i].replace('-','_');

			    			}
			    		}
			    		hourPics[i] = hourPics[i].toUpperCase()
					}
					$('.hour').empty();
					$('.hour').append('<h4>Hourly Forcasts</h4>')
					for (var i = 0 ; i < 6 ; i++){
						$('.hour').append('<div class = "col-md-2">'+
								'<div>'+((hours+1+i)%24)+':00'+
								'</div>'+
								'<div>Temp: '+resp.hourly.data[i+1].temperature+' &#8457</div>'+
								'<div>Feels Like: '+resp.hourly.data[i+1].apparentTemperature+' &#8457</div>'+
								'<div>Humidity: '+resp.hourly.data[i+1].humidity+'</div>'+
								'<div>Wind: '+resp.hourly.data[i+1].windSpeed+'mph</div>'+
								'<div class = "row">'+'<canvas id="icon'+(i+2)+'" width="128" height="128"></canvas>'+
			    				'</div>'+
			    				'<div>'+resp.hourly.data[i+1].summary+'</div>'+

							'</div>')

					}
					//console.log(hourPics)
					skycons.add("icon2", Skycons[hourPics[0]]);
					skycons.add("icon3", Skycons[hourPics[1]]);
					skycons.add("icon4", Skycons[hourPics[2]]);
					skycons.add("icon5", Skycons[hourPics[3]]);
					skycons.add("icon6", Skycons[hourPics[4]]);
					skycons.add("icon7", Skycons[hourPics[5]]);

					var dayPics = [];
					for (var i = 0 ; i < 6 ; i++){
						dayPics[i] = resp.daily.data[i+1].icon;
					}
					for (var i = 0 ; i < 6 ; i++){
						for (var j = 0 ; j < dayPics[i].length ; j++){
							if (dayPics[i][j] === '-'){
			    			dayPics[i] =dayPics[i].replace('-','_');

			    			}
			    		}
			    		dayPics[i] = dayPics[i].toUpperCase()
					}

					$('.daily').empty();
					$('.daily').append('<h4>Daily Forcasts</h4>')
					for (var i = 0 ; i < 6 ; i++){
						$('.daily').append('<div class = "col-md-2">'+
								'<div>'+days[(day+1+i)%7]+
								'</div>'+
								'<div>Temp High: '+resp.daily.data[i+1].temperatureMax+' &#8457</div>'+
								'<div>Temp Low: '+resp.daily.data[i+1].temperatureMin+' &#8457</div>'+
								'<div>Humidity: '+resp.daily.data[i+1].humidity+'</div>'+
								'<div>Wind: '+resp.daily.data[i+1].windSpeed+'mph</div>'+
								'<div class = "row">'+'<canvas id="icon'+(i+8)+'" width="128" height="128"></canvas>'+
			    				'</div>'+
			    				'<div>'+resp.daily.data[i+1].summary+'</div>'+

							'</div>')

					}
					skycons.add("icon8", Skycons[dayPics[0]]);
					skycons.add("icon9", Skycons[dayPics[1]]);
					skycons.add("icon10", Skycons[dayPics[2]]);
					skycons.add("icon11", Skycons[dayPics[3]]);
					skycons.add("icon12", Skycons[dayPics[4]]);
					skycons.add("icon13", Skycons[dayPics[5]]);





			    })
			
		}
	else{
		//console.log(hist)
		    for (var i = 0 ; i < street.length ; i++){
		    	if (street[i] === ' '){
		    		street = street.replace(' ', '+')
		    	}
		    }
		    for (var i = 0 ; i < city.length ; i++){
		    	if (city[i] === ' '){
		    		city = city.replace(' ', '+')
		    	}
		    }
		    for (var i = 0 ; i < state.length ; i++){
		    	if (state[i] === ' '){
		    		state = state.replace(' ', '+')
		    	}
		    }


		    //console.log(street,city,state,'here we are')
		    var sendData = {
		    	'street':street,
		    	'city':city,
		    	'state':state,
		    	'hist':hist,
		    	'today':today
		    	
		  	}
		  	//console.log(sendData)
		    $.ajax({
		      type: "GET",
		      url: '/gogo',
		      data: sendData,
		      contentType: 'application/json',
		      // success: function (data){
		      //   $('.info').text(data)
		      //  console.log('pjpjpjpjpjpjpjpjpj',data)
		      // }
		     })
		    .then(function(resp){
		    	//console.log(resp)
		    	
		    	var pic = resp.currently.icon;
		    	for(var i = 0 ; i < pic.length ; i++){
		    		if (pic[i] === '-'){
		    			pic =pic.replace('-','_');

		    		}
		    	}
		    	pic = pic.toUpperCase()
		    	//console.log(pic)
		    	$('.currentInfo').empty();
		    	$('.currentInfo').append('<h1>Chosen Day Weather</h1>').append(
		    		'<h3>Weather Summary: '+resp.currently.summary+'</h3>'+
		    		'<div class ="row">'+
		    		'<div class = "col-md-3">Tempuratue: '+resp.currently.temperature+' &#8457'+
		    		'</div><div class = "col-md-3">Feels Like: '+resp.currently.apparentTemperature+' &#8457'+'</div></div>'+
		    		'<div class ="row">'+
		    		'<div class = "col-md-3">Humidity: '+resp.currently.humidity+
		    		'</div><div class = "col-md-3">Wind Speed: '+resp.currently.windSpeed+' mph'+'</div></div>'+
		    		'<div class = "row">'+'<canvas id="icon1" width="170" height="170"></canvas>'+
		    		'</div>'
		    		)
		    	skycons.add("icon1", Skycons[pic]);
				skycons.play();
				var hourPics = []
				
					hourPics[0] = resp.hourly.data[0].icon;
				
				
					for (var j = 0 ; j < hourPics[0].length ; j++){
						if (hourPics[0][j] === '-'){
		    			hourPics[0] =hourPics[0].replace('-','_');

		    			}
		    		}
		    		hourPics[0] = hourPics[0].toUpperCase()
				
				$('.hour').empty();
				$('.hour').append('<h4>Hourly Weather</h4>')
				
					$('.hour').append('<div class = "col-md-12">'+
							'<div>'+((hours)%24)+':00'+
							'</div>'+
							'<div>Temp: '+resp.hourly.data[0].temperature+' &#8457</div>'+
							'<div>Feels Like: '+resp.hourly.data[0].apparentTemperature+' &#8457</div>'+
							'<div>Humidity: '+resp.hourly.data[0].humidity+'</div>'+
							'<div>Wind: '+resp.hourly.data[0].windSpeed+'mph</div>'+
							'<div class = "row">'+'<canvas id="icon'+(2)+'" width="128" height="128"></canvas>'+
		    				'</div>'+
		    				'<div>'+resp.hourly.data[i+1].summary+'</div>'+

						'</div>')

				
				//console.log(hourPics)
				skycons.add("icon2", Skycons[hourPics[0]]);
				var dayPics = [];
					dayPics[0] = resp.daily.data[0].icon;
					for (var j = 0 ; j < dayPics[0].length ; j++){
						if (dayPics[0][j] === '-'){
		    				dayPics[0] =dayPics[0].replace('-','_');
		    			}
		    		}
		    		dayPics[0] = dayPics[0].toUpperCase()
				

				$('.daily').empty();
				$('.daily').append('<h4>Daily Weather</h4>')
				
					$('.daily').append('<div class = "col-md-12">'+
							'<div>'+days[(day-1)%7]+
							'</div>'+
							'<div>Temp High: '+resp.daily.data[0].temperatureMax+' &#8457</div>'+
							'<div>Temp Low: '+resp.daily.data[0].temperatureMin+' &#8457</div>'+
							'<div>Humidity: '+resp.daily.data[0].humidity+'</div>'+
							'<div>Wind: '+resp.daily.data[0].windSpeed+'mph</div>'+
							'<div class = "row">'+'<canvas id="icon'+(8)+'" width="128" height="128"></canvas>'+
		    				'</div>'+
		    				'<div>'+resp.daily.data[0].summary+'</div>'+

						'</div>')
				skycons.add("icon8", Skycons[dayPics[0]]);
				
		    })
		}
	})

	})