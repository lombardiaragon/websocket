const fs=require('fs')


class ContenedorMensajes{
    constructor(archivo){
        this.archivo=archivo
    }

    async save(object){
        const data=await fs.promises.readFile('data/messages.json','utf-8')
    
        const messages=JSON.parse(data)
        const id= messages.length+1
        object.id=id
        messages.push(object)
        console.log(messages)
        await fs.promises.writeFile('data/messages.json',JSON.stringify(messages))
   }
    
    async getAll(){
        const data=await fs.promises.readFile('data/messages.json','utf-8')
        console.log(JSON.parse(data)) 

    }

}

const db=new ContenedorMensajes('data')
module.exports = ContenedorMensajes;
