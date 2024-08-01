const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
  const searchText = searchInput.value.toLowerCase().trim(); // Trim leading and trailing spaces

  const rows = document.querySelectorAll('.table tbody tr');

  rows.forEach(row => {
    const fullName = (row.querySelector('td:nth-child(2)').textContent + ' ' + row.querySelector('td:nth-child(3)').textContent).toLowerCase();
    const firstName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const lastName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const phone = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

    // Check if the full name, first name, last name, email, or phone number contains the search text
    if (fullName.includes(searchText) || firstName.includes(searchText) || lastName.includes(searchText) || email.includes(searchText) || phone.includes(searchText)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
