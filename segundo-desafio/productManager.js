const fs =require("fs");

class ProductManager{
    constructor(path){
        this.path=path,
        this.productos=[ ]
    };

    async getProducts(){
    const listaProductos= await fs.promises.readFile(this.path,"utf-8");
    const listaProductosParse=JSON.parse(listaProductos);
    return listaProductosParse;
    };

    async generateId(){
        const counter=this.productos.length;
        if(counter==0){
            return 1;
        }else{
            return (this.productos[counter-1].id)+1 ;
        };
    }

    async addProduct(nombreProducto,descripcion,precio, codigo, stock){
        if(!nombreProducto || !descripcion || !precio || !codigo || !stock){
            console.log("INGRESE TODOS LOS DATOS DEL PRODUCTO");
            return ;
        }else{
            const nombreProductoExiste = this.productos.find(elemento=>elemento.nombreProducto===nombreProducto);
            const descripcionExiste = this.productos.find(elemento=>elemento.nombreProducto===nombreProducto);
            if(nombreProductoExiste && descripcionExiste){
                console.log("EL PRODUCTO QUE DESEA AGREGAR YA ESTÁ AGREGADO, INGRESE UNO NUEVO");
                return;
            }else{
                const id=await this.generateId();
                const nuevoProducto={
                    id,
                    nombre : nombreProducto,
                    descripcion,
                    precio,
                    codigo,
                    stock
                };
                this.productos.push(nuevoProducto);
                await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,`\t`));
                console.log("PRODUCTO AGREGADO");
            };
        };
    };

    async updateProduct(id,nombreProducto,descripcion,precio,codigo, stock){
        if(!id|| !nombreProducto || !descripcion || !precio || !codigo ||!stock){
            console.log("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION");
            return ;
        }else{
            const todosProductos=await this.getProducts();
            const codigoRepetido=todosProductos.find(elemento=>elemento.codigo===codigo);
            if(codigoRepetido){
                console.log("EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR YA ES EXISTE, ELIJA OTRO CODIGO");
                return;
            }else{
                const listaProductosActuales=await this.getProducts();
                const nuevaListaProductos=listaProductosActuales.map(elemento=>{
                    if(elemento.id===id){
                        const productoActualizado={
                            ...elemento,
                            nombre: nombreProducto,
                            descripcion,
                            precio,
                            codigo,
                            stock
                        };
                        return productoActualizado;
                    }else{
                        return elemento;
                    };
                });
                    await fs.promises.writeFile(this.path,JSON.stringify(nuevaListaProductos,null,`\t`));
                    console.log("PRODUCTO ACTUALIZADO");
            }
        }
    };

    async deleteProduct(id){
        const todosProductos=await this.getProducts();
        const productswithoutfound=todosProductos.filter(elemento=>elemento.id!==id);
        await fs.promises.writeFile(this.path,JSON.stringify(productswithoutfound,null,2));
        console.log(`PRODUCTO ID ${id} FUE ELIMINADO`);
    };
    
    async getProductbyId(id){
        const todosProductos=await this.getProducts();
        const encontrarProducto=todosProductos.find(element=>element.id===id);
        console.log(`PRODUCTO ID ${id} ENCONTRADO: `);
        return encontrarProducto;
    }


}
const productManager=new ProductManager("./segundo-desafio/productos.json");
const opersAsincronas = async ()=> {
    try {
        await productManager.addProduct("producto1", "descripcion1", 500, "48976", 990);
        await productManager.addProduct("product2","description2",100, "35465767", 600);
        await productManager.addProduct("product3","description2",6700, "355433", 870);
        await productManager.updateProduct(2,"Fernet","Fernet Branca sabor original 750ml ",3600, "48979", 987);
        const lista1 = await productManager.getProducts();
        console.log(lista1);
        await productManager.deleteProduct(3)
        const lista2 = await productManager.getProducts();
        console.log(lista2);
        console.log(await productManager.getProductbyId(1));
    } catch (error) {
        console.log(error.message);
    }
};


opersAsincronas()