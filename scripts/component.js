const rowContentBuilder = (itemname, itemdesc, itemprice) => {
    return `
        <div class="col-md-6">
            <div class="row menu-list">
                <div class="col-lg-6 col-md-12">
                    <img class="img-responsive" src="https://b.zmtcdn.com/data/pictures/chains/3/18989823/c85e28c34f1fc350bcc343ef60302648.jpg?impolicy=newcropandfit&cropw=640&croph=640&cropoffsetx=0&cropoffsety=0&cropgravity=NorthWest&fitw=200&fith=200&fittype=ignore">
                </div>
                <div class="col-lg-6 col-md-12">
                    <h4>${itemname} - ${itemprice}</h4>
                    <p style="color:black !important; font-style: italic;">${itemdesc}</p>
                </div>
            </div>
        </div>
    `;
};
