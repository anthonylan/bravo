const baseUrl = window.location.origin.includes('localhost')
? 'http://localhost:8888/api'
: 'https://bravo.anthonycharles.work/api'; //change this to your server URL




export { baseUrl }