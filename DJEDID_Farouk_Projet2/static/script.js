load();

function load(){	
	httpRequest = new XMLHttpRequest();	 
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response); 
			update_Bars(jsonData1);	
		}
	};
	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();
	
	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData3 = JSON.parse(httpRequest3.response);
			update_Pie(jsonData3);
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData4 = JSON.parse(httpRequest4.response);
			update_polarArea(jsonData4);
		}
	};
	httpRequest4.send();

	httpRequest5 = new XMLHttpRequest();
	httpRequest5.open('GET', '/api/data5');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			jsonData5 = JSON.parse(httpRequest5.response);
			update_horizontal(jsonData5);
		}
	};
	httpRequest5.send();

	httpRequest6 = new XMLHttpRequest();
	httpRequest6.open('GET', '/api/data6');
	httpRequest6.onreadystatechange = function () {
		if (httpRequest6.readyState === 4 && httpRequest6.status === 200) {
			jsonData6 = JSON.parse(httpRequest6.response);
			update_doughnut(jsonData6);
		}
	};
	httpRequest6.send();

	httpRequest7 = new XMLHttpRequest();
	httpRequest7.open('GET', '/api/data7');
	httpRequest7.onreadystatechange = function () {
		if (httpRequest7.readyState === 4 && httpRequest7.status === 200) {
			jsonData7 = JSON.parse(httpRequest7.response);
			update_radar(jsonData7);
		}
	};
	httpRequest7.send();
	
	httpRequest8 = new XMLHttpRequest();
	httpRequest8.open('GET', '/api/data8');
	httpRequest8.onreadystatechange = function () {
		if (httpRequest8.readyState === 4 && httpRequest8.status === 200) {
			jsonData8 = JSON.parse(httpRequest8.response);
			update_polar(jsonData8);
		}
	};
	httpRequest8.send();

}


function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.specialite;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nombre_etudiants;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Nombre des étudiants",
			backgroundColor: ["#BED754", "#E3651D", "#750E21", "#711DB0", "#FFF78A", "#7B66FF", "#1640D6"],
			data: data
		  }]
		},
		options: {
		  responsive: true,
		  maintainAspectRatio: true,	
		  legend:{display:false	}
		}
	});
}

function update_Lines(jsonData){
	var labels = jsonData.annee;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=1.5;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: true,
			maintainAspectRatio: true,
			legend:{
				position:'top',
			}
		}
	});
}

function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
		return e.sexe;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.nombre_etudiants;
	 });
	 
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			borderColor: ["pink", "blue"],
			backgroundColor: ["rgba(255, 192, 203, 0.64)", "rgba(0, 0, 255, 0.563)"],
			data: data
		  }]
		},
		options: {
		  responsive: true,
		  maintainAspectRatio: true,
		  title: {
			display: false,
		  },
		  legend:{
			position:'top'
		  }
		}
	});	
}


function update_polarArea(jsonData) {

    var labels = jsonData.map(function (e) {
        return e.specialite;
    });

    var data = jsonData.map(function (e) {
        return e.count;
    });

    new Chart(document.getElementById("polarArea-chart"), {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [
                {
                    backgroundColor: ["#BED754", "#E3651D", "#750E21", "#711DB0", "#FFF78A", "#7B66FF", "#1640D6"],
                    data: data
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
			legend:{
				position:'top'
			  }
        }
    });
}



function update_horizontal(jsonData) {

    labels = jsonData.map(function (e) {
        return e.annee;
    });

    data = jsonData.map(function (e) {
        return e.cmoy2;
    });

    chart = new Chart(document.getElementById("horisentalbar-chart"), {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Nombre des étudiants ajournés",
                    backgroundColor: ["#E3651D", "#750E21", "#711DB0"],
                    data: data
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: false },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true 
                    }
                }]
            }
        }
    });

}


function update_doughnut(jsonData) {

    var labels = jsonData.map(function (e) {
        return e.annee;
    });

    var data = jsonData.map(function (e) {
        return e.cmoy;
    });

    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
			labels: labels,
			datasets: [
			  {
				backgroundColor: ["yellow", "red","#3cba9f"],
				data: data
			  }
			]
		  },
		  options: {
			responsive: true,
			maintainAspectRatio: true,
			legend:{
			  position:'top'
			}
		  }
    });
}

function update_radar(jsonData) {

    var labels = jsonData.map(function (e) {
        return e.specialite;
    });

    var data1 = jsonData.map(function (e) {
        return e.count_women;
    });
    var data2 = jsonData.map(function (e) {
        return e.count_men;
    });


    new Chart(document.getElementById("radar-chart"), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "nombre des femmes admis en 2020 ",
					borderColor: "pink",
                    backgroundColor: ["#f8c8dc7a"],
                    data: data1
                },
                {
                    label: "nombre des hommes admis en 2020 ",
					borderColor: "blue",
                    backgroundColor: ["#004f9878"],
                    data: data2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
			legend:{
				position:'top'
			  }
        }
    });
}


function update_polar(jsonData){

	var labels = jsonData.map(function(e) {
		return e.categorie;
	 });
	 

	 var data = jsonData.map(function(e) {
		return e.nb_etudiants;
	 });


	 
	 new Chart(document.getElementById("Polar-chart"), {
		 type: 'polarArea',
		 data: {
		   labels: labels,
		   datasets: [{
			 backgroundColor: ["red", "lightgreen"],
			 data: data
		   }]
		 },
		 options: {
		   responsive: true,
		   maintainAspectRatio: true,
		   legend:{
			 position:'top',
		   }
		 }
	 });
}

