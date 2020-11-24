let mapInstance

function initApp() {
    drawMap()
    getTrainingsFromAPI()
}


function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#trainingsMap'),
        { center: { lat: 40.392499, lng: -3.698214 }, zoom: 15, styles: mapStyles.retro }
    )
}


function getTrainingsFromAPI() {

    axios
        .get('/api/trainings')
        .then(response => drawMarkers(response.data))
        .catch(err => console.log(err))
}


function drawMarkers(trainings) {

    trainings.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }

        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.name
        })
    })

    mapInstance.setCenter({ lat: trainings[1].location.coordinates[0], lng: trainings[1].location.coordinates[1] })
}