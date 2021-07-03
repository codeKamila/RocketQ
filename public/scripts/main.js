import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')


//Pegar todos os botões que existem com a class check
const checkButtons = document.querySelectorAll(".actions a.check") //só check tbm valeria mas pode dar erro caso exista outro tipo de check (que não seja um link a)

checkButtons.forEach(button => {
    //adicionar a escuta
    button.addEventListener("click", handleClick)
})


//DELETAR
//Quando o botão delete for clicado, aparace a modal
const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    //dizer que o a não se comporta como link para tirar o # da barra de busca
    event.preventDefault() 
    const text = check ? "Marcar como lida" : "Excluir"

    //montando a url
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id //target seleciona toda a tag em que o event ocorre    

    const form = document.querySelector('.modal form')
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`) //("quem você muda", "pra que você muda")

    //altera a escrita do html dependendo do modal (ser for p/ marcar como lida ou p/ excluir pergunta)
    modalTitle.innerHTML = `${text} esta pergunta` //concatena o título com a frase pra que a gente não repita código
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?` //lowercase() deixa tudo minusculo
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    //abre a modal
    modal.open()
}

