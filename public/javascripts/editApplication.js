function editApplication(id) {
  // Get Values 
  var applicationName = document.querySelector('#name-'+id).innerHTML
  var applicationDevice = document.querySelector('#device-'+id).innerHTML
  var applicationEmail = document.querySelector('#email-'+id).value
  var applicationPassword = document.querySelector('#password-'+id).value
  


  // select Modal
  var editModal = new bootstrap.Modal(document.querySelector('#editApplication'))
  // Toggle Modal
  editModal.toggle()

  // Change Values using dom
  document.querySelector('#editApplicationName').value = applicationName
  document.querySelector('#editApplicationDevice').value = applicationDevice
  document.querySelector('#editApplicationEmail').value = applicationEmail
  document.querySelector('#editApplicationPassword').value = applicationPassword
  document.querySelector('#editApplicationForm').action = "applications/edit/"+id
}