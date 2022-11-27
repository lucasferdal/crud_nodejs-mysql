const get = document.querySelector('#get')
const post = document.querySelector('#post')
const remove = document.querySelector('#remove')
const modify = document.querySelector('#modify')

let pantalla = document.querySelector('#pantalla')

let url = 'http://localhost:3000/apis'

const mostrarEnPantalla = (data) => {
    // let data = JSON.stringify(info)
    console.log(data)
    data.forEach(element => {
        const { nombre, apellido, cedula, nacimiento } = element
        pantalla.innerHTML += `
        <div style='padding: 1rem'>
            Nombre: ${nombre},
            <br>
            Apellido: ${apellido},
            <br>
            Cedula: ${cedula},
            <br>
            Fecha: ${nacimiento}
            <hr>
        </div>
        `
    });

}

const getFetch = async () => {
    try {
        let res = await fetch(url)
        let data = await res.json()

        mostrarEnPantalla(data)
    } catch (error) {
        console.log(error)
    }
}

get.addEventListener('click', (e) => {
    e.preventDefault()

    getFetch()
})

post.addEventListener('click', (e) => {
    e.preventDefault()

    let nombre = document.querySelector('#nombre').value
    let apellido = document.querySelector('#apellido').value
    let cedula = document.querySelector('#cedula').value
    let fecha = document.querySelector('#fecha').value

    if ((nombre === '') || (apellido === '') || (cedula === '') || (fecha === '')) {
        console.log('no hay valor')
    } else {
        console.log('hay un valor almenos')
    }
    
    let elNombre = JSON.stringify({ Nombre: nombre, Apellido: apellido, Cedula: cedula, Fecha: fecha })
    
    const postFetch = async () => {
        try {
            let res = await fetch(url, {
                method: "Post",
                headers: { "Content-Type": 'Application/json' },
                body: elNombre
            })
        } catch (error) {
            console.log(error)
        }
    }
    postFetch()

    getFetch()
})