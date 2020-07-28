

window.onload = () => {
    getProjects();
}

const getProjects = () => {
    const url = "https://api.airtable.com/v0/apphqklgF32gpsZ0S/Covid%20Tracker%20Challenge?view=Grid%20view&api_key=keyEQRJnJRRz6xGPM"
    fetch(url)
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        buildProjects(data);
    })
}

const buildProjects = (data) => {
    let html = ''
    data.records.forEach(record => {
        let fields = record.fields;
        let image = '../../assets/svg/components/abstract-shapes-20.svg'
        let screenshots = fields['Screenshot of your Project']
        let foundImage = screenshots.find(image => image.type == 'image/png' ||image.type == 'image/jpeg' )
        if(foundImage){
            image = foundImage.url
        }
        html +=  `<div class="col-md-6">
        <div class="card mb-4 shadow-sm transition-3d-hover">
            <div class="image card-img-top" style="background-image: url(${image})"></div>
          <div class="card-body">
            <h5 class="card-title">${fields['Name']}</h5>
            <a href="${fields['Live Link to your Project']}" target="_blank" class="btn btn-secondary">Live Site</a>
            <a href="${fields['Github link of your Project']}" target="_blank" class="btn btn-dark">GitHub <i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>` 
    });
    document.querySelector('.records').innerHTML = html;
}