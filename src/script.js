function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to.
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child.
  //"execCommand()" only works when there exists selected text, and the text is inside
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand("copy");

  //(Optional) De-select the text using blur().
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

window.addEventListener("submit", function (e) {
  //Only run if swagger ui class exists
  if (!document.querySelector(".swagger-ui")) {
    return;
  }

  //This should grab the form that the user clicked submit on
  const targetElement = e.target.parentElement;

  //create mutation observer to track when angular renders the response(explorer-body) component
  const observerOptions = {
    childList: true,
  };

  const observer = new MutationObserver((mutationsList) => {
    const responseBody = mutationsList.map((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        //response body is stored in the class explorer-body
        const responseBody = targetElement.querySelector(".explorer-body");
        return responseBody;
      }
    })[0];

    //if responseBody is not found exit
    if (!responseBody) {
      return;
    }

    //If responseBody is already being observed than exit
    if (responseBody.observed == true) {
      return;
    } else {
      //else set observed to true so we don't spawn redundant observers
      responseBody.observed = true;
    }

    //Create button to copy responseBody to clipboard
    const handleClick = (e) => {
      copyTextToClipboard(responseBody.innerText);
    };
    const button = document.createElement("button");
    button.innerText = "Copy All";
    button.onclick = handleClick;

    //Insert button before response-body
    responseBody.insertAdjacentElement("beforeBegin", button);
  });

  //watch the form component that user clicked submit on.
  observer.observe(targetElement, observerOptions);
});
