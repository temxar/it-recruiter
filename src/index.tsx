import 'regenerator-runtime/runtime'

import 'assets/scss/app.scss'

import { createRoot } from 'react-dom/client'

import App from './App'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)
root.render(<App />)
