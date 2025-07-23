$(document).ready(function() {

    $("#dialog").dialog({
        autoOpen: false,
    });

    getData();

});

function getData() {

    $.get("http://localhost:5000/api/customers", function(data)  {

        var html_string = "";
            
        $(data).each(function(key, object) {
     
            html_string += "<tr><td>" + object['first_name'] + "</td><td>" + object['last_name'] + "</td><td>" + object['mobile'] + "</td><td>" + object['birthdate'] + "</td><td>"+ object['added'] + "</td><td>"
            html_string += "<a href=\"#\" onclick=\"getCustomerHistory(" + object['customer_id'] + "); return false;\">view detail</a>";
            html_string += "</td></tr>";
            
    
        });
    
        $("#table_body").html(html_string);
        
    });

}


function getCustomerHistory(id) {

    $.get("http://localhost:5000/api/orders/customer/"+id, function(data)  {

        var html_string = "";

        $(data).each(function(key, object) {
            
            html_string += "<tr><td>" + object['order_id'] + "</td><td>" + object['total'] + "</td><td>" + object['description'] + "<td>" + object['date'] + "</td>"
            html_string += "</td></tr>";
        });


       $("#dialog_content").html(html_string);

   
       $("#dialog").dialog("open");

    });
}