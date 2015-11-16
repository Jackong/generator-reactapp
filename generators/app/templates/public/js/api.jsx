import restful, { fetchBackend } from 'restful.js'

export default restful('/api', fetchBackend(window.fetch))
