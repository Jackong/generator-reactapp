import restful, { fetchBackend } from 'restful.js'
import fetch from 'isomorphic-fetch'

const API = '/api'

export default restful(api, fetchBackend(fetch))
