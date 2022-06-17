function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
 }
 const csrftoken = getCookie('csrftoken');
 
$(document).ready(function () {
    $(".toast").show();
    
    // add book
    $("#add-book-form #add-book-btn").click(function (e) {
        e.preventDefault();
        var _temp = this;
        $(_temp).attr('disabled', true);
        $(_temp).html("Adding book <i class='far fa-circle-notch fa-spin ms-1'></i>");

        var formData = new FormData();
        formData.append('title', $("#add-book-form #title").val());
        formData.append('author', $("#add-book-form #author").val());
        formData.append('price', $("#add-book-form #price").val());
        formData.append('publisher', $("#add-book-form #publisher").val());
        

       
        $.ajax({
            enctype: 'multipart/form-data',
            url: '/api/book/',
            type: 'POST',
            data: formData,
            headers: {'X-CSRFToken': csrftoken},
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false,
            success: function (data,textStatus,xhr) {
                 
                console.log(data);
                console.log(textStatus);
                console.log(xhr.status);
                response = data;
                console.log("some text");
 

                // if success redirect
                if ( xhr.status == 201) {
                    updatefun();
                    $("#addbookModal").modal('hide');
                    $("#add-book-form").trigger('reset');
                    $(".toast-container").append(generateToast("book", "book added successfully!"));
                    $(".toast-container .toast").toast();
                }

                $(_temp).attr("disabled", false);
                //$(_temp).html('Add book');
            
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var message = errorThrown;
                if (jqXHR.responseText !== null && jqXHR.responseText !== 'undefined' && jqXHR.responseText !== '') {
                    message = jqXHR.responseText;
                
                }
              
                response = JSON.parse(message);
                console.log(typeof(response));
                console.log(response);
                console.log(response['message']);
                

                if (response.title) {
                    $("#add-book-form #titleErr").html(response.title);
                } else {
                    $("#add-book-form #titleErr").html("");
                }
                if (response.author) {
                    $("#add-book-form #authorErr").html(response.author);
                } else {
                    $("#add-book-form #authorErr").html("");
                }
                if (response.publisher) {
                    $("#add-book-form #publisherErr").html(response.publisher);
                } else {
                    $("#add-book-form #publisherErr").html("");
                }
                if (response.price) {
                    $("#add-book-form #priceErr").html(response.price);
                } else {
                    $("#add-book-form #priceErr").html("");
                }
              


                if(response['message']){
                    $("#add-book-form #messageErr").html(response['message']);
                } else {
                    $("#add-book-form #messageErr").html("");
                }
               
               
                $(_temp).attr("disabled", false);
                $(_temp).html('Add book');
            }
        });
    })

    // edit book
    $("#edit-book-form #edit-book-btn").click(function (e) {
        e.preventDefault();
        var _temp = this;
        $(_temp).attr('disabled', true);
        $(_temp).html("Editing book <i class='far fa-circle-notch fa-spin ms-1'></i>");

        var formData = new FormData();
      
        let bookid = $("#edit-book-form #hiddenid").val();
       

        formData.append('title', $("#edit-book-form #e-title").val());
        formData.append('author', $("#edit-book-form #e-author").val());
        formData.append('price', $("#edit-book-form #e-price").val());
        formData.append('publisher', $("#edit-book-form #e-publisher").val());
        formData.append('id', bookid);
        
        
      
        
        path = '/api/book/'+bookid+'/update/';

        $.ajax({
            enctype: 'multipart/form-data',
            url: path,
            type: 'POST',
            data: formData,
            headers: {'X-CSRFToken': csrftoken},
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false,
            success: function (response,textStatus,xhr) {
                console.log(response);
                console.log(textStatus);
                console.log(xhr.status);




                if (response.titleErr) {
                    $("#edit-book-form #e-titleErr").html(response.titleErr);
                } else {
                    $("#edit-book-form #e-titleErr").html("");
                }
                if (response.authorErr) {
                    $("#edit-book-form #e-authorErr").html(response.authorErr);
                } else {
                    $("#edit-book-form #e-authorErr").html("");
                }
                if (response.publisherErr) {
                    $("#edit-book-form #e-publisherErr").html(response.publisherErr);
                } else {
                    $("#edit-book-form #e-publisherErr").html("");
                }
                if (response.priceErr) {
                    $("#edit-book-form #e-priceErr").html(response.priceErr);
                } else {
                    $("#edit-book-form #e-priceErr").html("");
                }




                console.log(response['message']);
                if(response['message']){
                    $("#edit-book-form #e-messageErr").html(response['messageErr']);
                } else {
                    $("#edit-book-form #e-messageErr").html("");
                }
               

                
                // if success redirect
                if (xhr.status == 200) {

                    updatefun();
                    
                    $("#editbookModal").modal('hide');
                    $("#edit-book-form").trigger('reset');
                    $("#cam" + bookid).prop("title", title);
                    $(".toast-container").append(generateToast("book", "book edited successfully!"));
                    $(".toast-container .toast").toast();

                }

                $(_temp).attr("disabled", false);
                $(_temp).html('Update Changes');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var message = errorThrown;
                if (jqXHR.responseText !== null && jqXHR.responseText !== 'undefined' && jqXHR.responseText !== '') {
                    message = jqXHR.responseText;
                }
                console.log(message);
                response = JSON.parse(message);
                console.log(typeof(response));
                console.log(response.title);
                console.log(response['message']);
                

                if (response.title) {
                    $("#edit-book-form #e-titleErr").html(response.title);
                } else {
                    $("#edit-book-form #e-titleErr").html("");
                }
                if (response.author) {
                    $("#edit-book-form #e-authorErr").html(response.author);
                } else {
                    $("#add-book-form #e-authorErr").html("");
                }
                if (response.publisher) {
                    $("#edit-book-form #e-publisherErr").html(response.publisher);
                } else {
                    $("#edit-book-form #e-publisherErr").html("");
                }
                if (response.price) {
                    $("#edit-book-form #e-priceErr").html(response.price);
                } else {
                    $("#edit-book-form #e-priceErr").html("");
                }


                if(response['message']){
                    $("#edit-book-form #e-messageErr").html(response['message']);
                } else {
                    $("#edit-book-form #e-messageErr").html("");
                }
             
              










                $(_temp).attr("disabled", false);
                $(_temp).html('Update Changes');
            }
        });
    })
})



// delete book
deletefun = function deletebook(id) {

    console.log('inside delete');
    if (confirm("Do you want to delete this book?")) {

        var _temp = this;
        $(_temp).attr('disabled', true);
        $(_temp).html("<i class='far fa-circle-notch fa-spin'></i>");

        var formData = new FormData();
        formData.append('deleteid', id);

        path = '/api/book/'+id+'/delete/';

        $.ajax({
            enctype: 'multipart/form-data',
            url: path,
            type: 'DELETE',
            data: formData,
            headers: {'X-CSRFToken': csrftoken},
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false,
            success: function (response,textStatus,xhr) {
                console.log(response);
                console.log(textStatus)
                console.log(xhr.status)

                // if success redirect
                if (xhr.status == 204) {
                    
                    updatefun();
                    $("#editbookModal").modal('hide');
                    $("#edit-book-form").trigger('reset');
                    
                    $(".toast-container").append(generateToast("book", "book deleted successfully!"));
                    $(".toast-container .toast").toast();

                } else {
                    $(".toast-container").append(generateToast("book", "Oops something went wrong!"));
                    $(".toast-container .toast").toast();
                }
                $(_temp).attr("disabled", false);
                $(_temp).html('<i class="far fa-trash"></i>');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var message = errorThrown;
                if (jqXHR.responseText !== null && jqXHR.responseText !== 'undefined' && jqXHR.responseText !== '') {
                    message = jqXHR.responseText;
                }
                console.log(message);
                $(_temp).attr("disabled", false);
                $(_temp).html('<i class="far fa-trash"></i>');
            }
        });

    }
}

 
updatefun = function update(){
    console.log('update called');
    $.ajax({
        url: '/tableview/',
        success: function(data) {
        $('#bookdata').html(data);
        }
      });
}



function fetchbookDetails(id) {

    
    let path = '/api/book/'+id+'/';
    console.log(path)
    $.ajax({
        url: path,
        type: 'GET',
        processData: false,
        contentType: false,
        dataType: 'json',
        cache: true,
        success: function (response) {
            console.log(response);
            
               book = response;
               console.log(book['title'])  

            $("#editbookModal #e-title").val(book['title']);
            $("#editbookModal #e-author").val(book['author']);
            $("#editbookModal #e-price").val(book['price']);
            $("#editbookModal #e-publisher").val(book['publisher']);
            $("#editbookModal #hiddenid").val(book['id']);

            
       
        //this way its not automatically called
        $("#edit-book-form #delete-book").click(function (e) {
            e.preventDefault();
            deletefun(book['id']);

        });
            
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var message = errorThrown;
            if (jqXHR.responseText !== null && jqXHR.responseText !== 'undefined' && jqXHR.responseText !== '') {
                message = jqXHR.responseText;
            }
            console.log(message);
        }
    });

}



