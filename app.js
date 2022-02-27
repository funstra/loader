const fileTypes = ['Images', 'Videos', 'Binary']
const template = document.querySelector('template')
const main = document.querySelector('main')
const addButton = document.querySelector('button')
addButton.onclick = e => {
    const content = template.content.cloneNode(true)
    /**@type{HTMLElement} */
    const ref = content.firstElementChild

    const size = ref.querySelector('.text div > span:first-child')
    const n = ref.querySelector('.text div > span:last-child')

    const s = Math.floor(Math.random() * 192) + 8
    const f = Math.floor(Math.random() * 65536) + 1
    size.dataset.data = s.toString()
    n.dataset.data = f.toLocaleString()
    ref.style.setProperty('--dur', `${125 + (f / 65536) * 128 + (s / 200) * 512}ms`)

    ref.onanimationend = ae => {
        if (ae.animationName === 'leave') {
            ref.remove()
        }
        if (ae.animationName === 'load') {
            ref.classList.add('completed')
        }
    }
    ref.querySelector('.check').onclick = e => {
        ref.style.animation = 'leave calc(var(--dur) + 1000ms) forwards'
        ref.querySelector('.check').style.opacity = 0;
        ref.style.zIndex = '0'
    }

    const typeIndex = Math.floor(Math.random() * fileTypes.length)
    const type = fileTypes[typeIndex]
    ref.querySelector('.text h3').textContent = type


    ref.querySelector('svg').querySelector('use').setAttribute('href', `#${type.toLowerCase()}`)

    const hue0 = typeIndex * 120 + 60
    const hue1 = hue0 + 30

    ref.style.setProperty('--hue-0', hue0.toString())
    ref.style.setProperty('--hue-1', hue1.toString())

    // ref.querySelector('defs').style.setProperty('--hue-0',hue0.toString())
    // ref.querySelector('defs').style.setProperty('--hue-1',hue1.toString())
    main.appendChild(content)


}
