//business logic
function Contact(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = [];
};

function Address(street, city, state, zip) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
};

Contact.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

Address.prototype.fullAddress = function() {
  return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
};
var addressFields = function(){
  $("#address-group").append(`<div class="new-address">
                                <div class="form-group">
                                  <label for="street">Street</label>
                                  <input class="form-control street-input" type="text">
                                </div>
                                <div class="form-group">
                                  <label for="city">City</label>
                                  <input class="form-control city-input" type="text">
                                </div>
                                <div class="form-group">
                                  <label for="state">State</label>
                                  <input class="form-control state-input" type="text">
                                </div>
                                <div class="form-group">
                                  <label for="zipCode">Zip Code</label>
                                  <input class="form-control zipCode-input" type="text">
                                </div>
                              </div>`);
};

var resetForm = function(){
  $("#first-name-input").val("");
  $("#last-name-input").val("");
  $("input.street-input").val("");
  $("input.city-input").val("");
  $("input.state-input").val("");
  $("input.zipCode-input").val("");
  $("#address-group").empty();
  addressFields();
};
//user interface logic
$(document).ready(function(){

  $("#new-address-button").click(function(){
    addressFields();
    });
  $("form#contact-input").submit(function(event){
    event.preventDefault();
    let firstName = $("#first-name-input").val();
    let lastName = $("#last-name-input").val();

    let newContact = new Contact(firstName, lastName);

    $(".new-address").each(function(){
      let street = $(this).find("input.street-input").val();
      let city = $(this).find("input.city-input").val();
      let state = $(this).find("input.state-input").val();
      let zipCode = $(this).find("input.zipCode-input").val();

      let newAddress = new Address(street, city, state, zipCode);

      newContact.address.push(newAddress);
    });



    $("#contact-list").append(`<li><span class="contactList">${newContact.fullName()}</li>`)

    $(".contactList").last().click(function(){
      $(".contact-info").show();
      $("#fullNameDisplay").text(newContact.fullName());
      $("#addressDisplay").empty();
      newContact.address.forEach(function(address){
        $("#addressDisplay").append(`<li>${address.fullAddress()}</li>`);
      });
    });
    resetForm();
  });



});
