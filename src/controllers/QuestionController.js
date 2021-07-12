const Database = require('../db/config');
const route = require('../route');

module.exports = {
    async index(req, res){
        const db = await Database();
        //recuperando variáveis + senha colocada na modal
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;

        //verificar se a senha está correta
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)   //sempre que usar db colocar await
        //get vai pegar apenas um componente, por isso filtramos por id, depois conferimos se batem as senhas
        if(verifyRoom.pass == password){
            if(action == "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            }else if(action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }
            res.redirect(`/room/${roomId}`) //sempre dar um redirect para a origem
        } else {
            // ----------------------- CASO A SENHA NÃO SEJA CORRETA ---------------------------
            res.render('passincorrect', {roomId: roomId})
        }
    },

    async create(req,res){
        const db = await Database();
        const question = req.body.question  //body porque vem na requisição
        const roomId = req.params.room    //params porque vem na url

        await db.run(`INSERT INTO questions(
            title,
            read,
            room
        )VALUES(
            "${question}",
            0,
            ${roomId}
        )`)

        res.redirect(`/room/${roomId}`)
    }
}