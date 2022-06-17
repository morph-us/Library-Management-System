
$(document).ready(function () {

   // ! user signup
   $("#signup-form #signup-btn").click(function (e) {
      e.preventDefault();

      console.log('inside signup function')
      $(this).attr('disabled', 1);
      var _temp = this;
      $(_temp).html('Signing up <i class="far fa-circle-notch fa-spin ms-1"></i>');

      var formData = new FormData();
      formData.append('name', $("#signup-form #name").val());
      formData.append('email', $("#signup-form #email").val());
      formData.append('password', $("#signup-form #password").val());

      $.ajax({
         enctype: 'multipart/form-data',
         url: '../signup/',
         type: 'POST',
         data: formData,
         headers: {'X-CSRFToken': csrftoken},
         processData: false,
         contentType: false,
         dataType: 'json',
         cache: false,
         success: function (response) {
            console.log(response);

            if (response.nameErr) {
               $("#signup-form #nameErr").html(response.nameErr);
            } else {
               $("#signup-form #nameErr").html("");
            }
            if (response.emailErr) {
               $("#signup-form #emailErr").html(response.emailErr);
            } else {
               $("#signup-form #emailErr").html("");
            }
            if (response.passwordErr) {
               $("#signup-form #passwordErr").html(response.passwordErr);
            } else {
               $("#signup-form #passwordErr").html("");
            }

            // if success redirect
            if (response.success == true) {
               window.location.href = "/login/";
            }

            $(_temp).attr("disabled", false);
            $(_temp).html('Signup');
         },
         error: function () {
            console.log("some error on server side");
            $(_temp).attr("disabled", false);
            $(_temp).html('Signup');
         }
      });
   })

   // ! user login
   $("#login-form #login-btn").click(function (e) {
      e.preventDefault();

      console.log('inside login function')

      $(this).attr('disabled', 1);
      var _temp = this;
      $(_temp).html('Signing in <i class="far fa-circle-notch fa-spin ms-1"></i>');

      var formData = new FormData();
      formData.append('name', $("#login-form #name").val());
      formData.append('email', $("#login-form #email").val());
      formData.append('password', $("#login-form #password").val());

   //    const request = new Request(
   //       '/login/',
   //       {
   //           method: 'POST',
   //           body: formData,
   //           headers: {'X-CSRFToken': csrftoken},
   //           mode: 'same-origin' // Do not send CSRF token to another domain.
   //       }
   //   );
   //   fetch(request).then(function(response) {
   //       // ...
   //       console.log(response);
   //   });



      $.ajax({
         enctype: 'multipart/form-data',
         url: '../login/',
         type: 'POST',
         // data: {
         // 'formData': formData,
         // csrfmiddlewaretoken: getCookie('csrftoken'),    
         // },
         data : formData,
         headers: {'X-CSRFToken': csrftoken},
         processData: false,
         contentType: false,
         dataType: 'json',
         cache: false,
      success: function (response) {
            console.log(response);

            if (response.emailErr) {
               $("#login-form #emailErr").html(response.emailErr);
            } else {
               $("#login-form #emailErr").html("");
            }
            if (response.passwordErr) {
               $("#login-form #passwordErr").html(response.passwordErr);
            } else {
               $("#login-form #passwordErr").html("");
            }
         

            // if success redirect
            if (response.success == true) {
               window.location.href = "/adminView/";
            }

            $(_temp).attr("disabled", false);
            $(_temp).html('Login');
         },
         error: function () {
            console.log("some error on server side");
            $(_temp).attr("disabled", false);
            $(_temp).html('Login');
         }
      });


   })

})