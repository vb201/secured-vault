function editBankCards(id) {
  // Get Values 
  var bankCardName = document.querySelector('#name-'+id).innerHTML
  var bankCardCardNumber = document.querySelector('#cardNumber-'+id).value
  var bankCardHolderName = document.querySelector('#holderName-'+id).value
  var bankCardExpiry = document.querySelector('#expiry-'+id).value
  var bankCardCVV = document.querySelector('#cvv-'+id).value
  
  // select Modal
  var editModal = new bootstrap.Modal(document.querySelector('#editBankCard'))
  // Toggle Modal
  editModal.toggle()

  // Change Values using dom
  document.querySelector('#editBankCardName').value = bankCardName
  document.querySelector('#editBankCardCardNumber').value = bankCardCardNumber
  document.querySelector('#editBankCardHolderName').value = bankCardHolderName
  document.querySelector('#editBankCardExpiry').value = bankCardExpiry
  document.querySelector('#editBankCardCVV').value = bankCardCVV
  document.querySelector('#editBankCardForm').action = "bank-cards/edit/"+id
}