// toggle vertical nav
$("#vertical-toggle").click(function () {
   $(this).toggleClass("active");
   $("#vertical-nav").toggleClass("active");
})

// active link
var loc = window.location.pathname;
$('#vertical-nav').find('a').each(function () {
   $(this).toggleClass('active', $(this).attr('href') == loc);
});

// enable tooltip everywhere
var tooltipTriggerList = [{ trigger: 'hover' }].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   return new bootstrap.Tooltip(tooltipTriggerEl)
})


function previewFullScreen(e) {
   $(e).parents(".card").toggleClass("active");
}

function generateToast(heading, message) {
   var toast = `
      <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
         <div class="toast-header">
            <i class='fas fa-shield-check me-2 text-primary'></i>
            <strong class="me-auto text-primary">`+ heading + `</strong>
            <small class="text-muted">just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
         </div>
         <div class="toast-body">
            `+ message + `
         </div>
      </div>
   `;
   return toast;
}