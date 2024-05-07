let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create'
let temp ;
// Get Total fuction
function gettotal(){
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value 
        total.innerHTML = result 
        total.style.background = "#0e4909"
    }else{
        total.innerHTML = ""
        total.style.background = "#a00d02"
    }
}

// create prouduct

let datapro ;
if(localStorage.prouduct !=null){
    datapro = JSON.parse(localStorage.prouduct )
}else{
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title:title.value.tolowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.tolowerCase(),
    }

    if (title.value != ''
    &&price.value !=''
    &&category.value!=''
&&newpro.count < 100 ) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                    
                }
                
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[temp] = newpro;
            mood = 'create'
            submit.innerHTML = 'create'
            count.style.display = 'block'
    
        }
        cleardata();
    }

   
   
    
    localStorage.setItem("prouduct", JSON.stringify(datapro));
   
    showData();



}

// clear inputs
function cleardata() {
    title.value = "" ;
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "" ;
    count.value = "" ;
    category.value = "";
    total.innerHTML = "";



}
 function showData() {
    gettotal()
    let Table = ""
    for (let i = 0; i < datapro.length; i++) {
         Table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
    </tr>
        
        `
        
    }
    document.getElementById("tbody").innerHTML = Table;
    let btndelete = document.getElementById("deleteAll")
    if (datapro.length > 0) {
        btndelete.innerHTML = `
        <button onclick = " deleteAll() " >delete All (${datapro.length}) </button>
        `
        
    }else{
        btndelete.innerHTML = "";
    }

 }
 showData();

// delete
 function deleteItem(i) {
    datapro.splice(i,1);
    localStorage.prouduct = JSON.stringify(datapro);
    showData();
 }


 function deleteAll() {
    localStorage.clear()
    datapro.splice(0);
    showData();
 }


function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value  =  datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display= 'none';
    category.value = datapro[i].category;
    console.log(category.value);
    submit.innerHTML = " update";
    mood = 'update'
    temp = i
    scroll({
        top:0,
        behavior:'smooth'
    })
}
 let searchmood = 'title'

 function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchtitle') {
        searchmood = 'title'
       
    }else{
        searchmood = 'category'
    
    }
    search.placeholder = 'Search By ' + searchmood;
    search.focus();
    search.value = '';
    showData();
    
 }



 function SearchData(value) {
let Table = '';
    if (searchmood ==  'title') {

        for (let i = 0; i < datapro.length; i++) {
         if (datapro[i].title.includes(value.tolowerCase())) {

            Table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
        </tr>
            
            `
            
         }
            
        }




        
    }else{
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.tolowerCase())) {
   
               Table += `
               <tr>
               <td>${i}</td>
               <td>${datapro[i].title}</td>
               <td>${datapro[i].price}</td>
               <td>${datapro[i].taxes}</td>
               <td>${datapro[i].ads}</td>
               <td>${datapro[i].discount}</td>
               <td>${datapro[i].total}</td>
               <td>${datapro[i].category}</td>
               <td><button onclick="updateData(${i})" id="update">update</button></td>
               <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
           </tr>
               
               `
               
            }
               
           }
    }
    document.getElementById("tbody").innerHTML = Table;
 }
