// Show alert
const messageAlerts = document.querySelectorAll(".message-info");
if (messageAlerts) {
  messageAlerts.forEach(messageAlert => {

    const alert = messageAlert.childNodes[0];
    const time = Number(alert.getAttribute("time-alert"));
    
    setTimeout(() => {
      messageAlert.classList.add("hidden");
    }, time);
  })

}

// End Show Elert