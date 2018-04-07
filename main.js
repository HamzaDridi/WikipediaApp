var searchkeyword = "";
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$(".label").hide();
$(".spinner").hide();
$("#searchform").submit(
    function cl(e) {
        if ($('#search').val().length > 0 && $('#search').val() !== searchkeyword) {
            $("#result").empty();
            searchkeyword = $('#search').val();
            $("#header").slideUp();
            $(".label").slideDown(200);
            searchwiki($('#search').val());
        }
        e.preventDefault();
    });
function showError(keyword) {
    $(".spinner").hide();
    info = "<div class=\"alert alert-info\">No matching article to your search </div>";
    $("#result").append(info);
}
function showResults(response) {
    $(".spinner").hide();
    $.each(response.query.search, function (index, item) {
        //show one element
        $("#result").append(" <div class=\"col-sm-6 col-md-4 col-lg-3 animated bounceIn h-100\"> <div class=\"card mb-4 box-shadow\"> <img class=\"card-img-top\"  src=\"img/images.jpg\" > <div class=\"card-body\" > <h5 class=\"card-title\">" + item.title + "</h5> <p class=\"card-text\">" + item.snippet + "</p> <a  role=\"button\" href=\"https://en.wikipedia.org/?curid=" + item.pageid + "\"   class=\"btn btn-sm btn-outline-secondary\">Read more</a> </div> </div> </div>");
    });
}
function showspinner() {
    $(".spinner").show();
}
function Fail() {
    $(".spinner").hide();
    info = "<div class=\"alert alert-danger\">Network Error ... </div>";
    $("#result").append(info);
}
function searchwiki(keyword) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&prop=url&utf8=&prop=images&format=json&prop=pageimages",
        dataType: "jsonp",
        beforeSend: function () {
            showspinner();
        },
        success: function (response) {
            if (response.query.searchinfo.totalhits === 0) {
                showError(keyword);
            } else {
                showResults(response);
            }
        },
        error: function () {
            Fail();
        },
    });
}