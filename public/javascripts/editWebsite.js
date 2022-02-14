function editWebsite(id) {
  // Get Values 
  var websiteName = document.querySelector('#name-'+id).innerHTML
  var websiteUrl = document.querySelector('#url-'+id).getAttribute("href")
  var websiteEmail = document.querySelector('#email-'+id).value
  var websitePassword = document.querySelector('#password-'+id).value
  
  // select Modal
  var editModal = new bootstrap.Modal(document.querySelector('#editWebsite'))
  // Toggle Modal
  editModal.toggle()

  // Change Values using dom
  document.querySelector('#editWebsiteName').value = websiteName
  document.querySelector('#editWebsiteUrl').value = websiteUrl
  document.querySelector('#editWebsiteEmail').value = websiteEmail
  document.querySelector('#editWebsitePassword').value = websitePassword
  document.querySelector('#editWebsiteForm').action = "websites/edit/"+id
}