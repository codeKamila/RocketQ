const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let isRoom = true

        let roomId

        while(isRoom){
            for(i = 0; i < 6; i++ ){
                i === 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
            }  
            
            /* Verifica se esse numero já existe */ 
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomId =>  roomsExistIds === roomId)

            if(!isRoom){
                // Inseri a sala no banco de Dados
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                )VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)    
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions 
        
        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }


        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    async enter(req, res){
        const roomId = req.body.roomId
        const db = await Database()
        const roomsExistIds = await db.get(`SELECT id FROM rooms WHERE id = ${roomId}`)
        
        await db.close()

        if (roomsExistIds !== undefined) {
            res.redirect(`/room/${roomId}`)           
        }else {
            res.redirect(`/create-pass`)      
        }
    }
}