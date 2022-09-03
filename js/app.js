const loadNewsCatagory = async() =>{
    const url= ` https://openapi.programming-hero.com/api/news/categories  `
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCatagory(data.data.news_category);

}
const displayNewsCatagory = (news_category) =>{
    console.log(news_category);
    const allCatagoryDiv = document.getElementById('catagory-div');
    let count = 0;
    news_category.forEach(singleNews => {
        console.log(singleNews)
        count = count+1;
        const singleCatagory = document.createElement('p');
        singleCatagory.setAttribute('onclick',`loadNews(${singleNews.category_id},'${singleNews.category_name}')`);
        singleCatagory.setAttribute('id',`newsType-${count}`);

        
        singleCatagory.innerHTML =`
        ${singleNews.category_name}
        `;
        allCatagoryDiv.appendChild(singleCatagory);
        
    });
    


}
loadNewsCatagory();
const loadNews = async(category_id,category_name) =>{
    toggleSpinner(true);
    console.log(category_id);
    const url= ` https://openapi.programming-hero.com/api/news/category/${'0'+category_id} `
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    const showNews = document.getElementById('input-feild');
    const showNewsValue = `${data.data.length} items found for this category ${category_name} `;
    showNews.value = showNewsValue;

    
}
const displayNews = (data) =>{
    
    // sort by view
    data.sort((a, b) => b.total_view- a.total_view);


    console.log(data);
    const newsContainer = document.getElementById('details-news');
    newsContainer.textContent= '';

    data.forEach(news =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        
        console.log(news);
        newsDiv.innerHTML=`
        <div class="row">
        <div class="col-md-4">
            <img src="${news.image_url}" alt="" class="img-fluid h-100 ">
        </div>
        <div class="col-md-8 p-5 ">
            <h3>${news.title}</h3>
            <p>${news.details.length > 506 ? news.details.slice(0,506) +'...' : news.details }</p>

                <div class="d-flex align-items-center justify-content-between">
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
                        <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"></i>
                    </div>
                </div>
                
        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);

    });
    
    toggleSpinner(false);
}

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

loadNews('1');

