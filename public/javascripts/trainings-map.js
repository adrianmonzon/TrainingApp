let mapInstance

function initApp() {
    drawMap()
    getTrainings()
}


function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#trainingsMap'),
        { center: { lat: 40.392499, lng: -3.698214 }, zoom: 13, styles: mapStyles.retro }
    )
}


function getTrainings() {

    axios
        .get('/trainings/trainings-list')
        .then(response => drawMarkers(response.data))
        .catch(err => console.log(err))
}


function drawMarkers(trainings) {

    trainings.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
        console.log(position)
        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.name
            
        })
    })

    mapInstance.setCenter({ lat: trainings[1].location.coordinates[0], lng: trainings[1].location.coordinates[1] })
}