// review id
let reviewID;

// email of the employee to reviewed for
let reviewedFor;

//open review model to review co-employees
function openModal(id) {
  var modal = document.getElementById("reviewModal");
  reviewID = $(id).attr("id");
  reviewedFor = $(id).attr("data-assignedfor");
  console.log(reviewID, reviewedFor);
  modal.style.display = "block";
}

//close review model
function closeModal() {
  var modal = document.getElementById("reviewModal");
  modal.style.display = "none";
}

//Ajax call to save the review of the employee when the user submit
function submitReview(event) {
  event.preventDefault();

  //form data to send as body as req.body
  const formData = {
    reviewText: $("#review_field").val(),
  };

  $.ajax({
    type: "POST",
    url: `/employee/save-user-review/${reviewID}/${reviewedFor}`, // Replace with your actual server endpoint
    data: JSON.stringify(formData), // Send the data as JSON
    contentType: "application/json", // Set the content type to JSON
    success: function (data) {
      if (data.data.isreviewed == true) {
        closeModal();
        location.reload();
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}
