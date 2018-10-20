$(document).ready(function () {

  var AirportsDepart = [], AirportsArrival = [];

  window.onload = function () {
    openModal();
    $("#fechasalida").datepicker({ minDate: 0, maxDate: "+12M +10D" });
    $('input[name="tipo"]').on('change', idayVuelta);

    $('#showFlightDate').on('click', function(event) {
      console.log($('#inpt_combobox_origen').val());
      event.preventDefault();
      if($('#inpt_combobox_origen').val() !=='' && $($('#inpt_combobox_destino')).val() !=='') {
        $('.hidden-flight-wrapper').removeClass('d-none');
      } else {
        console.log('Empty!');
      }
    });

    
  };

  function openModal(modal) {
    let html = '';
    $('.container').append(html);
  }

  function idayVuelta() {
    if (this.checked && this.value == 'idavuelta') {
      $('#fechaderegreso').removeClass('d-none');
      $("#fecharegreso").datepicker({ minDate: 0, maxDate: "+12M +10D" });
    } else if (this.value == 'ida') {
      $('#fechaderegreso').addClass('d-none');
    }
  }


  $('#login').on('click', function (e) {

    let errorEmail = false;
    let errorPassword = false;
    e.preventDefault();
    $.ajax({
      url: 'ajax/login.php',
      type: 'post',
      dataType: 'json',
      data: $('#loginform').serialize()
    })

      .done(function (data) {
        console.log(data);

        $('.errors').empty("");

        if(!errorEmail) {
          $('#loginEmail').removeClass('is-invalid');
        }
        if(!errorPassword) {
          $('#loginPassword').removeClass('is-invalid');
        }

        if ($('#loginEmail').val() == '') {
          errorEmail = true;
          console.log(data.message['email']);
          $('#loginEmail').addClass('is-invalid');
          $('#loginEmail').after('<div class="errors"><span class="error">'+data.message['email']+'</span></div>');
        }
        if($('#loginPassword').val() == '') {
          errorPassword = true;
          $('#loginPassword').addClass('is-invalid');
          $('#loginPassword').after('<div class="errors"><span class="error">'+data.message['pass']+'</span></div>');
        }
        if(data.status=='no_account') {
          console.log(data.message['no_account']);
          $('#error-no-account').remove();
          $('.modal-body').append('<div id="error-no-account" class="alert alert-warning">'+data.message['no_account']+'');
        }
        if(data.status == 'success') {
          $('#loginModal').slideUp();
          window.location.href = 'frontpage';
        }
      })

      .fail(function (x, status, msg) {
        console.log(msg);
      })

  });
});


