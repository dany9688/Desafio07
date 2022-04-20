const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return(`<tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Foto</th>
                </tr>
                <tr>
                    <td> ${elem.title} </td>
                    <td> ${elem.price} </td>
                    <td> <img src="${elem.thumbnail}" alt="imagen" style="height: 30px; width: 30px;">  </td>
                </tr>`)
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}

function addProduct(e) {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', producto);

    return false;
}
socket.on('products', function(data) { render(data); });

//////////////////////////////////////////////////////////////////

function renderMensaje(data) {
    const html1 = data.map((elem, index) => {
        return(`<div>
            <span style="color: blue; font-weight: bold"> ${elem.email}</span> - 
            <span style="color: brown"> ${elem.date}</span> - 
            <span style="color: green font-style: italic"> ${elem.mensaje}</span> <br> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html1;
}

function addMensaje(e){
    var f = new Date();
    
    const mensaje = {
        email: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value,
        date: f.getDate() + "/"+ f.getMonth()+ "/" +f.getFullYear() + "-" + f.getHours()+ ":" + f.getMinutes() + ":" + f.getSeconds()
    };

    
    socket.emit('new-mensaje', mensaje);
    console.log(mensaje)
    return false;
}
socket.on('mensajes', function(data) { renderMensaje(data); });




