import Modal from './modal';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button')

//Ouvir botões com a classe check
const checkButtons = document.querySelectorAll(".actions a.check");
//Ouvir quando o "marcar como lido" for clicado
checkButtons.forEach(button => {  //para cada botão
    //colocar listener
    button.addEventListener("click", handleClick)
})

const deleteButtons = document.querySelectorAll(".actions a.delete");

deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false));
})

function handleClick(event, check = true){
    event.preventDefault();
    const text = check ? "Marcar como lida" : "Excluir pergunta";

    //mudando a action do form pra enviar os dados
    const slug = check ? "check" : "delete";
    const roomId = document.querySelector("#room-id").dataset.id;
    const questionId = event.target.dataset.id;

    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

    //alterando textos da modal baseado na ação
    modalTitle.innerHTML = `${text}`;
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red"); //testando para ver se é o botão de excluir
    
    //abrir modal
    modal.open();
}