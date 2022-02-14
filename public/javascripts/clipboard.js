navigator.permissions
.query({
  name: "clipboard-write",
})
.then((permissionStatus) => {
  // Will be 'granted', 'denied' or 'prompt':
  console.log('clipboard-write permission status: ' + permissionStatus.state);
  // Listen for changes to the permission state
  permissionStatus.onchange = () => {
    console.log('clipboard-write permission status: ' + permissionStatus.state);
  };
});

function copyToClipboard(text) {
navigator.clipboard
  .writeText(text)
  .then(() => {
    console.log("Copied: " + text);
  })
  .catch((err) => {
    console.error("Text could not be copied", err);
  });
}