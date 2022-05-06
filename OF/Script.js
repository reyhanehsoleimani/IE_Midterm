let movies_url = ["https://swapi.dev/api/films/"]


async function main() {
    var current_page = 0;
    var pages_count = 0;
    var footer_element = document.getElementById("footer");
    var content_name = document.getElementById("content_name");
    var content_element = document.getElementById("content");
    var movie_spaceships = [];
    var content = ``;
    var spaceship_content = ``;
    
    content_element.innerHTML = "Loading...";
    var movie_spaceships = [];
    for (let i = 1; i <= 6; i++) {
        var movie = await getMovieJSON(movies_url + "" + i);
        movie_spaceships.push(movie);
    }    
    for (let i = 0; i < 6; i++) {
        var starships = [];
        for (let j = 0; j < movie_spaceships[i].starships.length; j++) {
            var spaceship = await getSpaceshipJSON(movie_spaceships[i].starships[j]);
            starships.push(spaceship);
        }
        movie_spaceships[i].starships = starships;
    }

    async function getMovieJSON(url) {
        var jsonResult = fetch(url).then(
            (response) => {
                return response.json();
            });
    
        var result = jsonResult.then(data => {
            return {
                title: data.title,
                starshipNum: data.starships.length,
                episode_id: data.episode_id,
                release_date: data.release_date,
                starships: data.starships,
            };
        }) 
        return result;
    }

    async function getSpaceshipJSON(url) {
        var jsonResult = fetch(url).then(
            (response) => {
                return response.json();
            });
    
        var result = jsonResult.then(data => {
            return {
                name: data.name,
                model: data.model,
                manufacturer: data.manufacturer,
                crew: data.crew,
                passengers: data.passengers
            };
        }) 
        return result;
    }

    function showDetailSpaceship(movieNum, spaceNum) {
        let data = movie_spaceships[movieNum].starships[spaceNum];
        content_name.innerHTML = "";
        let content = `
        <div style="display: flex; justify-content: space-between">
            <div style="margin-right: 35px;">
                <h1 style="font-size:24px;">Starships</h1>
                <ul>
                    <li>${data.name}</li>
                </ul>
            </div>
            <div style="margin-left: 35px;">
                <h1 style="font-size:24px;">${data.name}</h1>
                <ul>
                    <li>Name: ${data.name}</li>
                    <li>Model: ${data.model}</li>
                    <li>Manufacturer: ${data.manufacturer}</li>
                    <li>Crew: ${data.crew}</li>
                    <li>Passengers: ${data.passengers}</li>
                </ul>
            </div>
        </div>
        `;
        content_element.innerHTML = content;
        current_page = 0;
    }
    

    function showSpaceship(name, part) {
        current_page = part;
        content_name.innerHTML = "";
        let num=0;
        while(movie_spaceships[num].title!==name){
            num += 1
        }
        pages_count = Math.ceil(movie_spaceships[num].starships.length/10);
        var total = (movie_spaceships[num].starships.length>(part*10)) ? part*10 : movie_spaceships[num].starships.length;
        spaceship_content = ``;
        spaceship_content += `
        <div style="display: flex; justify-content: space-between">
            <div>
                <h1 style="font-size:24px;">Movie Name</h1>
                <ul><li>${name}</ul></li>
            </div>
            <div>
                <h1 style="font-size:24px;"> Starships</h1>
                <ul>
        `;

        for (let j=((part-1)*10); j<total; j++) {
            spaceship_content += `
            <li id='${movie_spaceships[num].starships[j].name}'><a href="#">${movie_spaceships[num].starships[j].name}</a></li>
            `;
        }
        spaceship_content += `</ul> </div> </div>`;
        content_element.innerHTML = spaceship_content;
        for(let j=((part-1)*10); j<total; j++) {
            var li = document.getElementById(movie_spaceships[num].starships[j].name);
            li.addEventListener('click', function handleClick(event){
                showDetailSpaceship(num, j);
                current_page = -1;
                showFooter("", -1);
            });
        }
        
    }

    function showFooter(name, current) {
        current_page = current;

        var footerContent = ``;
        if (current_page>1 && current_page<(pages_count)){
            footerContent = `
                <ul class="starship">
                    <li>
                        <span><a href="#" id="prev">Prev</a></span>
                        <span href="# id="current">Page- ${current_page}</span>
                        <span><a href="#" id="next">Next</a></span>
                    </li>
                    <li>
                        <a href="#" id="back_to_movie">Back to Movies</a>
                    </li>
                </ul>
            `;
            footer_element.innerHTML = footerContent;
            var li_prev = document.getElementById("prev");
            li_prev.addEventListener('click', function handleClick(event) {
                current_page -= 1;
                showSpaceship(name, (current_page));
                showFooter(name, current_page);
            });
            var li_next = document.getElementById("next");
            li_next.addEventListener('click', function handleClick(event){
                current_page += 1;
                showSpaceship(name, (current_page));
                showFooter(name. current_page);
            });
        }
        if (current_page === 1 && current_page< (pages_count)) {
            footerContent = `
                <ul class="starship">
                    <li>
                        <span href="# id="current">Page- ${current_page}</span>
                        <span id="next"><a href="#">Next</a></span>
                    </li>
                    <li>
                        <a href="#" id="back_to_movie">Back to Movies</a>
                    </li>
                </ul>
            `;
            footer_element.innerHTML = footerContent;
            var li_next = document.getElementById("next");
            li_next.addEventListener('click', function 
            handleClick(event){
                current_page += 1;
                showSpaceship(name, (current_page));
                showFooter(name, (current_page));
            });
        }
        if (current_page ==pages_count && current_page>1) {
            footerContent = `
                <ul class="starship">
                    <li>
                        <span id="prev"><a href="#">Prev</a></span>
                        <span href="# id="current">Page- ${current_page}</span>
                    </li>
                    <li>
                        <a href="#" id="back_to_movie">Back to Movies</a>
                    </li>
                </ul>
            `;
            footer_element.innerHTML = footerContent;
            var li_prev = document.getElementById("prev");
                li_prev.addEventListener('click', function handleClick(event) {
                current_page -= 1;
                showSpaceship(name, (current_page));
                showFooter(name, current_page);
            });
        }
        if (current_page==1 && current_page==(pages_count)) {
            footerContent = `
                <ul class="starship">
                    <li>
                        <span href="# id="current">Page- ${current_page}</span>
                    </li>
                    <li>
                        <a href="#" id="back_to_movie">Back to Movies</a>
                    </li>
                </ul>
            `;
            footer_element.innerHTML = footerContent;
        }
        if (current_page==-1) {
            footerContent = `
                <ul class="starship">
                    <li>
                        <a href="#" id="back_to_movie">Back to Movies</a>
                    </li>
                </ul>
            `;
            footer_element.innerHTML = footerContent;
        }

        var li_back_movie = document.getElementById("back_to_movie");
        li_back_movie.addEventListener('click', function handleClick(event)  {
            showMovies();
        })
    }
    
    function showMovies() {
        current_page = 0;
        content = `<ul>`;
        content_name.innerHTML = "Movies";
        footer_element.innerHTML = "";
        for (let i=0; i<6; i++){
            content += `<li><div id='${movie_spaceships[i].title}' class="movie_style" ><div><b><font face="Arial" size="4px">${movie_spaceships[i].title}</font></b> <br> <font face="Arial" size="2px">Episode ID: ${movie_spaceships[i].episode_id} <br> Release Date: ${movie_spaceships[i].release_date}</font></div><div><a href="#">Starships</a></div></div></li>`;
        }
        content += `</ul>`;
        content_element.innerHTML = content;
        for (let i=0; i<6; i++) {
            
            var li = document.getElementById(movie_spaceships[i].title);
            li.addEventListener('click', function handleClick(event){
                showSpaceship(movie_spaceships[i].title, current_page+1);
                next_page = Math.floor(movie_spaceships[i].starships.length/10) >=1 ? 1 : 0;
                showFooter(movie_spaceships[i].title, current_page);
            });
        }
    }    
    showMovies();
    return movie_spaceships;
}

main();

