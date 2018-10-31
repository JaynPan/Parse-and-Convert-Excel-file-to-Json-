$("document").ready(function() {
    $("#products h2.product-name[data-type='vitamin']").css("background-color", "blue");
    $("#products h2.product-name[data-type='mineralwater']").css("background-color", "purple");
    $("#products h2.product-name[data-type='proteinbar']").css("background-color", "red");



    $("input[type=checkbox][value=vitamin]").click(function(evt){
        
      if($(this).prop("checked")== true){
        $(".product-item[data-prod_id*=V-]").css("display", "block");
      }else{
        $(".product-item[data-prod_id*=V-]").css("display", "none");
      }
    });
    $("input[type=checkbox][value=mineralwater]").click(function(evt){
        
        if($(this).prop("checked")== true){
          $(".product-item[data-prod_id*=MW-]").css("display", "block");
        }else{
          $(".product-item[data-prod_id*=MW-]").css("display", "none");
        }
    });
    $("input[type=checkbox][value=proteinbar]").click(function(evt){
      
      if($(this).prop("checked")== true){
        $(".product-item[data-prod_id*=PB-]").css("display", "block");
      }else{
        $(".product-item[data-prod_id*=PB-]").css("display", "none");
      }
  });

  $(".product-item").each(function(){
    var prodName = encodeURIComponent($(this).children("h2").text());
    var prodID   = encodeURIComponent($(this).data("prod_id"));

    console.log(prodName);
    console.log(prodID);

    var link = $("<a href='product.html?prodName=" + prodName + "&prodID="+ prodID +"'/>");

    $(this).children("img").wrap(link);
  });

});