var select1 = $('#select1');
var button = $('button');

select1.click(function(e) {
    let url = 'https://dog.ceo/api/breeds/list/all';
    $.get(url, function(data) {
        console.log(data);
        let dogBreed = data.message;
        for (let breed in dogBreed) {
            select1.append(`<option value = "${breed}">${breed}</option>`);
        }
    })
    select1.change(function () {

        let breed = select1.val();
        let url = "https://dog.ceo/api/breed/" + breed + "/list";
    
        $("#dog-sub-breeds").remove();
    
        $.get(url, function (data) {
    
            if (data.message.length !== 0) {
                let subBreeds = data.message;
    
                select1.after('<select id="dog-sub-breeds"></select>');
    
                var subDropdown = $("#dog-sub-breeds");
    
                for (let subBreed of subBreeds) {
                    subDropdown.append('<option value="' + subBreed + '">' + subBreed + '</option>');
                    console.log(subBreed);
                }
            }
    
        });
        console.log(url);
    });
});

button.click(function(e) {
    e.preventDefault();

    let breed = select1.val();
    let subBreed = $('#dog-sub-breeds').val();
    let url = "https://dog.ceo/api/breed/" + breed;
    if (subBreed !== undefined) {
        url += "/" + subBreed
    }
    url += "/images";

    $('.container-2 img').remove();

    $.get(url, function (data) {
        let imagesUrl = data.message;

        for (let imageUrl of imagesUrl) {
            $('.container-2').append('<img src="' + imageUrl + '" alt="' + breed + '">');
        }
    });
})

//Promise Function

// var userLoggedIn = true;
// var promise = New Promise((resolve, reject) => {
//     setTimeout(() => {
//         if (userLoggedIn) {
//             resolve();
//         } else {
//             reject();
//         }
//     }, 1000);
// });

// setTimeout(() => {
//     userLoggedIn = false;
// }, 500);

// promise.then(() => {
//     console.log("User Loged In");
// }).catch(() => {
//    console.log()
// })