const dbProductos = [
        {
            id: 1,
            nombre: "Carpeta A4",
            precio: 5000,
            descripcion: "Esta es descripción de la carpeta A4",
            imagen: "Imagenes/carpeta.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 2,
            nombre: "Fibras de colores",
            precio: 2500,
            descripcion: "Esta es descripción de las fibras de colores",
            imagen: "Imagenes/fibras.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 3,
            nombre: "Goma",
            precio: 1000,
            descripcion: "Esta es descripción de la goma",
            imagen: "Imagenes/goma.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 4,
            nombre: "Hoja A4",
            precio: 3000,
            descripcion: "Esta es descripción de la hoja A4",
            imagen: "Imagenes/hojas.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 5,
            nombre: "Lapicera azul",
            precio: 1000,
            descripcion: "Esta es descripción de la lapicera azul",
            imagen: "Imagenes/lapiceras.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 6,
            nombre: "Libreta",
            precio: 1500,
            descripcion: "Esta es descripción de la libreta",
            imagen: "Imagenes/libretas.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 7,
            nombre: "Marcador",
            precio: 2000,
            descripcion: "Esta es descripción del marcador",
            imagen: "Imagenes/marcadores.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 8,
            nombre: "Lapicera color",
            precio: 1200,
            descripcion: "Esta es descripción de la lapicera color",
            imagen: "Imagenes/lapiceras_colores.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 9,
            nombre: "Papel de color",
            precio: 500,
            descripcion: "Esta es descripción del papel de color",
            imagen: "Imagenes/papeles_colores.jpg",
            descuento: 0,
            stock: 10,
        },
        {
            id: 10,
            nombre: "Lápices de color",
            precio: 3500,
            descripcion: "Esta es descripción de los lápices de color",
            imagen: "Imagenes/lapices_colores.jpg",
            descuento: 0,
            stock: 10,
        },
    ];

function compararProductosPorIdDescendente(a, b) {
    if(a.id < b.id) {
        return 1;
    }
    if(a.id > b.id) {
        return -1;
    }
    return 0;
}

dbProductos.sort(compararProductosPorIdDescendente);

let carrito = [];

function clickBtnAgregar(evento) {
    if (evento.target.classList.contains("btnAgregar")) {
        const productoId = evento.target.dataset.id;
        agregarProductoAlCarrito(productoId);
    };
};

function mostrarProductos() {
    const divProductos = document.querySelector(".areaProductos");
    
    if (!divProductos) {
        console.error('Error: No se encontró el contenedor con la clase "productos".');
        return;
    }

    for (let i = 0; i < dbProductos.length; i++) {
        const producto = dbProductos[i];
        divProductos.insertAdjacentHTML("afterbegin",
            `
                <div class ="cardProducto">
                    <img src="${producto.imagen}" alt="${producto.descripcion}" class="imgProducto">
                    <p class="precioProducto">$ ${producto.precio}</p>
                    <h3 class="nombreProducto">${producto.nombre}</h3>
                    <button class="btnAgregar" type="button" data-id="${producto.id}">                        
						<i class="fa-solid fa-cart-plus"></i>&nbsp; Agregar
                    </button>
                </div>
            `
        );
    }

    divProductos.addEventListener("click", clickBtnAgregar);
}

mostrarProductos();

function adicionarProducto(idProducto) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === Number(idProducto)) {
            if (carrito[i].cantidad < carrito[i].stock) {
                carrito[i].cantidad++;
            }
            break;
        }
    }
    actualizarCarritoHTML();
}

function sustraerProducto(idProducto) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === Number(idProducto)) {
            if (carrito[i].cantidad > 1) {
                carrito[i].cantidad--;
            }
            else {
                eliminarDelCarrito(idProducto);
            }
            break;
        }
    }
    actualizarCarritoHTML();
}

function eliminarDelCarrito(idProducto) {
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === Number(idProducto)) {
            carrito.splice(i, 1);
            break;
        }
    }
    actualizarCarritoHTML();
}

function clickBtnsCarrito(evento) {
    const target = evento.target;
    
    if (target.classList.contains("btnCantidad") || target.classList.contains("btnEliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarDelCarrito(productoId);
        } else if (accion === "sustraer") {
            sustraerProducto(productoId);
        } else if (accion === "adicionar") {
            adicionarProducto(productoId);
        }
    }
}

function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector(".carritoCompras");
    
    if (!carritoCompras) {
        console.error('Error: No se encontró el contenedor con la clase "carritoCompras".');
        return;
    }

    if (carrito.length === 0) {
        carritoCompras.innerHTML = ``;
    } else {
        carritoCompras.innerHTML = `
            <a id="puntoCarrito"></a>
            <h2 class:"tituloCarrito">Tu Carrito de Compras</h2>
            <ul class="listaCarrito"></ul>
            <p class="totalCarrito"></p>
            <p class="cantidadCarrito"></p>
            <button class="btnFinalizarCompra" onclick="alert('Disponible próximamente!')">
                <i class="fa-light fa-money-bill-wave"></i>
                &nbsp; Finalizar compra
            </button>
            `
        ;
        
        const listaCarrito = carritoCompras.querySelector(".listaCarrito");
        let totalPagar = 0;

        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const li = document.createElement("li");
            let subTotal= item.precio * item.cantidad;
            
            li.innerHTML = `
                <span>${item.nombre} - $${item.precio} x ${item.cantidad} = $${subTotal} </span>
                <span class="stockProducto">Stock: ${item.stock}</span>
                <div>
                    <button class="btnCantidad" data-id="${item.id}" data-action="sustraer">
                        <i class="fa-solid fa-minus"></i>&nbsp; Quitar
                    </button>
                    <button class="btnCantidad" data-id="${item.id}" data-action="adicionar">
                        <i class="fa-solid fa-plus"></i>&nbsp; Agregar
                    </button>
                    <button class="btnEliminar" data-id="${item.id}" data-action="eliminar">
                        <i class="fa-solid fa-trash-can"></i>&nbsp; Eliminar
                    </button>
                </div>
            `;
            listaCarrito.appendChild(li);
            totalPagar += item.precio * item.cantidad;
        };

        carritoCompras.querySelector(".totalCarrito").textContent = `Total a pagar: $${totalPagar}`;
        carritoCompras.querySelector(".cantidadCarrito").textContent = `Productos en tu carrito: ${carrito.length}`;

        const nuevaListaCarrito = carritoCompras.querySelector(".listaCarrito");
        nuevaListaCarrito.addEventListener("click", clickBtnsCarrito);
    };

    
};

function agregarProductoAlCarrito(idProducto) {
    
    let indiceEnCarrito = -1;
    
    if (carrito.length > 0) {
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].id === Number(idProducto)) {
                indiceEnCarrito = i;
                break;
            }
        }
    }
    
    if (indiceEnCarrito >= 0) {
        if (carrito[indiceEnCarrito].cantidad < carrito[indiceEnCarrito].stock) {
            carrito[indiceEnCarrito].cantidad++;
        }
    } else {
        let productoDatos = null;
        for (let i = 0; i < dbProductos.length; i++) {
            if (dbProductos[i].id === Number(idProducto)) {
                productoDatos = dbProductos[i];
                break;
            };
        };
        
        if (productoDatos) {
            carrito.push({ ...productoDatos, cantidad: 1 });
        };
    };
    actualizarCarritoHTML();
};

actualizarCarritoHTML();

