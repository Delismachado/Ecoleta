function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`

            }

            console.log(states)

        })
}



populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateinput = document.querySelector("[name=state]")

    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Intess coleta

//pegar todos os LIs

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
        // add or remove class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id




    // verificar s eexistem itens selecionados, se sim = pegar os intem selecionados
    const alreadySelected = selectedItem.findIndex(item => {
        const itemFound = item == itemId //isso será False or True
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
            // se não estiver selecionado, colocar na seleção
    } else {
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}