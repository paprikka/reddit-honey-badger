const { assign } = Object

const getNewRandomRedditURL = () => location.origin + '/r/random'
const loadNewRandomReddit = () => location.href = getNewRandomRedditURL()

const h = (tagName = 'div', properties = {}, children = []) => {
	const el = assign(document.createElement(tagName), properties)

	const iterableChildren = typeof children === 'string' ? [children] : children
	iterableChildren.forEach(
		child => {
			if(typeof child === 'string') {
				const string = child
				const textChild = h('span')
				textChild.innerText = string
				el.appendChild(textChild)
				return
			}

			el.appendChild(child)
		}
	)
	
	return el
}



class RandomRedditButton extends HTMLElement {
	constructor() {
		super()

		this.addEventListener('click', this.onClick)
	}

	onClick() {
		this.setAttribute('active', '')
		loadNewRandomReddit()
	}
}



const init = () => {
	const reloadButton = h('random-reddit-button')
	reloadButton.addEventListener('click', () => {
		reloadButton.setAttribute('active', true)
		loadNewRandomReddit()
	})

	document.body.appendChild(reloadButton)
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval)

		init()


	}
	}, 10)
})