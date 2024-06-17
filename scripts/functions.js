let rowCount = 0;
var htmlContent = "";
let categoryName = "";
let prevCategoryName = "";
let SubCategoryName = "";
let prevSubCategoryName = "";
let rowContent = "";

for (let i = 0; i < config.content.length; i++) {
  //console.log(i);
  var content = config.content[i];
  //console.log("i: " + i + " " +content.Category +" " +content.SubCategory+" " +content.DishName +" " +content.DishDescrip  +" " +content.DishCost);
  //console.log("i: " + i + " " +content.Category +" " +content.SubCategory+" i === 0 " + (i === 0 )
  //+ " categoryName: " + categoryName
  //+ " content.Category: " + content.Category
  //+ " SubCategoryName: " + SubCategoryName
  //+ " content.SubCategory: " + content.SubCategory
  //+ " prevCategoryName: " + prevCategoryName
  //+ " prevSubCategoryName: " + prevSubCategoryName
  //+" (prevCategoryName === content.categoryName && prevSubCategoryName===content.SubCategory) "
  //+ (prevCategoryName === content.categoryName && prevSubCategoryName===content.SubCategory)
  //+" (prevCategoryName === content.categoryName) " +(prevCategoryName === content.categoryName));

  if (i === 0) {
    categoryName = content.Category;
    SubCategoryName = content.SubCategory;
    htmlContent += getCategorySubCategory(
      categoryName,
      SubCategoryName,
      true,
      true
    );
  } else {
    if (
      prevCategoryName === content.Category &&
      prevSubCategoryName === content.SubCategory
    ) {
      categoryName = content.Category;
      SubCategoryName = content.SubCategory;
      htmlContent += getCategorySubCategory(
        categoryName,
        SubCategoryName,
        false,
        false
      );
    } else if (prevCategoryName === content.Category) {
      categoryName = content.Category;
      SubCategoryName = content.SubCategory;
      htmlContent += getCategorySubCategory(
        categoryName,
        SubCategoryName,
        false,
        true
      );
    } else {
      categoryName = content.Category;
      SubCategoryName = content.SubCategory;
      htmlContent += getCategorySubCategory(
        categoryName,
        SubCategoryName,
        true,
        true
      );
    }
  }
  prevCategoryName = content.Category;
  prevSubCategoryName = content.SubCategory;

  var columnFlag = true;
  if (content.DishName == "") {
    columnFlag = false;
  }

  if (rowCount == 0) {
    rowContent = columnTemplate(
      content.DishName,
      content.DishDescrip,
      content.DishCost,
      content.URL,
      columnFlag,
      content.isVeg,
      content.spicelevel
    );
    rowCount++;
  } else if (rowCount == 1) {
    rowContent += columnTemplate(
      content.DishName,
      content.DishDescrip,
      content.DishCost,
      content.URL,
      columnFlag,
      content.isVeg,
      content.spicelevel
    );
    htmlContent += rowTemplate(rowContent, content.Category);
    rowCount = 0;
  }

  if (i == config.content.length - 1) {
    //console.log("Last Item");

    var content_container = document.getElementById("content-container");
    content_container.innerHTML += sectionContent(htmlContent);
  }
}

function sectionContent(htmlContent) {
  var template = `
       <div class="container">  <!--Div container Start --> 

        <div class="divider"></div>
        <!--Div Divider Start End --> 
        ${htmlContent}
      </div> <!--Div container End --> 
    `;

  return template;
}

function getCategorySubCategory(Category, SubCategory, flag, subflag) {
  var template = `
    <div class="row  text-center filter ${Category}">
     <!--Div row text-center Start --> 
      <div class="col-md-12 filter ${Category}">
        <!--Div col-md-12 Start --> 
        ${
          flag
            ? '<h1 class="display-4" style="letter-spacing: 20px; ">' +
              Category +
              "</h1>"
            : ""
        }
        
        ${
          subflag
            ? '<h3 style="letter-spacing: 15px; ">' + SubCategory + "</h3>"
            : ""
        }


      </div>
      <!--Div col-md-12 End --> 
    </div>
    <!--Div row text-center End --> 
    <div class="divider"></div>
    <!--Div Divider Start End --> 
    <div class="mt-5"></div>
    <!--Div mt-5 Start End --> 
  `;
  return template;
}

function rowTemplate(rowContents, Category) {
  var template = `
    <div class="row mb-3 filter ${Category}">
      <!--Div row mb-3 Start --> 
      ${rowContents}
    </div>
    <!--Div row mb-3 End --> 
    `;
  return template;
}

function columnTemplate(itemname, itemdesc, itemprice, url, flag, isVeg, spicelevel) {

  var vegNonVeg = "";
  var spicyLevel = "";
  //console.log("isVeg: " + isVeg + " flag: " + flag +"(flag & isVeg)" + (flag && isVeg));
  if(flag && isVeg){
    vegNonVeg = "<i class=\"bi bi-circle-fill\"  style=\"font-size: 14px; color: #237f01;\"></i> ";
    //console.log(itemname + " " + itemprice + " " + itemdesc + " " + url + " " + flag + " " + isVeg );  

  }else if(flag){
    vegNonVeg = "<i class=\"bi bi-circle-fill\"  style=\"font-size: 14px; color: #a92319;\"></i> ";
    //console.log(itemname + " " + itemprice + " " + itemdesc + " " + url + " " + flag + " " + isVeg );  

  }

  if(flag && spicelevel == 1){
    spiceLevel = "  <i class=\"fas fa-pepper-hot\" style=\"font-size: 14px; color: red\"></i> ";
  }else if(flag && spicelevel == 2){
    spiceLevel = "  <i class=\"fas fa-pepper-hot\" style=\"font-size: 14px; color: red\"></i> ";
    spiceLevel += "  <i class=\"fas fa-pepper-hot\" style=\"font-size: 14px; color: red\"></i> ";

  }else if(flag && spicelevel == 3){
    spiceLevel = "  <i class=\"fas fa-pepper-hot\" style=\"font-size: 14px; color: red\"></i> ";
    spiceLevel += "  <i class=\"fas fa-pepper-hot\" style=\"font-size: 14px; color: red\"></i> ";
    spiceLevel += "  <i class=\"fas fa-pepper-hot\" style=\"font-size: 14px; color: red\"></i> ";
  }else{
    spiceLevel = "";
  }

  var template = `
    <div class="col-md-6 menu-row">
        <div class="row menu-list">
            <div class="col-lg-6 col-md-12">
                <img class="img-responsive" src="${url}">
            </div>
            <div class="col-lg-6 col-md-12 menu-detail">
                <h4>${itemname}  ${flag ? "-" : ""} ${itemprice}</h4>

                <p style="color:black !important; font-style: italic;">
                ${vegNonVeg} &nbsp; ${spiceLevel} &nbsp;
                ${itemdesc}
                </p>
            </div>
        </div>
    </div>
`;
  return template;
}
