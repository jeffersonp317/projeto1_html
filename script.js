//--------------------------------------VALIDAÇÃO DO FORMULÁRIO---------------------------------------------------------


function validar() {



    let nome = document.getElementById('selecione')
    let mercadoria = document.getElementById('id-mercadoria')
    let valor = document.getElementById('id-valor')



    if (nome.value == 0) {
        alert('Preencha o campo Tipo de transação')
        document.getElementById('selecione').style.border = '1px solid red'
        return false
    }

    else if (mercadoria.value == "") {
        alert('Preencha o campo Nome da mercadoria')
        document.getElementById('id-mercadoria').style.border = '1px solid red'
        return false
    }

    else if (valor.value == "") {
        alert('Preencha o campo Valor')
        document.getElementById('id-valor').style.border = '1px solid red'
        return false
    }

    else {

        //------------------------------------EMPURRANDO OS DADOS PARA O LOCALSTORAGE------------------------------------------------


        let novoprodutos = { tipo: nome.value, produto: mercadoria.value, valor: valor.value }

        localStorage.getItem(produtos)
        produtos.push(novoprodutos)

        localStorage.setItem("produtos", JSON.stringify(produtos))

        //----------------------------------------------------------------------------------------------------------------------------------


        //---------------------------------INSERINDO OS DADOS DO FORMULARIO NO EXTRATO DA PÁGINA---------------------------------------------

        add_extrato()


    }

    //-----------------------------------------RESET DOS INPUTS DO FORMULÁRIO-----------------------------------------------


    somar()
    extrato_titulo.style.display = "none"
    extrato.style.display = "block"
    extrato_transações.style.display = "block"
    sem_transações.style.display = "block"
    apagar_formulario.reset()

    return false


}

//----------------------------------------------ABRIR MENU TABLET E MOBILE------------------------------------------------------------------

function fecharMenu() {
    document.getElementById("menu-tablet").style.marginRight = "-300px";
}
function abrirMenu() {
    document.getElementById("menu-tablet").style.marginRight = "0px";
}
//------------------------------------------------------------------------------------------------------------------------------------------



function add_extrato() {
    div = `
<div class="extrato" id="extrato">
    <h2 class="extrato-transações">Extrato de transações</h2>
    <p class="sem-transações" id="sem-transações">Não há transações cadastradas</p>
`




    div = `
<h2 class="extrato-transações">Extrato de transações</h2>
<div class="descricao" id="descrição">
        <h3>Mercadoria</h3>
        <h3>Valor</h3>
    </div>
    
`


    for (let i = 0; i < produtos.length; i++) {


        if (produtos[i].tipo == "1") {
            produtos[i].tipo = '-'
        }
        if (produtos[i].tipo == "2") {
            produtos[i].tipo = "+"
        }



        div += `

    
<div id="tabela-extrato">
<div class="line" id="linha_1">
<div class="transacao">
<span id="transacao" class="sinal">${produtos[i].tipo}</span>
</div>

<span id="produto">${produtos[i].produto}</span> 
<span id="valor">${produtos[i].valor}</span>
</div> 
</div>
</div>
`


    }




    //--------------------------------------LUCRO OU PREJUÍZO DO TOTAL DO EXTRATO-------------------------------------------------




    if (somar() > 0) {

        div += `

        <div id="nova_linha"></div>
        <div class="resumo-transacoes" id="resumo_extrato">
                        
                        <h3>Total</h3>
                        <p id="soma_total">${somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div class="resultado">
                
            <h3 id="total_extrato"></h3>
            <br>
           <span id="lucro" style="color: green;">[LUCRO]</span>
        </div>
                </div>
         
        
        `
    }
    else if (somar() == 0) {

        div += `

        <div id="nova_linha"></div>
        <div class="resumo-transacoes" id="resumo_extrato">
                        
                        <h3>Total</h3>
                        <p id="soma_total">${somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div class="resultado">
                
            <h3 id="total_extrato"></h3>
            <br>
           
        </div>
                </div>
         
        
        `

    }
    else {
        div += `

    <div id="nova_linha"></div>
    <div class="resumo-transacoes" id="resumo_extrato">
                    
                    <h3>Total</h3>
                    <p id="soma_total">${somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <div class="resultado">
            
        <h3 id="total_extrato"></h3>
        <br>
       <span id="prejuizo" style="color: red;">[PREJUÍZO]</span>
    </div>
            </div>
     
    
    `
    }

    console.log(div)
    document.getElementById('extrato').innerHTML = div
}

//-------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------RESET DOS INPUTS DO FORMULÁRIO (VARIÁVEL)-----------------------------------------------



var apagar_formulario = document.getElementById('fomulario')


//--------------------------------------------TRATAMENTO DOS DADOS DO LOCALSTORAGE PARA A FUNÇÃO SOMAR-------------------------------------------------------------------------------------

function getdata() {
    somar()
    retornar_dados()
    var lsg = localStorage.getItem('produtos');
    if (lsg != null)
        produtos = JSON.parse(lsg)
}

//-------------------------------------------FUNÇÃO SOMA VALOR TOTAL EXTRATO--------------------------------------------------------



function somar() {

    var soma = 0
    for (let i = 0; i < produtos.length; i++) {
        let valor_sem_ponto = parseFloat(produtos[i].valor.replace(/\./g, "").replace(/,/g, ".").replace("R$", ""))
        console.log(valor_sem_ponto)



        if (produtos[i].tipo == "-") {
            valor_sem_ponto *= -1
        }

        soma += valor_sem_ponto


    }

    return soma

}


//----------------------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------INDICADOR DE ERRO DOS INPUTS DO FORMULÁRIO---------------------------------------------------

function cor_tipo_transação() {
    document.getElementById('selecione').style.border = '1px solid gray'

}


function campo_mercadoria() {
    document.getElementById('id-mercadoria').style.border = '1px solid gray'

}

function campo_valor() {
    document.getElementById('id-valor').style.border = '1px solid gray'

}
//-------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------VARIAVEL GLOBAL DOS INPUTS DO FORMULÁRIO PARA USO NO EXTRATO--------------------------------

var produtos = []

//------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------FUNÇÃO LIMPAR DADOS DO EXTRATO------------------------------------------------------


window.onload = () => {
    var sem_transações_extrato = document.getElementById('extrato')
    if (window.onload) {

        extrato_titulo.style.display = "none"
        sem_transações.style.display = "block"


        getdata()
        retornar_dados()
    }
    else if (produtos.length == 0) {
        sem_transações.style.display = "block"
    }





}





function limparDados() {
    console.log(botao_limpar_dados)

    var botao_limpar_dados = window.confirm('Deseja apagar todos os dados?')

    if (botao_limpar_dados == true) {
        localStorage.clear()

        var transação_extrato = document.getElementById('tabela-extrato')
        var total_extrato = document.getElementById('linha_1')


        extrato_titulo.style.display = "block"
        extrato.style.display = "none"



        transação_extrato.innerHTML = []
        total_extrato.innerHTML = []

        produtos = []
        document.getElementById('extrato').innerHTML = []
    }
    else {
        return false
    }

}

//---------------------------------------------------------------------------------------------------------------------------



//----------------------------------------MOSTRAR TRANSAÇÃO SALVA AO RECARREGAR A PÁGINA---------------------------------------------



function retornar_dados() {


    div = `
    <div class="extrato" id="extrato">
        <h2 class="extrato-transações">Extrato de transações</h2>
        <p class="sem-transações" id="sem_transações">Não há transações cadastradas</p>
        
        </div>
    `

    div = `
    <h2 class="extrato-transações">Extrato de transações</h2>
    
    <div class="descricao" id="descrição">
            <h3>Mercadoria</h3>
            <h3>Valor</h3>
        </div>
        
    `



    for (let i = 0; i < produtos.length; i++) {


        if (produtos[i].tipo == "1") {
            produtos[i].tipo = '-'
        }
        if (produtos[i].tipo == "2") {
            produtos[i].tipo = "+"
        }


        div += `
    
        
    <div id="tabela-extrato">
    <div class="line" id="linha_1">
    <div class="transacao">
    <span id="transacao" class="sinal">${produtos[i].tipo}</span>
    </div>
    
    <span id="produto">${produtos[i].produto}</span> 
    <span id="valor">${produtos[i].valor}</span>
    </div> 
    </div>
    </div>
    `


    }




    //--------------------------------------LUCRO OU PREJUÍZO DO TOTAL DO EXTRATO-------------------------------------------------




    if (somar() > 0) {

        div += `
    
            <div id="nova_linha"></div>
            <div class="resumo-transacoes" id="resumo_extrato">
                            
                            <h3>Total</h3>
                            <p id="soma_total">${somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <div class="resultado">
                    
                <h3 id="total_extrato"></h3>
                <br>
               <span id="lucro" style="color: green;">[LUCRO]</span>
            </div>
                    </div>
             
            
            `
    }
    else if (somar() == 0) {

        div += `
            
            <div id="nova_linha"></div>
            <div class="resumo-transacoes" id="resumo_extrato">
                            
                            <h3>Total</h3>
                            <p id="soma_total">${somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <div class="resultado">
                    
                <h3 id="total_extrato"></h3>
                <br>
               
            </div>
                    </div>
             
            
            `
    }

    else {
        div += `
    
        <div id="nova_linha"></div>
        <div class="resumo-transacoes" id="resumo_extrato">
                        
                        <h3>Total</h3>
                        <p id="soma_total">${somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        <div class="resultado">
                
            <h3 id="total_extrato"></h3>
            <br>
           <span id="prejuizo" style="color: red;">[PREJUÍZO]</span>
        </div>
                </div>
         
        
        `
    }

    console.log(div)
    document.getElementById('extrato').innerHTML = div
}


//------------------------------------------MÁSCARA DO CAMPO VALOR DO FORMULÁRIO------------------------------------------------


function mascara_valor() {
    var elemento = document.getElementById('id-valor');
    var valor = elemento.value;

    valor = valor.replace(/\D/g, '')
    valor = valor.replace(/(\d{1})(\d{1,2})$/, "$1,$2")
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    valor = valor.replace(/^(\d)/g, "R$ $1")
    elemento.value = valor;

}

//-----------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------FUNÇÃO PARA ENVIAR DADOS PARA SERVIDOR WEB AIRTABLE--------------------------------------------

var aluno = "4810"

function salvarDados() {



    fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM"

        }
    })
        .then(response => response.json())
        .then(responseJson => {
            existe = responseJson.records.filter((record) => {
                if (aluno == record.fields.Aluno) {
                    return true
                }

                return false

            })
            if (existe.length == 0) {
                inserirDados()
            }
            else {
                alterarDados()
            }
        })
    alert("Dados salvos com Sucesso!")
}

function inserirDados() {
    var json = JSON.stringify(produtos)


    var body = JSON.stringify({
        "records": [{
            "id": "recMgs76bVOjNXOg8",
                "fields": {
                    "Aluno": aluno,
                    "Json": json
                }
            }
        ]
    })

    fetch('https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico', {
        method: "POST",
        headers: {
            Authorization: "Bearer key2CwkHb0CKumjuM",
            "Content-Type": "application/json"
        },
        body:body
    })

}
function alterarDados(){
    var json = JSON.stringify(produtos)
    var body = JSON.stringify({
        "records": [{
            "id": "recMgs76bVOjNXOg8",
            "fields":{
                "Aluno": aluno,
                "Json": json
            }

        }]
    })
    
    fetch('https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico', {
        method:'PATCH',
        headers:{
            authorization: "Bearer key2CwkHb0CKumjuM",
            "Content-Type": "application/json"},
            body:body
        })
}







































