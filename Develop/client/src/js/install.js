const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser prompt
    event.preventDefault();
  
    // Show a custom install button or UI
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.addEventListener('click', () => {
      // Trigger the installation prompt when the custom button is clicked
      event.prompt();
    });
  
    // Append the install button to a specific element in the DOM
    const installContainer = document.getElementById('installContainer');
    installContainer.appendChild(installButton);
  
    // Optionally, you can also handle the user's choice to install or cancel the installation
    event.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
      } else {
        console.log('User dismissed the installation');
      }
    });
  });

  
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Handle the click event on the install button
    if (window.deferredPrompt) {
      // Show the installation prompt if available
      window.deferredPrompt.prompt();
  
      // Wait for the user to respond to the prompt
      const choiceResult = await window.deferredPrompt.userChoice;
  
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
      } else {
        console.log('User dismissed the installation');
      }
  
      // Clear the deferredPrompt variable after the prompt is shown
      window.deferredPrompt = null;
    } else {
      // Fallback logic if the deferredPrompt is not available
      console.log('Installation prompt not available');
    }
  });


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Handle the appinstalled event
    // You can show a confirmation message or perform post-installation actions here
    console.log('App installed successfully!');
    // Add any post-installation logic here
  });
