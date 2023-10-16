class ProductManager {
  constructor() {
    this.productos = [];
  }
  addProduct(nombreProducto, descripcion, precio, stock) {
    let nuevoId;
    if (!this.productos.length) {
      nuevoId = 1;
    } else {
      nuevoId = this.productos[this.productos.length - 1].id + 1;
    }
    const nuevoProducto = {
      id: nuevoId,
      nombre: nombreProducto,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
    };

    let nombreProductoExiste = this.productos.some((elemento) => {
      return elemento.nombre === nombreProducto;
    });
    let descripcionExiste = this.productos.some((elemento) => {
      return elemento.descripcion === descripcion;
    });

    if (!nombreProducto || !descripcion || !precio || !stock) {
      console.log("Por favor completar todos los campos requeridos");
    } else if (nombreProductoExiste && descripcionExiste) {
      console.log("Este producto ya fue agregado");
    } else {
      this.productos.push(nuevoProducto);
      console.log("Nuevo producto agregado Id: ", nuevoId);
    }
  }

  getProduct() {
    console.log("Productos disponibles: ", this.productos);
  }

  getProductById(buscarId) {
    const idABuscar = this.productos.some((elemento) => {
      return elemento.id === buscarId;
    });
    let idEncontrado = buscarId - 1;
    if (idABuscar) {
      console.log(`Id ${buscarId} encontrado: `, this.productos[idEncontrado]);
    } else {
      console.log(`Id ${buscarId} no encontrada`);
    }
  }
}

const manager = new ProductManager();

manager.addProduct("Sal", "Prosal", 535, 480);
manager.addProduct("Yogurt", "La yogurisima sabor vainilla", 300, 500);
manager.addProduct("Queso", "Queso rayado El queson", 400, 140);
manager.addProduct("Vinagre", "Vinagre de manzana Marca Vinagron", 858, 537);
manager.addProduct("Queso", "Queso rayado El queson", 560, 190);
manager.addProduct("Queso Grande", "Queso rayado El queson", 560, 190);
manager.getProduct();

manager.getProductById(3);
