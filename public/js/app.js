const weatherForm = document.getElementById('weather-form')
const search = document.getElementById('location-input')
const unitsSelect = document.getElementById('units')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const units = unitsSelect.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location + '&units=' + units).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }  else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }  
        })
    })
})