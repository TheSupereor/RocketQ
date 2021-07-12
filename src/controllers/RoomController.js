const Database = require("../db/config")

// Cada função aqui coordena as rotas vindas do route
module.exports = {
    async create(req, res){
        const db = await Database();
        const pass = req.body.password;
        //criar id com o handle
        let roomId = 0;
        let isRoom = true;

        while(isRoom){
            //gera número da sala
            for(var i = 0; i < 6; i++){
                i == 0 ? roomId += Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString();
            }

            //verificar se existe sala com mesmo número
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)

            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if(!roomsExistIds){
                //insere sala no banco de dados
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database();
        const roomId = req.params.room
        //pegar todas as questões onde o id da sala seja aquele
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isQuestions = true;

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isQuestions = false;
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isQuestions: isQuestions});
    },

    enter(req, res){
        //pegando o nome do camp vindo do form
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}