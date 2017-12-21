const generateRandomKey = () => {
    const min = 65
    const max = 90
    return Math.round(Math.random() * (max - min) + min)
}

const generateKeys = (levels) => new Array(levels).fill(0).map(generateRandomKey)

const getElementByKeyCode = (keyCode) => document.querySelector(`[data-key="${keyCode}"]`)

const activate = (keyCode, options = {}) => {
    const el = getElementByKeyCode(keyCode)
    el.classList.add('active')
    options.success ? el.classList.add('success') : options.fail ? el.classList.add('fail') : ''

    setTimeout(() => deactivate(el), 500)

}

const deactivate = (el) => {
    el.className = 'key'
}

const nextLevel = (currentLevel) => {
    if (currentLevel== levels) swal({
        title: 'Ganaste',
        type: 'success'
    })

    swal({
        timer: 1000,
        title: `Nivel ${currentLevel + 1}`,
        showConfirmButton: false
    })

    for (let  i = 0; i <= currentLevel; i++){
        setTimeout(() => activate(keys[i]), 1000 * (i+1) + 1000)
    }

    let i = 0
    let currentKey = keys[i]
    window.addEventListener('keydown', onkeydown)

    function onkeydown(ev) {
        if (ev.keyCode == currentKey) {
            activate(currentKey, { success: true })
            i++
            if (i > currentLevel) {
                window.removeEventListener('keydown', onkeydown)
                setTimeout(() => nextLevel(i), 1500)
            }
            currentKey = keys[i]
        } else {
            activate(ev.keyCode, { fail: true })
            window.removeEventListener('keydown', onkeydown)
            swal({
                title: 'Perdiste :(',
                text: '¿Quieres jugar de nuevo?',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                closeOnConfirm: true

            }, (ok) => {
                if (ok) {
                    teclas = generateKeys(levels)
                    nextLevel(0)
                }
            })
        }
    }

}

const levels = 15
let keys = generateKeys(levels)

nextLevel(0)