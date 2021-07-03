const Database = require('../db/config')

module.exports = {
    async index(req, res){ //recebe a modal: action, numero da sala e da questão e senha
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password

        //await é sempre antes do db.
        //verificar se a senha está correta
        //db.get só trás um dado mas é preciso garantir qual é esse dado único. por isso pedir o id em vez da senha (diretamente). Pq não é possivel ter duas salas com o mesmo id. Mas é possivel ter duas salas com a mesma senha
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass == password){
            if(action == "delete"){
                
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            
            }else if(action == "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }

            res.redirect(`/room/${roomId}`)
        }else{
            res.render('passincorrect', {roomId: roomId})
        }

    },

    async create(req, res){
        const db = await Database()
        
        const question = req.body.question
        const roomId = req.params.room
    
        //cadastra a questão
        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/room/${roomId}`)
    
    }
}