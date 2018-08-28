import { Editor } from '../src/'

function initialize(el: HTMLElement | null) {
  new Editor({}, el)
}

// startup the project
initialize(document.getElementById('root'))