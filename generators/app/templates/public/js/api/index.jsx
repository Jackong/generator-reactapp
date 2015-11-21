import restful, { fetchBackend } from 'restful.js'
import fetch from 'whatwg-fetch'

window.fetch = fetch

export default restful('/api', fetchBackend(window.fetch))
