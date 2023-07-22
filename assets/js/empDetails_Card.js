function openModal(id) {

  let reviewID
    
  if (typeof(id) == "object") {
    reviewID = $(id).attr("id")
  } else {
    reviewID = id
  }
  // console.log(reviewID);

  $.ajax({
    type: "get",
    url: `/users/getUsersDetails/${reviewID}`,    
    success: function (data) {
      // console.log(data);
      var modal = document.getElementById("modal");
      modal.style.display = "block";
      $("#empDetails").html(`<p>Name: ${data.data.userData.name}</p>
            <p>Email: ${data.data.userData.email}</p>`);

      $("#employees-reviews-list").empty();

      data.data.userData.reviews.forEach((row, index) => {
        var rowHtml = `<tr>` +
        `<td><input type="text" name="review" id="${row._id}" value="${row.review}"></td>` +
          '<td style="text-align: center;">' + row.reviewedBy + '</td>' +          
          `<td id="update-review"> <button onclick="onUpdateClickListner(this)" id="${row._id}" class="toggle-btn">Update</button> </td>` +
          `<td id="delete-review"> <button onclick="onDeleteClickListner(this)" data-reviewedFor="${row.reviewedForEmail}" data-rowID="${index + 1}" id="${row._id}" class="toggle-btn">Delete</button> </td>`
        '</tr>';

        // Append the row to the table body
        $('#employees-reviews-list').append(rowHtml);
      });

    }
  });
 
}

function onUpdateClickListner(id) {
  const reviewID = $(id).attr("id");
  const reviewVal = $(`#${reviewID}`).val();

  $.ajax({
  url: `/employee/update-user-review/${reviewID}/${reviewVal}`,  // URL to send the request
  method: 'POST',                       // HTTP method (GET, POST, PUT, DELETE, etc.)
  dataType: 'json',                    // The expected data type of the response
  success: function(data) {            // Callback function for successful response
    createToast("success", data.message)
  },
  error: function(xhr, status, error) { // Callback function for error response
    console.error('AJAX request failed:', status, error);
  }
  });

}

function onDeleteClickListner(id) {
  const reviewID = $(id).attr("id");
  const rowIndex = $(id).attr("data-rowID")
  const reviewedFor = $(id).attr("data-reviewedFor")
  console.log(rowIndex, reviewedFor);
  debugger

  $.ajax({
  url: `/employee/delete-user-review/${reviewID}/${reviewedFor}`,  // URL to send the request
  method: 'DELETE',                       // HTTP method (GET, POST, PUT, DELETE, etc.)
  dataType: 'json',                    // The expected data type of the response
  success: function(data) {            // Callback function for successful response    
    $('#review_table tr').eq(rowIndex).remove();
    createToast("success", data.message)
  },
  error: function(xhr, status, error) { // Callback function for error response
    console.error('AJAX request failed:', status, error);
  }
  });
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}
