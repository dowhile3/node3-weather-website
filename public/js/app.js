const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 


    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const fetchURL = '/weather?address='
                    + encodeURIComponent(location)
    if(!location) {
        return messageOne.textContent = 'Input valid address.'
    }
    fetch(fetchURL).then((response) => {
        response.json().then((data) => {
            if(data.errorMessage) {
                return messageOne.textContent = data.errorMessage
            }
            messageOne.textContent = ''
            messageOne.textContent = 'Address: ' + data.address 
            messageTwo.textContent = 'Forecast: ' + data.forecast


        })
    })

})


// const placeName = 'Xiamen'
// const geocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(placeName) + '.json?access_token=pk.eyJ1IjoiZG93aGlsZTMiLCJhIjoiY2t0czRteXpjMWN1NTJ2cG1sYnA4ZG5xcyJ9.baSDEdf10IKkP-aho53Z7w&limit=1'

// fetch(geocodeURL).then((response) => {
//     response.json().then((data) => {
//         if (data.features.length === 0) {
//             return console.log('No such place.')
//         }

//         const latitude = data.features[0].center[1]
//         const longitude = data.features[0].center[0]
//         const coordinates = latitude + ',' + longitude
//         const weatherURL = "http://api.weatherstack.com/current?access_key=fd5b0e0d2123158734707f00d4638660&query="
//                        + coordinates + '&units=m'
//         fetch(weatherURL).then((response) => {
//             response.json().then((data) => {
//                 console.log("Address: " + placeName)
//                 console.log("Forecast: " + data.current.weather_descriptions[0])
//                 console.log("Temperature: ", data.current.temperature)
//             })
//         })
//     })
// })



