var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');

var productList;

if (localStorage.getItem('productLS') != null) {
    productList = JSON.parse(localStorage.getItem('productLS'))
    displayProducts(productList);
}
else {
    productList = [];
}

function productsItems() {
    var products = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value,
    }
    productList.push(products);
    localStorage.setItem('productLS', JSON.stringify(productList))
    clearForm();
    displayProducts(productList);
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = '';
}

function displayProducts(ps) {
    var tdContainer = ``;
    for (i = 0; i < ps.length; i++) {
        tdContainer += `
        <br>
        <tr>
        <td >${ps[i].name}</td>
        <td >${ps[i].price}</td>
        <td >${ps[i].category}</td>
        <td >${ps[i].description}</td>
        <td><button onclick ='productUpdate(${i});' style='padding:5px 10px ; background-color:GoldenRod ;  color:black ; border-radius : 10px'>Update</button></td>
        <td><button onclick ='productDelete(${i});' style='padding:5px 10px ; background-color:brown ; color:white ; border-radius : 10px'>Delete</button></td>
        </tr>
        `
    }

    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = tdContainer;

}

function productSearch(term) {
    searchResult = [];
    for (i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchResult.push(productList[i]);
        }
    }

    displayProducts(searchResult);
}

function productUpdate(indexUpdate) {
    productName.value = productList[indexUpdate].name;
    productPrice.value = productList[indexUpdate].price;
    productCategory.value = productList[indexUpdate].category;
    productDescription.value = productList[indexUpdate].description;
}

function productDelete(indexDelete) {
    productList.splice(indexDelete, 1);
    localStorage.setItem('productLS', JSON.stringify(productList))
    displayProducts(productList);
}



// Resposive
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('#tableBody tr');

    tableRows.forEach(row => {
        row.querySelectorAll('td').forEach((cell, index) => {
            const headerText = document.querySelector(`#table thead th:nth-child(${index + 1})`).innerText;
            cell.setAttribute('data-label', headerText);
        });
    });
});






