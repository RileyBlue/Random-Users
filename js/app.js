let userList = $('#userList');
let modalUser = $('#modalUser')
let userInfo;

$.ajax({
  url: 'https://randomuser.me/api/?results=20',
  dataType: 'json',
  success: function(data) {
    //console.log(data.results);
    let counter = 0;
    $.each(data.results, function( index, value ) {
      let firstName = data.results[index].name.first;
      let lastName = data.results[index].name.last;
      let profilePicture = data.results[index].picture.large;
      userList.append(
        "<li class='user in'>"
        +
          "<img class='user__picture' src='" + profilePicture + "'/>"
        +
          "<figcaption class='user__name'><span>" + firstName + " " + lastName + "</span><button class='button button--user' onClick='showUserInfo(this)' data-toggle='modal' data-target='#myModal' data-id='" + counter++ + "'>Visit Profile</button></figcaption>"
        +
        "</li>"); 
    });
    userInfo = data.results;
  }
});

// Get the modal
let modal = $('#myModal');
var counter = 0;
function showUserInfo(elem){
  let dataId = $(elem).data("id");
  let user = userInfo[dataId];
  let name = user.name.first + " " + user.name.last;
  modalUser.css({
    'display': 'flex'
  });
  if(counter <= 0){
    modalUser.html(
    "<figure class='profile'>"
    +
      "<img class='profile__picture' src='" +  user.picture.large + "'/>"
    +
      "<figcaption class='profile__info'>"
    +
      "<h2 class='profile__info--name'>Name: " + name + "</h2>"
    +
      "<h3 class='profile__info--age'>Age: " + user.dob.age + "</h3>"
    +
      "<p class='profile__info--gender'>Gender:" + user.gender + "</p>"
    +
      "<p class='profile__info--email'>Email: <a href='mailto:" + user.email + "'>" + user.email + "</a></p>"
    +
      "<p class='profile__info--location'>City: " + user.location.city + "</p>"
    +
      "</figcaption>" 
      +
      "<span class='close' onClick='closeModal()'>Close</span>"
      + 
    "</figure>"); 
  }
}

function closeModal(){
  modalUser.css({
    'display': 'none'
  })
}

$("#search-text").keyup(function () {
  //$(this).addClass('hidden');
  var searchTerm = $("#search-text").val();
  var searchSplit = searchTerm.replace(/ /g, "'):containsi('");
  
  //extends :contains to be case insensitive
  $.extend($.expr[':'], {
    'containsi': function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || '').toLowerCase()
      .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });
  
  $("#userList li").not(":containsi('" + searchSplit + "')").each(function(e) {
    $(this).addClass('hiding out').removeClass('in');
    setTimeout(function() {
      $('.out').addClass('hidden');
    }, 300);
  });
  
  $("#userList li:containsi('" + searchSplit + "')").each(function(e) {
    $(this).removeClass('hidden out').addClass('in');
    setTimeout(function() {
        $('.in').removeClass('hiding');
      }, 1);
  });
    
  var userCount = $('#userList .in').length;
  $('.user-count').text(userCount + ' usuarios encontrados');
  
  //shows empty state text when no jobs found
  if(userCount == '0') {
    $('#userList').addClass('empty');
  }
  else {
    $('#userList').removeClass('empty');
  }
});

function searchList() {                
  //array of list items
  var listArray = [];
  
  $("#userList li").each(function() {
    var listText = $(this).text().trim();
    listArray.push(listText);
  });
}       
searchList();    