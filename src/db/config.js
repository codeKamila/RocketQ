const sqlite3 = require("sqlite3");
const { open } = require("sqlite")  //linha 2 pra procurar e trazer apenas a função open que ja faz parte do sqlite
      

//linha 5 configuração do banco de dados
module.exports = () => 
    
    open({
        filename: './src/db/rocketq.sqlite',
        driver: sqlite3.Database,
    });
    
/*
descrição
    open abre a conexão. filename passa qual é o arquivo do nosso banco. Onde rocketq.sqlite é o nome do banco
    driver comando o bd. É quem comando o arquivo que você colocou no filename
*/
