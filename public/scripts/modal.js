export default function Modal(){

    const modalWrapper = document.querySelector('.modal-wrapper')
    const cancelButton = document.querySelector('.button.cancel')
    
    cancelButton.addEventListener("click", close) //o ", close" substitui a => {}

    function open(){
        //funcionalidade atribuir a classe active
        modalWrapper.classList.add("active")
    }

    function close(){
        //funcionalidade de remover a classe active 
        modalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }

}