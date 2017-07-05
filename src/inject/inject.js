const { assign } = Object

const getNewRandomRedditURL = () => location.origin + '/r/random'

const h = (tagName = 'div', properties = {}, children = []) => {
	const el = assign(document.createElement(tagName), properties)

	const iterableChildren = typeof children === 'string' ? [children] : children
	iterableChildren.forEach(
		child => {
			if (typeof child === 'string') {
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


const init = () => {
	const reloadButton = h('random-reddit-button')
	
	let hotKeyPressedCount = 0
	const onHotKeyUp = ({ code }) => {
		if (code === 'ShiftRight' || code === 'ShiftLeft') {
			hotKeyPressedCount++
			setTimeout(() => hotKeyPressedCount = 0, 1000)
			if (hotKeyPressedCount >= 3) loadNewRandomReddit()
		}
	}


	const loadNewRandomReddit = () => {
		reloadButton.setAttribute('active', true)
		location.href = getNewRandomRedditURL()
	}

	window.addEventListener('keyup', onHotKeyUp)
	reloadButton.addEventListener('click', loadNewRandomReddit)

	document.body.appendChild(reloadButton)
}

chrome.extension.sendMessage({}, function (response) {
	const readyStateCheckInterval = setInterval( () => {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval)
			init()
		}
	}, 10)
})