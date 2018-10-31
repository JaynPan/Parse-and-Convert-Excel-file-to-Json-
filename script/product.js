  $(function(){

        var paramLoc = window.location.href.indexOf("?");
        var prodStr    = window.location.href.slice(paramLoc + 1);
        console.log(paramLoc);
        console.log(prodStr);

        var i = prodStr.indexOf('prodName=') + 9;                                            
        var prodName = '';
        var prodID   = '';
        console.log(i);
        for( var j = i; j<prodStr.length; j++ ){
          if( prodStr.charAt(j) == "&" ){
            break;
          }
          prodName += prodStr.charAt(j);                  
        }
        var i = prodStr.indexOf('prodID=') + 7;  
        for( var j = i; j<prodStr.length; j++ ){
          if( prodStr.charAt(j) == '&' ){
            break;
          }
          prodID += prodStr.charAt(j);
        }
        var prodName = decodeURIComponent(prodName);
        var prodID   = decodeURIComponent(prodID);
        console.log(prodName);
        console.log(prodID);

        $("#productName").text(prodName);

        
        // $.getJSON("product-data.json", function(prodData){
          
        //   prodData.products.forEach(function(elem){
        //     if( prodID === elem.prod_id){
        //       $("#productStock").text(elem.in_stock);
        //       $("#productPrice").text(elem.retail_price);
        //       $("#productDesc").text(elem.description);
        //     }
            
        //   })

        // });
    // $.ajax({
    //   // the URL for the request
    //   url: "product-data.json",

    //   // whether this is a POST or GET request
    //   type: "GET",
     
    //   // the type of data we expect back
    //   dataType : "json",
      
    //   // function to call for success
    //   success: successFn,

    //   // function to call on an error
    //   error: errorFn,
                       
    //   // code to run regardless of success or failure
    //   complete: function( xhr, status ) {
    //     console.log("The request is complete!");
    //   }
      
    // });
    // function successFn(prodData) {
    //   console.log("Setting result");
    //   prodData.products.forEach(function(elem){
    //     if( prodID === elem.prod_id){
    //       $("#productStock").text(elem.in_stock);
    //       $("#productPrice").text(elem.retail_price);
    //       $("#productDesc").text(elem.description);
    //     }              
    //   })
      
    // }
    // function errorFn(xhr, status, strErr) {
    //   console.log("There was an error!");
    // }   
    
  /* set up XMLHttpRequest */
  var url = "test.xlsx";
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {type:"binary"});

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];

    /* Set the product array as a variable  */ 
    var ProdArray = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    
    /* Looping every single array, stop when finding the matching product id */
    for(let i=0; i < ProdArray.length; i++){
      if(prodID === ProdArray[i].prod_id){
        $("#productStock").text(ProdArray[i].in_stock);
        $("#productPrice").text(ProdArray[i].retail_price);
        $("#productDesc").text(ProdArray[i].description);
        $("#productImg").attr("src", ProdArray[i].photo_src);
      }
    }
  }

  oReq.send();

});