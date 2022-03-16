import fetchData from "../utils/fetchData.js";

const paginationComponent = {}

// ####seccion de funciones para setear la paginacion 


paginationComponent.setPagination = () =>{
    pagination.innerHTML = '';
    if((totalProductsRequest / 12) > 1){
        if(paginations > 1) {
            pagination.appendChild(document.createElement('button'));
            pagination.lastElementChild.classList.add('previous');
            pagination.lastElementChild.innerText = 'Anterior';
            pagination.lastElementChild.onclick = () => {
                setCurrentPageByNextOrPrevious('previous');
            }
        }
        if(!isMorePages && initialRow != 0){
            let less  = document.createElement('button');
            less.classList.add('nextPages');
            less.innerText = `...${requestRespond.nextPage -1 }`;
            less.style.fontWeight = 'bold';
            less.addEventListener('click', () => {
                setReloadGetProduct(0);
            });
            pagination.appendChild(less);
        }
        for(let i = 1; i <= paginations; i++){ // for para crear los botones de paginacion
            let page = document.createElement('button');
            page.innerText = `${i}`;
            if(i == currentPage){
                page.classList.add('active-page');
            }
            page.addEventListener('click', () => {
                setCurrentPageByPageNumber(i);
            });
            pagination.appendChild(page);
        }
        if(isMorePages) {
            let more = document.createElement('button');
            more.classList.add('nextPages');
            more.innerText = `...${requestRespond.nextPage}`;
            more.style.fontWeight = 'bold';
            more.addEventListener('click', () => {
                setReloadGetProduct(1);
            });
            pagination.appendChild(more);
        }
        if(paginations > 1) {
            pagination.appendChild(document.createElement('button'));
            pagination.lastElementChild.classList.add('next');
            pagination.lastElementChild.innerText = 'Siguiente';
            pagination.lastElementChild.onclick = () => {
                setCurrentPageByNextOrPrevious('next');
            }
        }
    }
}
// si por cualquier instancia la paginacion no ocurre bien siempre se puede usar esta funcion para resetear a la pagina 1
paginationComponent.resetPagination = () => { 
    currentPage = 1;
    //currentProductShowed = 12;
}

const setCurrentPageByPageNumber = (page_number) => {
    currentPage = page_number;
    //currentProductShowed = currentPage * 12;
    renderProductsWithPagination(HTMLResponse, currentPage);
}

const setCurrentPageByNextOrPrevious = (order) => {
    if(order == 'next' && currentPage < paginations){
        currentPage++;
    }
    if(order == 'previous' && currentPage > 1){
        currentPage--;
    }
    //currentProductShowed = currentPage * 12;
    renderProductsWithPagination(HTMLResponse, currentPage);
}

// 0 para retroceder en la paginacion y 1 para adelantar en la paginacion
const setReloadGetProduct = (option) => {
    if(option == 0){
        initialRow = requestRespond.previousRowValue;
    }
    if(option == 1){
        initialRow = requestRespond.nextRowValue;
    }
    
    fetchData.setRequestSetup(initialRow, pagesDisplayed, currentProductShowed);
    fetchData.getProducts(fetchData.API_URL, HTMLResponse, 0);
    fetchData.getCategories(fetchData.API_URL);
}

export default paginationComponent;
