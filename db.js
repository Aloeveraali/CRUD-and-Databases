// Function to toggle the "Other" title input field
function toggleOtherTitleInput() {
  const titleSelect = document.getElementById('titleSelect');
  const otherTitleInput = document.getElementById('otherTitleInput');
  titleSelect.addEventListener('change', function () {
      otherTitleInput.style.display = this.value === 'Other' ? 'block' : 'none';
  });
}

// Call the function to handle the "Other" title field visibility
toggleOtherTitleInput();

// Create User Form Submission
document.getElementById('createUserForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from submitting the traditional way

  const userInfo = {
      title: document.getElementById('titleSelect').value,
      firstName: document.getElementById('firstName').value,
      surname: document.getElementById('lastName').value,
      mobile: document.getElementById('mobileNumber').value,
      email: document.getElementById('emailAddress').value
  };

  fetch('/create-user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
  })
  .then(response => response.json())
  .then(data => {
      alert('User created successfully');
  })
  .catch(error => {
      console.error('Error:', error);
  });
});

// Retrieve User Form Submission
document.getElementById('retrieveUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const searchName = document.getElementById('searchName').value;

  fetch(`/users?name=${searchName}`)
      .then(response => response.json())
      .then(data => {
          const resultsDiv = document.getElementById('searchResults');
          resultsDiv.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
          console.error('Error retrieving users:', error);
      });
});

// Update User Form Submission
document.getElementById('updateUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = document.getElementById('updateUserId').value;
  const updatedInfo = {
      mobile: document.getElementById('updateUserPhone').value,
      email: document.getElementById('updateUserEmail').value,
      title: document.getElementById('updateUserTitle').value
  };

  fetch(`/update-user/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInfo),
  })
  .then(response => response.text())
  .then(data => {
      alert('User updated successfully');
  })
  .catch(error => {
      console.error('Error updating user:', error);
  });
});

// Delete User Form Submission
document.getElementById('deleteUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = document.getElementById('deleteUserId').value;

  fetch(`/delete-user/${userId}`, {
      method: 'DELETE',
  })
  .then(response => response.text())
  .then(data => {
      alert('User deleted successfully');
  })
  .catch(error => {
      console.error('Error deleting user:', error);
  });
});
