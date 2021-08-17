import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://animechan.vercel.app/api/random',
}

export default function getAnimeQuote(callback) {
  axios
    .request(options)
    .then(function (response) {
      callback(response.data.quote)
    })
    .catch(function (error) {
      console.error(error)
    })
}
