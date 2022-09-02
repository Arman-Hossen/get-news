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
        count = count+1;
        const singleCatagory = document.createElement('p');
        singleCatagory.setAttribute('id',`newType-${count}`);

        
        singleCatagory.innerHTML =`
        ${singleNews.category_name}
        `;
        allCatagoryDiv.appendChild(singleCatagory);
        
    });

}
loadNewsCatagory();
const loadNews = async() =>{
    const url= ` https://openapi.programming-hero.com/api/news/categories  `
    const res = await fetch(url);
    const data = await res.json();
}
