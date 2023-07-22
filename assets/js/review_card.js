let reviewID
let reviewedFor

function openModal(id) {
  var modal = document.getElementById("reviewModal");
  reviewID = $(id).attr("id")
  reviewedFor = $(id).attr("data-assignedfor")
  console.log(reviewID, reviewedFor);
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("reviewModal");
  modal.style.display = "none";
}

function submitReview(event) {
  event.preventDefault();

  const formData = {
    reviewText: $('#review_field').val(),
  };

  $.ajax({
    type: "POST",
    url: `/employee/save-user-review/${reviewID}/${reviewedFor}`, // Replace with your actual server endpoint
    data: JSON.stringify(formData), // Send the data as JSON
    contentType: 'application/json', // Set the content type to JSON
    success: function (data) {
      if (data.data.isreviewed == true) {
        closeModal();
        location.reload()
      }      
    },
    error: function (error) {
      console.log(error);
    },    
    });
    
}
