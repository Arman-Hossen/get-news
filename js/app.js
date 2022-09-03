/* 
Load data for add catagory dynamically
*/

const loadNewsCatagory = async() =>{
    const url= ` https://openapi.programming-hero.com/api/news/categories  `
    /*  apply Error handler */
   try{
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCatagory(data.data.news_category);
   }
   /* catch error if any have. */
   catch(error){
    console.log(error);

   }

}
/* Display All News Catagory in Dynamically */
const displayNewsCatagory = (news_category) =>{
    // console.log(news_category);
    /* get the catagory div */
    const allCatagoryDiv = document.getElementById('catagory-div');
    let count = 0;
    /* find each news catarory from all catagory */
    news_category.forEach(singleNews => {
        // console.log(singleNews)
        count = count+1;
        /* create catagory button and its class and set attribute */
        const singleCatagory = document.createElement('button');
        singleCatagory.classList.add('btn');
        singleCatagory.setAttribute('onclick',`loadNews(${singleNews.category_id},'${singleNews.category_name}')`);
        singleCatagory.setAttribute('id',`newsType-${count}`);

        /* set inner html */
        singleCatagory.innerHTML =`
        ${singleNews.category_name}
        `;
        allCatagoryDiv.appendChild(singleCatagory);
        
    });
    


}
//display the catagory by calling function
loadNewsCatagory();
/* load news data  */
const loadNews = async(category_id,category_name) =>{
    /*  run spinner it will run by onclick function on each button */
    toggleSpinner(true);
    // console.log(category_id);
    const url= ` https://openapi.programming-hero.com/api/news/category/${'0'+category_id} `
    try{
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    const showNews = document.getElementById('input-feild');
    const showNewsValue = `${data.data.length} items found for this category ${category_name} `;
    showNews.innerText = showNewsValue;

    }
    catch(error){
        console.log(error);
    
    }
  
    
}
// news card
const displayNews = (data) =>{
    
    // sort by view
    data.sort((a, b) => b.total_view- a.total_view);

    const newsContainer = document.getElementById('details-news');
    newsContainer.textContent= '';

    data.forEach(news =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        
        // console.log(news);
        newsDiv.innerHTML=`
        <div class="row">
        <div class="col-md-4">
            <img src="${news.image_url}" alt="" class="img-fluid h-100 ">
        </div>
        <div class="col-md-8 p-5 ">
            <h3>${news.title}</h3>
            <p>${news.details.length > 506 ? news.details.slice(0,506) +'...' : news.details }</p>

                <div class="d-flex align-items-center justify-content-between flex-sm-row flex-column">
                    <div class="d-flex align-items-center ">
                        <img src="${news.author.img}" alt="" height="30" class="rounded-circle">
                        <div >
                            <p>${news.author.name} </p>
                            <p>${news.author.published_date}</p>
                        </div>
                    </div>

                    <div>
                        <span><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view}M</span>

                    </div>

                    <div>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <div>
                        <i class="fa-solid fa-arrow-right" onclick ="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"></i>
                    </div>
                </div>
                
        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);

    });
    
    toggleSpinner(false);
}

// spinner function

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
// load data for modal
const loadNewsDetails = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
   try{
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
   }
    catch(error){
        console.log(error);
    
    }
}
// set modal inner html
const displayNewsDetails = news =>{
    // console.log(news);
    // console.log(news.author.name);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = news.title;

    const newsDetails = document.getElementById('news-details');
    
    newsDetails.innerHTML = `
        
        <p>ID: ${news._id ? news._id: 'No ID Found'}</p>
        <p>Catagory No: ${news.category_id ? news.category_id : 'No category id Found'}</p>
        <p>Author Name: ${news.author.name? news.author.name : 'No Name Found'}</p>
        <p>Published Date: ${news.author.published_date? news.author.published_date : 'No published date Found'}</p>
        <p>Rating: ${news.rating.number ? news.rating.number : 'No Rating Found'}</p>
        <p>Badge: ${news.rating.badge ? news.rating.badge : 'No Badge Found'}</p>
        <img src="${news.thumbnail_url}" alt="" >
        <p>Total Veiw: ${news.total_view ? news.total_view : 'No Veiw Found'}</p>
        <p>Details Information: ${news.details ? news.details : 'No details information Found'}</p>
        
        
    `;

}
// loadNewsDetails('0282e0e58a5c404fbd15261f11c2ab6a');

loadNews('8');
 /* conected blog and news page */
const goToNews = () =>{
    window.location.href = 'index.html';
}
const goToBlog = () =>{
    window.location.href = 'blog.html';
}

