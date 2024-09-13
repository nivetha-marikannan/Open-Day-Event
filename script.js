fetch("http://openday.kumaraguru.in/api/v1/departments/")
    .then(response => response.json())
    .then(res => {
        const data = res;
        let depts = '';
        data.forEach(depart => {
            depts += `<div onclick="clicked(this);" id="${depart.id}" class="depts">
                         <img src="https://picsum.photos/id/${depart.id}/200/300" alt="Department Image ${depart.id}">
                         <h3>${depart.name}</h3>
                      </div>`;
        });
        document.getElementById('alldepartments').innerHTML = depts;
    })
    .then(() => {
        pagin(); 
    })
    .catch(err => {
        document.getElementById('alldepartments').innerHTML = `
            <div style="text-align: center; font-family: Georgia, 'Times New Roman', Times, serif; color: red;">
                <h2>Error! Unable to Fetch Data</h2>
                <h4>Error Details: ${err}</h4>
            </div>`;
    });

const search = () => {
    const searchbox = document.getElementById("search-dept").value.toUpperCase();
    const storeitems = document.getElementById("alldepartments");
    const depts = document.querySelectorAll(".depts");
    const dname = storeitems.getElementsByTagName("h3");

    for (let i = 0; i < dname.length; i++) {
        let match = depts[i].getElementsByTagName('h3')[0];
        let textvalue = match.textContent || match.innerText;
        if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
            depts[i].style.display = "block";
        } else {
            depts[i].style.display = "none";
        }
    }
    pagin(); 
}


function pagin() {
    const cardsPerPage = 100;
    const dataContainer = document.getElementById('alldepartments'); // Container holding department cards
    const prevButton = document.getElementById('prev'); // Previous button
    const nextButton = document.getElementById('next'); // Next button
    const pageNumbers = document.getElementById('page-numbers'); // Page numbers display
    
    const cards = Array.from(dataContainer.getElementsByClassName('depts')); // Department cards
    const totalPages = Math.ceil(cards.length / cardsPerPage); // Calculate total pages
    let currentPage = 1;

    
    function displayPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        cards.forEach((card, index) => {
            card.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });
    }

    
    function updatePagination() {
        pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
            updatePagination();
        }
    });

    
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
            updatePagination();
        }
    });

    
    displayPage(currentPage);
    updatePagination();
}

document.getElementById('realTimeMapButton').addEventListener('click', function() {
    // Replace with your real-time map URL
    const realTimeMapUrl = 'https://www.google.com/maps/place/Kumaraguru+College+of+Technology/@11.0777673,76.9870923,17z/';
    window.location.href = realTimeMapUrl;
});


function clicked(item) {
    const id = item.getAttribute("id");
    const url = `http://openday.kumaraguru.in/api/v1/department/${id}`;
    
    fetch(url)
        .then(response => response.json())
        .then(res => {
            const depname = `<h1>Department Name: ${res.name}</h1>`;
            const departimage = `<img src="https://picsum.photos/id/${id}/200/300" alt="Department ${id}">`;
            const descp = `
                <h2>Description: ${res.description}</h2>
                <h2>Block: ${res.block}</h2>
                <h2>Link: <a href="${res.link}" target="_blank">${res.link}</a></h2>`;
            
            // Storing details in local storage and redirecting to department page
            localStorage.setItem('depname', depname);
            localStorage.setItem('descp', descp);
            localStorage.setItem('departimage', departimage);
            window.location.href = "department.html";
        });
}
