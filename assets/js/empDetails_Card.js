function openModal(id) {

  $.ajax({
    type: "get",
    url: `/users/getUsersDetails/${$(id).attr("id")}`, 
    success: function (data) {
      var modal = document.getElementById("modal");
      modal.style.display = "block";
      $("#empDetails").html(`<p>Name: ${data.data.userData.name}</p>
            <p>Email: ${data.data.userData.email}</p>`);

      $("#employees-reviews-list").empty();

      data.data.userData.reviews.forEach(row => {
        var rowHtml = `<tr id="${row.id}">` +
        `<td><input type="text" name="review" id="${row.id}" value="${row.review}"></td>` +
          '<td style="text-align: center;">' + row.reviewedBy + '</td>' +          
          `<td id="update-review"> <button onclick="onUpdateClickListner(this)" id="${row.id}" class="toggle-btn">Update</button> </td>` +
          `<td id="delete-review"> <button onclick="onDeleteClickListner(this)" id="${row.id}" class="toggle-btn">Delete</button> </td>`
        '</tr>';

        // Append the row to the table body
        $('#employees-reviews-list').append(rowHtml);
      });

    }
  });
 
}

function onUpdateClickListner(id) {  }

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}
