const baseUrl = window.location.origin.includes('localhost')
? 'http://localhost:8888/api'
: 'https://bravo.indiebold.com/api'; //change this to your server URL




export { baseUrl }