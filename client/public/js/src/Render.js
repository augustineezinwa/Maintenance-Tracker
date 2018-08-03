
/**
 * @class Render
 *
 * @description renders the validations to DOM.
 */
class Render {
  /**
      * @description -This method renders the validation signs on the signup email form field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidEmail() {
    const email = emailField.value;
    Render.renderValidationSign('notify-error', 'emailField', 'none', '', '');
    Render.renderValidationMessage('displayEmailError', 'none', '');

    if (validateEmail(email)) {
      Render.renderValidationSign('notify-error', 'emailField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error', 'emailField', 'none', '', 'red');
      Render.renderValidationMessage('displayEmailError', 'block', '* Invalid email');
      passwordField.disabled = 'true';
      confirmPasswordField.disabled = 'true';
      firstNameField.disabled = 'true';
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error', 'emailField', 'inline', 'lightgreen', '');
      passwordField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup password form field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidPassword() {
    const password = passwordField.value;
    Render.renderValidationSign('notify-error-password', 'passwordField', 'none', '', '');
    Render.renderValidationMessage('displayPasswordError', 'none', '');

    if (validatePassword(password)) {
      Render.renderValidationSign('notify-error-password', 'passwordField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-password', 'passwordField', 'none', '', 'red');
      Render.renderValidationMessage('displayPasswordError', 'block', `* Password must have at least one of @#$%*&,
       a number, a letter and minimum length of 5`);
      confirmPasswordField.disabled = 'true';
      firstNameField.disabled = 'true';
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error-password', 'passwordField', 'inline', 'lightgreen', '');
      confirmPasswordField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup password form field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidConfirmPassword() {
    const confirmPassword = confirmPasswordField.value;
    const password = passwordField.value;
    Render.renderValidationSign('notify-error-confirmpassword', 'confirmPasswordField', 'none', '', '');
    Render.renderValidationMessage('displayConfirmPasswordError', 'none', '');

    if (confirmPassword !== password) {
      Render.renderValidationSign('notify-error-confirmpassword', 'confirmPasswordField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-confirmpassword', 'confirmPasswordField', 'none', '', 'red');
      Render.renderValidationMessage('displayConfirmPasswordError', 'block', '* Password does not match');
      firstNameField.disabled = 'true';
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error-confirmpassword', 'confirmPasswordField', 'inline', 'lightgreen', '');
      firstNameField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup firstName field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidFirstName() {
    const firstName = firstNameField.value;
    Render.renderValidationSign('notify-error-firstname', 'firstNameField', 'none', '', '');
    Render.renderValidationMessage('displayFirstNameError', 'none', '');
    if (validateName(firstName)) {
      Render.renderValidationSign('notify-error-firstname', 'firstNameField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-firstname', 'firstNameField', 'none', '', 'red');
      Render.renderValidationMessage('displayFirstNameError', 'block', '* Invalid first name');
      lastNameField.disabled = 'true';
    } else {
      Render.renderValidationSign('notify-no-error-firstname', 'lastNameField', 'inline', 'lightgreen', '');
      lastNameField.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation signs on the signup lastName field.
      *
      * @returns {null} - writes and display signages to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderInvalidLastName() {
    const lastName = lastNameField.value;
    Render.renderValidationSign('notify-error-lastname', 'lastNameField', 'none', '', '');
    Render.renderValidationMessage('displayLastNameError', 'none', '');
    if (validateName(lastName)) {
      Render.renderValidationSign('notify-error-lastname', 'lastNameField', 'inline', 'red', 'red');
      Render.renderValidationSign('notify-no-error-lastname', 'lastNameField', 'none', '', 'red');
      Render.renderValidationMessage('displayLastNameError', 'block', '* Invalid last name');
    } else {
      Render.renderValidationSign('notify-no-error-lastname', 'lastNameField', 'inline', 'lightgreen', '');
      signupButton.removeAttribute('disabled');
    }
  }
  /**
      * @description -This method renders the validation message on the signup lastName field.
      *
      * @param {string} ElementId -This is the html element that needs to be rendered
      * @param {string} toggleDisplay -This is the display css style that gets toggled
      * @param {string} message  -This is message that is to be rendered to the DOM
      *
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderValidationMessage(ElementId, toggleDisplay, message) {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
    divElement.style.float = 'left';
    divElement.style.textAlign = 'left';
    divElement.style.color = 'red';
    divElement.innerHTML = message;
  }
  /**
      * @description -This method renders the validation message on the signup form fields.
      *
      * @param {string} ElementId -This is the html element that needs to be rendered
      * @param {string} formFieldId -This is the html element(sign) that needs to be rendered.
      * @param {string} toggleDisplay -This is the css style that handles the display of the validation sign
      * @param {string} signColor - The color of the validation sign assuming a field is filled correctly
      * @param {string} formFieldColor  -This is color of the formfield if it is wrongly validated
      *
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderValidationSign(ElementId, formFieldId, toggleDisplay, signColor, formFieldColor = '') {
    const divElement = document.getElementById(ElementId);
    const formField = document.getElementById(formFieldId);
    formField.style.width = '90%';
    formField.style.borderBottomColor = formFieldColor;
    divElement.style.display = toggleDisplay;
    divElement.style.color = signColor;
  }
  /**
      * @description -This method renders the loader animation during asynchronous events.
      *
      * @param {string} ElementId -This is the html element that needs to render the loader
      * @param {string} toggleDisplay -This is the css style that handles the display of the loader animation.
      * @param {string} loaderTextId - This is the div id that holds the loader text
      * @param {string} loaderText  -This is the text displayed by the loader to the user while waiting.
      *
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderLoader(ElementId, toggleDisplay, loaderTextId, loaderText) {
    const divElement = document.getElementById(ElementId);
    const loaderTextElement = document.getElementById(loaderTextId);
    divElement.style.display = toggleDisplay;
    divElement.style.marginTop = '20%';
    loaderTextElement.innerHTML = loaderText;
    loaderTextElement.style.color = 'white';
    loaderTextElement.style.fontSize = '24pt';
    loaderTextElement.style.textShadow = '2px 2px hotpink';
  }
  /**
      * @description -This method renders the alerts to users on maintenance-tracker.
      *
      * @param {string} ElementId -This is the html element that needs to be displayed
      * @param {string} toggleDisplay -This is the css style that handles the display of the div element
      * @param {string} text -This is the text that will be displayed in this div.
      * @param {string} bgColor -This is the text that will be displayed in this div.
      * @returns {null} - writes and display message to the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderAlert(ElementId, toggleDisplay, text = '', bgColor = '') {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
    divElement.innerHTML = text;
    divElement.style.backgroundColor = bgColor;
  }
  /**
      * @description -This method renders a div by id.
      *
      * @param {string} ElementId -This is the html element that needs to be displayed
      * @param {string} toggleDisplay -This is the css style that handles the display of the div element
      * @returns {null} - displays or hide divs in the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderDiv(ElementId, toggleDisplay) {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
  }

  /**
      * @description -This method renders a value into a div by id.
      *
      * @param {string} ElementId -This is the id of the html element that needs to render the value
      * @param {string} toggleDisplay -This is the css style that handles the display of the div element
      * @param {string} value -This is the value that needs to be rendered
      * @returns {null} - displays or hide divs in the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderValue(ElementId, toggleDisplay, value) {
    const divElement = document.getElementById(ElementId);
    divElement.style.display = toggleDisplay;
    divElement.value = value;
  }
  /**
      * @description -This method renders a color on a div.
      *
      * @param {string} ElementId -This is the html element that needs to be displayed
      * @param {string} color -This is the color that needs to be displayed
      * @param {string} borderColor -This is the color of the element border
      * @returns {null} - displays or hide divs in the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderDivColor(ElementId, color, borderColor = '') {
    const divElement = document.getElementById(ElementId);
    divElement.style.borderColor = borderColor;
    divElement.style.borderBottomColor = color;
  }
  /**
      * @description -This method renders the request into cards.
      *
      * @param {string} ElementId -This is the html element that needs to display the request cards
      * @param {string} requestTitle -This is the title of the request that will be rendered
      * @param {string} requestStatus -This is the current status of the request.
      * @param {string} requestId -This is the id of the request.
      * @param {string} updateLink - This link is that updates the request
      * @returns {null} - displays or stacks the requests in the div
      *
      * @memberOf Render class
      * @static
      */
  static renderRequestDivs(ElementId, requestTitle, requestStatus, requestId, updateLink = '') {
    const divElement = document.getElementById(ElementId);
    let statusIndicator, statusIndicatorColor, linkIndicator, callEvent;
    if (requestStatus === 'pending') { statusIndicator = 'fa fa-exclamation-circle'; statusIndicatorColor = 'darkorange'; }
    if (requestStatus === 'success') { requestStatus = 'Approved'; statusIndicator = 'fa fa-check'; statusIndicatorColor = 'green'; }
    if (requestStatus === 'fail') { requestStatus = 'Rejected'; statusIndicator = 'fa fa-times'; statusIndicatorColor = 'darkred'; }
    if (updateLink === 'Update') { linkIndicator = 'fa fa-edit'; }
    if (updateLink === 'Review') { linkIndicator = 'fa fa-search'; callEvent = 'Request.getARequestForAdmin(event)'; }

    divElement.innerHTML += ` <div class ="request-card ">
    <div class="display-container">
            
            <div class = "inner-box">${requestTitle} </div>
            <div class = "inner-box"><i style ="
            color: ${statusIndicatorColor}" class="${statusIndicator}">&nbsp</i> ${requestStatus}</div>
            
  <div class ="inner-box"><a onclick = "${callEvent || 'Request.getARequest(event)'}" key = ${requestId} id = "getRequestButton"><i class="${linkIndicator || 'fa fa-eye'}">&nbsp</i>${updateLink || ' View'}</a></div>
        </div>
</div>`;
  }

  /**
      * @description -This method renders the request into cards.
      *
      * @param {string} ElementId -This is the id of the html element that needs to display the request details
      * @param {string} requestTitle -This is the title of the request that will be rendered
      * @param {string} requestType -This is the type of the request that will be rendered.
      * @param {string} message -This is the message contained in the request.
      * @param {string} approvedStatus - This is the approval status of the request
      * @param {string} resolvedStatus -This is the resolved status of the request.
      * @param {string} name - This is the name of the request bearer.
      * @param {string} requestId - This is id of the request to be displayed
      * @returns {null} - displays or stacks the requests in the div
      *
      * @memberOf Render class
      * @static
      */
  static renderRequestDetailsDiv(
    ElementId, requestTitle, requestType, message, approvedStatus,
    resolvedStatus, name, requestId = ''
  ) {
    const divElement = document.getElementById(ElementId);
    let approvedStatusIndicator, resolvedStatusIndicator,
      approvedStatusMessage, resolvedStatusMessage, renderEmail, renderButtons;
    if (approvedStatus === 'pending') {
      approvedStatusMessage = 'pending';
      approvedStatusIndicator = 'fa fa-exclamation-circle';
      resolvedStatusIndicator = 'fa fa-exclamation-circle';
      resolvedStatusMessage = 'pending';
    }
    if (approvedStatus === 'success') {
      approvedStatusMessage = 'Accepted';
      approvedStatusIndicator = 'fa fa-check';
      resolvedStatusIndicator = 'fa fa-exclamation-circle';
      resolvedStatusMessage = 'pending';
    }

    if (resolvedStatus === 'success') {
      approvedStatusMessage = 'Accepted';
      approvedStatusIndicator = 'fa fa-check';
      resolvedStatusIndicator = 'fa fa-check';
      resolvedStatusMessage = 'Resolved';
    }
    if (approvedStatus === 'fail') {
      approvedStatusMessage = 'Rejected';
      approvedStatusIndicator = 'fa fa-times';
      resolvedStatusIndicator = 'fa fa-times';
      resolvedStatusMessage = 'Resolved';
    }


    if (requestId && resolvedStatus === 'pending') {
      renderButtons =
      `<a href ="#">
      <button type="resolve" key=${requestId} 
        onclick= "Request.approveRequest(event)">
       Resolve Request</button></a>`;
    }
    if (requestId && approvedStatus === 'fail' || requestId && resolvedStatus === 'success'
       || !requestId) {
      renderButtons =
      `<a href ="">
      <button type="approve" key=${requestId} 
        >
       Back </button></a>`;
    }

    if (requestId && approvedStatus === 'pending') {
      renderButtons =
      `<a href ="#">
      <button type="approve" key=${requestId} 
        onclick= "Request.approveRequest(event)">
       Aprove Request</button></a>
       
       <a href ="#"><button type="disapprove" key =${requestId}
       onclick = "Request.approveRequest(event)"> 
       Disapprove Request</button></a>`;
    }
    divElement.innerHTML += `<div class = "request-panel">
    <div class = "request-box">
        <h2>Request Report</h2>
        <div>&nbsp</div>
        <h3>Request Title:  &nbsp ${requestTitle}</h3>
        <div>&nbsp</div>
        message:
        <textarea required readonly ="readonly">${message}</textarea>
       <div class = "card-new" style ="width: 100%">
           <div>&nbsp</div>
           <h4>Request details</h4>
        <div>&nbsp</div>
        <ul>
            <li>Request Bearer: &nbsp<span id ="getName"> ${name}</span></li>
            <li id = "getEmail"></li>
            <li>Request Type:  &nbsp ${requestType}</li>
            <li>Request Approval Status: &nbsp${approvedStatusMessage}  &nbsp <i class= "${approvedStatusIndicator}"></i></li>
            <li>Request Resolved Status: &nbsp ${resolvedStatusMessage} &nbsp <i class= "${resolvedStatusIndicator}"></i> </li>
        </ul>
    </div>
            ${renderButtons}
            
      
</div>
        </div>`;
  }
  /**
      * @description -This method renders the summary of all request made by a user
      *
      * @param {string} ElementId -This is the html element that displays the request summary
      * @param {string} approvedRequestNumber -This is the html element that needs to be displayed
      * @param {string} resolvedRequestNumber -This is the html element that needs to be displayed
      * @param {string} disapprovedRequestNumber -This is the html element that needs to be displayed
      * @param {string} pendingRequestNumber -This is the html element that needs to be displayed
      * @returns {null} - displays or hide divs in the  DOM
      *
      * @memberOf Render class
      * @static
      */
  static renderRequestSummary(
    ElementId,
    approvedRequestNumber,
    resolvedRequestNumber,
    disapprovedRequestNumber,
    pendingRequestNumber
  ) {
    const divElementId = document.getElementById(ElementId);
    divElementId.innerHTML += `<div class ="request-container"style = "margin-top: 10%; height: 120%">
    <div class = "request-mother-card" style = "position: relative; ">
        <div class = "adjust" >

      <div class ="request-card">
      <div class =" display-container "> &nbsp </div>
              <div class =" display-container " style = " color: hotpink">
              <h2 >Search results</h2></div> 
              <div class =" display-container "> &nbsp</div>
            </div>

            <div class ="request-card">
            <div class =" display-container "> &nbsp </div>
              <div class =" display-container search-text" >
              <p>You have ${approvedRequestNumber} approved requests</p></div> 
              <div class =" display-container "> &nbsp </div>
            </div>

            <div class ="request-card">
            <div class =" display-container "> &nbsp </div>
                  <div class =" display-container search-text" >
                  <p>You have ${disapprovedRequestNumber} disapproved requests</p></div> 
                  <div class =" display-container "> &nbsp </div>
                </div>

                <div class ="request-card">
                <div class =" display-container "> &nbsp </div>
                      <div class =" display-container search-text" >
                      <p>You have ${resolvedRequestNumber} resolved requests</p></div> 
                      <div class =" display-container "> &nbsp </div>
                    </div>

                    <div class ="request-card">
                    <div class =" display-container "> &nbsp </div>
                    <div class =" display-container search-text" >
                    <p>You have ${pendingRequestNumber} pending requests</p></div> 
                    <div class =" display-container "> &nbsp </div>
                    
                  </div>
             
   </div>        
</div>

</div>`;
  }
}
