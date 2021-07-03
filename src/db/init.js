const Database = require("./config")

//inicia o banco, guarda as funções
const initDb = {    
    async init(){
        const db = await Database()
        
        await db.exec(`CREATE TABLE rooms (
            id INTERGER PRIMARY KEY,
            pass TEXT
        )`);
        
        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        )`);
        
        await db.close() //fecha conexão
    }
}

initDb.init();


//async: sem ele, o await não roda. Este segundo só rda em funções que são async's
//await: pra só chegar na próxima linha depois que o Database trazer o resultado para a const db. Ou seja, garante que essa const terá o valor certo.