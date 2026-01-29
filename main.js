// Crea una rubrica contenente una lista di contatti e con le seguenti funzionalita':
//  - Mostrare o nascondere la lista dei contatti
//  - Popolare la tabella con i contatti presenti nell’array di partenza
//  - Aggiungere un nuovo contatto
//  - Eliminare un contatto in rubrica
//  - Modificare un contatto presente in rubrica

// Cattura degli elementi HTML
let wrapperContacts = document.querySelector('#wrapperContacts');

// Buttons
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactsBtn = document.querySelector('#addContactsBtn');

// Inputs
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');


// Variabile d'appoggio
let check = false;


let rubrica = {
    // Array di partenza
    contactsList : [
        { contact_name: "Luca", contact_phone: "3471234567" },
        { contact_name: "Sara", contact_phone: "3299876543" },
        { contact_name: "Marco", contact_phone: "3665551122" },
        { contact_name: "Giulia", contact_phone: "3884412398" },
        { contact_name: "Andrea", contact_phone: "3517708899" }
    ],


    // Mostra/Nascondi la lista dei contatti
    showContacts : function(){
        wrapperContacts.innerHTML = '';
        wrapperContacts.classList.add('contacts');

        //Creazione del tag header della lista contatto + inserimento h2
        let header = document.createElement('header');
        header.classList.add('container-fluid', 'my-4');

        let h2 = document.createElement('h2');
        h2.classList.add('text-center', 'text-uppercase', 'fw-bold', 'm-0');
        h2.innerHTML = 'I tuoi contatti';

        header.appendChild(h2);
        wrapperContacts.appendChild(header);

        // Creazione Card Contatti
        this.contactsList.forEach( (contatto)=> {

            let row = document.createElement('div');
            row.classList.add('row', 'contact', 'justify-content-center', 'align-items-center', 'py-3', 'my-2');

            // COLONNA NOME
            let col1 = document.createElement('div');
            col1.classList.add('col-12', 'col-md-4', 'my-2', 'my-md-0');

            let p1 = document.createElement('p');
            p1.classList.add('text-center');
            p1.innerHTML = `${contatto.contact_name}`;

            col1.appendChild(p1);

            // COLONNA NUMERO
            let col2 = document.createElement('div');
            col2.classList.add('col-12', 'col-md-4', 'my-2', 'my-md-0');

            let p2 = document.createElement('p');
            p2.classList.add('text-center');
            p2.innerHTML = `${contatto.contact_phone}`;

            col2.appendChild(p2);

            // COLONNA ICONE
            let col3 = document.createElement('div');
            col3.classList.add('col-12', 'col-md-4', 'd-flex', 'align-items-center', 'justify-content-center', 'mx-auto', 'my-2', 'my-md-0');

            let i1 = document.createElement('i');
            i1.classList.add('fa-solid', 'fa-pencil', 'icons', 'modifyContact', 'me-5');

            let i2 = document.createElement('i');
            i2.classList.add('fa-solid', 'fa-trash-can', 'icons', 'removeContact');

            col3.appendChild(i1);
            col3.appendChild(i2);

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);

            wrapperContacts.appendChild(row);
        } );
                
        // Icone
        let removeContact = document.querySelectorAll('.removeContact');
        console.log(removeContact);
        
        //Rimuovi Contatto
        removeContact.forEach( (icona, i)=> {
            icona.addEventListener('click', ()=> {
                this.contactsList.splice(i, 1);
                this.showContacts();
            });
        } );

        let modifyContact = document.querySelectorAll('.modifyContact');
        modifyContact.forEach( (icona, i)=> {
            icona.addEventListener('click', ()=> {
                let newName = prompt('Inserire nuovo nome');
                this.contactsList[i].contact_name = newName;
                let newPhone = prompt('Inserire nuovo numero');
                this.contactsList[i].contact_phone = newPhone;

                this.showContacts();
            })
        });
    },
    

    addContacts : function(newName, newPhone){

        if(!newName && !newPhone){
            alert('Devi inserire un nome ed un numero')
        }
        else if(!newName){
            alert('Devi inserire un nome')
        }
        else if(!newPhone){
            alert('Devi inserire un numero di telefono')
        }
        else{
            this.contactsList.push({contact_name: newName, contact_phone: newPhone});
            this.showContacts();
            if(check==false){
                rubrica.showContacts();
                showContactsBtn.innerHTML = 'Nascondi Contatti';
                check = true;
            }  
        }

    },
};

showContactsBtn.addEventListener('click', ()=>{
    if(check==false){
        rubrica.showContacts();
        showContactsBtn.innerHTML = 'Nascondi Contatti';
        check = true;
    }
    else{
        wrapperContacts.innerHTML = '';
        wrapperContacts.classList.remove('contacts');
        showContactsBtn.innerHTML = 'Mostra Contatti';
        check = false;
    }
});

addContactsBtn.addEventListener('click', ()=>{
    rubrica.addContacts(nameInput.value, numberInput.value);
    nameInput.value = ''; 
    numberInput.value = '';
})