let rowCount = 0;
let htmlContent = "";
let categoryName = "";
let prevCategoryName = "";
let subCategoryName = "";
let prevSubCategoryName = "";
let rowContent = "";

for (let i = 0; i < config.content.length; i++) {
    let content = config.content[i];

    if (i === 0) {
        categoryName = content.Category;
        subCategoryName = content.SubCategory;
        htmlContent += getCategorySubCategory(
            categoryName,
            subCategoryName,
            true,
            true
        );
    } else {
        if (
            prevCategoryName === content.Category &&
            prevSubCategoryName === content.SubCategory
        ) {
            categoryName = content.Category;
            subCategoryName = content.SubCategory;
            htmlContent += getCategorySubCategory(
                categoryName,
                subCategoryName,
                false,
                false
            );
        } else if (prevCategoryName === content.Category) {
            categoryName = content.Category;
            subCategoryName = content.SubCategory;
            htmlContent += getCategorySubCategory(
                categoryName,
                subCategoryName,
                false,
                true
            );
        } else {
            categoryName = content.Category;
            subCategoryName = content.SubCategory;
            htmlContent += getCategorySubCategory(
                categoryName,
                subCategoryName,
                true,
                true
            );
        }
    }
    prevCategoryName = content.Category;
    prevSubCategoryName = content.SubCategory;

    let columnFlag = true;
    if (content.DishName === "") {
        columnFlag = false;
    }

    if (rowCount === 0) {
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
    } else if (rowCount === 1) {
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

    if (i === config.content.length - 1) {
        let contentContainer = document.getElementById("content-container");
        contentContainer.innerHTML += sectionContent(htmlContent);
    }
}

function sectionContent(htmlContent) {
    let template = `
        <div class="container">
            <div class="divider"></div>
            ${htmlContent}
        </div>
    `;
    return template;
}

function getCategorySubCategory(category, subCategory, flag, subFlag) {
    let template = `
        <div class="row text-center filter ${category}">
            <div class="col-md-12 filter ${category}">
                ${flag ? '<h1 class="display-4" style="letter-spacing: 20px;">' + category + '</h1>' : ''}
                ${subFlag ? '<h3 style="letter-spacing: 15px;">' + subCategory + '</h3>' : ''}
            </div>
        </div>
        <div class="divider"></div>
        <div class="mt-5"></div>
    `;
    return template;
}

function rowTemplate(rowContents, category) {
    let template = `
        <div class="row mb-3 filter ${category}">
            ${rowContents}
        </div>
    `;
    return template;
}

function columnTemplate(itemName, itemDesc, itemPrice, url, flag, isVeg, spiceLevel) {
    let vegNonVeg = "";
    let spicyLevel = "";

    if (flag && isVeg) {
        vegNonVeg = '<i class="bi bi-circle-fill" style="font-size: 14px; color: #237f01;"></i> ';
    } else if (flag) {
        vegNonVeg = '<i class="bi bi-circle-fill" style="font-size: 14px; color: #a92319;"></i> ';
    }

    if (flag && spiceLevel === 1) {
        spicyLevel = '<i class="fas fa-pepper-hot" style="font-size: 14px; color: red;"></i> ';
    } else if (flag && spiceLevel === 2) {
        spicyLevel = '<i class="fas fa-pepper-hot" style="font-size: 14px; color: red;"></i> ';
        spicyLevel += '<i class="fas fa-pepper-hot" style="font-size: 14px; color: red;"></i> ';
    } else if (flag && spiceLevel === 3) {
        spicyLevel = '<i class="fas fa-pepper-hot" style="font-size: 14px; color: red;"></i> ';
        spicyLevel += '<i class="fas fa-pepper-hot" style="font-size: 14px; color: red;"></i> ';
        spicyLevel += '<i class="fas fa-pepper-hot" style="font-size: 14px; color: red;"></i> ';
    }

    let template = `
        <div class="col-md-6 menu-row">
            <div class="row menu-list">
                <div class="col-lg-6 col-md-12">
                    <img class="img-responsive" src="${url}">
                </div>
                <div class="col-lg-6 col-md-12 menu-detail">
                    <h4>${itemName}${flag ? ' -' : ''} ${itemPrice}</h4>
                    <p style="color: black !important; font-style: italic;">
                        ${vegNonVeg}&nbsp;${spicyLevel}&nbsp;${itemDesc}
                    </p>
                </div>
            </div>
        </div>
    `;
    return template;
}
