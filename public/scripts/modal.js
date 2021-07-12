export default function Modal(){
    const modalWrapper = document.querySelector('.modal-wrapper');
    const cancelButton = document.querySelector('.button.cancel');

    cancelButton.addEventListener("click", close);

    function open(){
        //adicionar classe active para modal
        modalWrapper.classList.add("active");
    }

    function close(){
        //remover classe active para modal
        modalWrapper.classList.remove("active");
    }

    return { open, close };
}