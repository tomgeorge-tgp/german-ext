var Email = "";
window.onload = (event) => {
  chrome.runtime.sendMessage({ message: "getLoginEmail" });
  console.log("page is fully loaded");

  setTimeout(checkInputFields, 10000);
};

// Function to handle button clicks
function handleButtonClick(event) {
  // Your code to handle button clicks
  console.log("Button clicked!", event.target);
  // Perform other actions as needed
}

// Add event listeners to all button elements on the page
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Function to be called when an input value changes
function handleInputChange(event) {
  // Your code to handle input changes
  console.log("Input value changed:", event.target.value);
  // Perform other actions as needed
}

// Find all button elements on the page

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.email) {
    // Handle the received email ID
    Email = request.email;
    console.log("Received email ID:", request.email);

    // checkInputFields();
  }
});
let userData;
function checkInputFields() {
  console.log("to fetch");
  const inputFields = document.querySelectorAll("input");
  // inputFields.forEach((divElement) => {
  //   divElement.style.backgroundColor = 'green';
  // });
  // const inputFields = document.querySelectorAll('div[data-automation-id] input[type="text"], div[data-automation-id] input[type="checkbox"], div[data-automation-id] input[type="radio"]');
  console.log("inputFields", inputFields);
  if (inputFields.length > 0 && Email.length > 0) {
    console.log("to fetch", Email);
    const url = "http://localhost:5000/api/details/extension/" + Email;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process the data received from the backend
        console.log(data);
        userData = data;
        createFloatingPopup();
        fillDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the backend", error);
      });
  }
}
document.addEventListener(
  "mousedown",
  function (event) {
    console.log("event", event);
    if (event.button === 2) {
      // Right mouse button
      const lastClickedElement = event.target;
      console.log("lastClickedElement", lastClickedElement);
      fillDetails(userData);
    }
  },
  true
);

function onPopButtonClick() {
  console.log("onPopButtonClick");
}
// checkInputFields();
var personDetails = {
  name: "Amal Jose Vallavanthara",
  firstname: "Amal",
  middlename: "Jose",
  lastname: "Vallavanthara",
  location: "Germany",
  address: "Kahlhieb 2",
  city: "Stuttgart",
  postcode: 70499,
  email: "emailUser",
  phone: "017632634505",
  code: "+49",
  password: "Hello123@",
  gender: "Male",
};

const mapDetailRegex = {
  firstName:
    /first[_ ]?name|firstname|in[_-]?firstname|[a-z0-9]*f[a-z0-9]*[_]*name[a-z0-9]*[_]*/gi,
  middleName:
    /middle[_]?name|middlename|in[_-]?middlename|[a-z0-9]*m[a-z0-9]*[_]*name[a-z0-9]*[_]*/gi,
  lastName:
    /last[_ ]?name|lastname|in[_-]?lastname|[a-z0-9]*l[a-z0-9]*[_]*name[a-z0-9]*[_]*/gi,
  fullName:
    /name|full[_ ]?name|given[_ ]?name|user[_ ]?name|display[_ ]?name|given[_]?name|[a-z0-9]*given[a-z0-9 ]*?name[a-z0-9]*/gi,
  preferredName:
    /preferred[_ ]?name|preferredname|in[_-]?preferredname|[a-z0-9]*p[a-z0-9]*[_]*name[a-z0-9]*[_]*/gi,
  phoneNumber:
    /phone[_ ]?number|phonenumber|phone[-]number|[a-z0-9]*phone[a-z0-9]*|[a-z0-9]*p[a-z0-9]*[_]*number[a-z0-9]*[_]*|[a-z_0-9]*p[_]*no[a-z_0-9]*/gi,
  email:
    /[a-z0-9]*email[a-z0-9]*|[a-z0-9]*e[_]?[a-z0-9]*mail[a-z0-9]*|[a-z0-9]*emailaddress[a-z0-9]*|[a-z0-9]*email[_ ]?address[a-z0-9]*|[a-z0-9]*email[_]?[a-z0-9]*field[a-z0-9]*|[a-z0-9]*e[_]?[a-z0-9]*mail[_]?field[a-z0-9]*|emailid|[a-z0-9]*e[_]?mail[a-z0-9]*[_]?id[a-z0-9]*|[a-z0-9]*emailaddressid[a-z0-9]*|[a-z0-9]*email[_]?[a-z0-9]*address[a-z0-9]*[_]?[a-z0-9]*id/gi,
  phoneAlternativeNumber:
    /(^|[^a-zA-Z])phone($|[^a-zA-Z])alternative($|[^a-zA-Z])number($|[^a-zA-Z])/gi,

  code: /(^|[^a-zA-Z])code($|[^a-zA-Z])/gi,
  DoB: /(^|[^a-zA-Z])DoB($|[^a-zA-Z])/gi,
  address1: /(^|[^a-zA-Z])address($|[^a-zA-Z0-9]*)/gi,
  address2: /(^|[^a-zA-Z])address2($|[^a-zA-Z])/gi,
  gender: /(^|[^a-zA-Z])gender($|[^a-zA-Z])/gi,
  street: /(^|[^a-zA-Z])street($|[^a-zA-Z])/gi,
  houseNumber: /(^|[^a-zA-Z])houseNumber($|[^a-zA-Z])/gi,
  zip: /(^|[^a-zA-Z])zip($|[^a-zA-Z])/gi,
  city: /(^|[^a-zA-Z])city($|[^a-zA-Z])/gi,
  state: /(^|[^a-zA-Z])state($|[^a-zA-Z])/gi,
  country: /(^|[^a-zA-Z])country($|[^a-zA-Z])/gi,
  apartment: /(^|[^a-zA-Z])apartment($|[^a-zA-Z])/gi,
  floor: /(^|[^a-zA-Z])floor($|[^a-zA-Z])/gi,
  building: /(^|[^a-zA-Z])building($|[^a-zA-Z])/gi,
};

const fillDetails = (data) => {
  const userDetails = data.details;
  console.log("userDetails: ", userDetails["firstName"]);
  const inputFields = document.querySelectorAll("input");
  console.log("input fields", inputFields);
  const inputDetails = [];
  // const htmlCode = document.documentElement.outerHTML;
  // console.log(htmlCode);

  inputFields.forEach((inputField) => {
    const fieldData = {
      name: inputField.name,
      id: inputField.id,
      placeholder: inputField.placeholder,
      type: inputField.type,
    };
    let matchFound = false;
    console.log("fieldData: ", fieldData);
    // if (!fieldData) {continue;} // Skip empty fields
    Object.keys(mapDetailRegex).forEach((key) => {
      const pattern = mapDetailRegex[key];
      if ((fieldData.type === "text" || fieldData.type === "number")&&matchFound==false) {
        if (
          pattern.test(fieldData.name) ||
          pattern.test(fieldData.id) ||
          pattern.test(fieldData.placeholder)
        ) {
          console.log("pattern: ", pattern);
          console.log("Matched pattern:", key);
          inputField.value = userDetails[key];
          matchFound=true;
        }
        else  
        {
          if (inputField.id) {
                  console.log("here");
                  const correspondingLabel = document.querySelector(
                    `label[for="${inputField.id}"]`
                  );
                  console.log("id",inputField.id,"label", correspondingLabel)
                  if(correspondingLabel){
                  const labelText = correspondingLabel.textContent.trim();
                  // Log the text content of the label
                  console.log("label", labelText);
                  if (pattern.test(labelText)) {
                    console.log("value", userDetails[key]);
                    inputField.value = userDetails[key];
                    matchFound = true;
                  }
                }
                }
            const allInnerText=inputField.parentElement.parentElement.parentElement.innerText
            const allInnerTextArray = allInnerText.split('\n').filter(text => text.trim() !== '');
            let selectKey="";

            for (const key in mapDetailRegex) {
              if (mapDetailRegex.hasOwnProperty(key)) {
                const regex = mapDetailRegex[key];
                const matchingText = allInnerTextArray.filter(text => regex.test(text));
                if (matchingText.length > 0) {
                  selectKey=key;
                }
              }
            }
            inputField.value=userDetails[selectKey]
            matchFound = true;
          }      
      } else if (fieldData.type === "checkbox") {
        // checkbox
        // let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        // checkboxes.forEach((checkbox) => {
          console.log("Checkbox:",fieldData.name);
          matchFound = true;
          // if(fieldData.name==="pronouns")
          // {
            
          // }
        // });
      }
    });
  });

 // Handle Dropdowns related to location
  const locationSelectors = ['Location*', 'country', 'place', 'location*', 'location'];
  const selectorRegex={
    state:/(^|[^a-zA-Z])state($|[^a-zA-Z])|([^a-zA-Z0-9]*state[^a-zA-Z0-9*]*)/gi,
    country: /(^|[^a-zA-Z])country($|[^a-zA-Z])|([^a-zA-Z0-9]*location[^a-zA-Z0-9*]*)|([^a-zA-Z]*place[^a-zA-Z]*)/gi,
  }
  document.querySelectorAll('select').forEach(menu => {

      // console.log("menu",menu);
      // console.log("menu.id",menu.id);
      // console.log("menu.class",menu.classList);
      // console.log("prevElementSibling",menu.previousElementSibling)
      // console.log("nextElementSibling",menu.nextElementSibling)
      // console.log("parentElement",menu.parentElement.parentElement.parentElement)
      // console.log("parentElement.text",menu.parentElement.parentElement.parentElement.innerText)
      const allInnerText=menu.parentElement.parentElement.parentElement.innerText
      const allInnerTextArray = allInnerText.split('\n').filter(country => country.trim() !== '');
      // console.log('Country Array:', allInnerTextArray);


        let selectKey="";

        for (const key in selectorRegex) {
          if (selectorRegex.hasOwnProperty(key)) {
            const regex = selectorRegex[key];
            const matchingCountries = allInnerTextArray.filter(country => regex.test(country));
            if (matchingCountries.length > 0) {
              selectKey=key;
            }
          }
        }
      // console.log(`Country: ${countriesWithLocationOrCountry}`)
      const optionTextToSelect = userDetails[selectKey]; 
      const selectOptions=menu.options
      Array.from(selectOptions).forEach((option) => {
        if (option.text === optionTextToSelect) {
          option.selected = true;
          console.log('Option selected:', option.text);
        }
      });
      
  }); 


  // content.js

  // const specificElements = document.querySelectorAll("div, p, label, input");
  // const elementsHTML = Array.from(specificElements).map(
  //   (element) => element.outerHTML
  // );
  // console.log(elementsHTML);

  // inputFields.forEach((inputField) => {
  //   const fieldDetails = {
  //     type: inputField.type,
  //     name: inputField.name,
  //     value: inputField.value,
  //     id: inputField.id,
  //     placeholder: inputField.placeholder,
  //     // Add more details as needed (e.g., id, class, etc.)
  //   };
  //   inputDetails.push(fieldDetails);

  //   Object.keys(mapDetailRegex).forEach((key) => {
  //     const pattern = mapDetailRegex[key];
  //     console.log("pattern",pattern);
  //     console.log("key",key)
  //     console.log("inputField.name",inputField.name)
  //     console.log("inputField.id",inputField.id)
  //     console.log("inputField.placeholder",inputField.placeholder)
  //     if (
  //       pattern.test(inputField.name) ||
  //       pattern.test(inputField.id) ||
  //       pattern.test(inputField.placeholder)
  //     ) {
  //       console.log("value", userDetails[key]);
  //       inputField.value = userDetails[key];
  //     } else if (inputField.id) {
  //       const correspondingLabel = document.querySelector(
  //         `label[for="${inputField.id}"]`
  //       );
  //       // console.log("id",inputField.id,"label", correspondingLabel)
  //       const labelText = correspondingLabel.textContent.trim();
  //       // Log the text content of the label
  //       console.log("label", labelText);
  //       if (pattern.test(labelText)) {
  //         console.log("value", userDetails[key]);
  //         inputField.value = userDetails[key];
  //       }
  //     }

  //     // console.log("input fields", inputFields);
  //     // console.log("inputDetails", inputDetails);
  //     // if (
  //     //   mapDetails[inputField.name] != undefined ||
  //     //   mapDetails[inputField.id] != undefined ||
  //     //   mapDetails[inputField.placeholder] != undefined
  //     // ) {
  //     //   inputField.value = data[mapDetails[inputField.name]];
  //     // }
  //   });
  // });
  // console.log("input Details", inputDetails);

  // Handle Input Fields
  // const nameField = document.querySelector(
  //   'input[name*="name"], input[id*="name"], input[placeholder*="name"]'
  // );
  // const fnameField = document.querySelector(
  //   'input[name*="First Name"],input[name*="First Name"],input[name*="First name"], input[name*="first name"] input[id*="first name"], input[placeholder*="First Name"]'
  // );
  // const lnameField = document.querySelector(
  //   'input[name*="name"], input[id*="name"], input[placeholder*="name"]'
  // );
  // const emailField = document.querySelector(
  //   'input[type*="mail"], input[name*="mail"], input[id*="mail"], input[placeholder*="mail"], input[data-automation-id*="mail"]'
  // );
  // const phoneField = document.querySelector(
  //   'input[type="tel"], input[name="phone"], input[id*="phone"], input[placeholder*="phone"]'
  // );
  // const passwordField = document.querySelector(
  //   'input[type="password"], input[name="password"], input[id*="password"], input[placeholder*="password"]'
  // );
  // const verifypasswordField = document.querySelector(
  //   'input[type="password"], input[name="password"], input[id*="password"], input[placeholder*="password"]'
  // );
  // const nameFields = document.querySelectorAll(
  //   'input[name*="name"], input[id*="name"], input[placeholder*="name"]'
  // );

  // const nameFields = document.querySelectorAll('input[name*="name"], input[id*="name"], input[placeholder*="name"]');
  // console.log("nameFields", nameFields[0]);
  // console.log("nameField", nameField);
  // console.log("email", emailField);
  // console.log("first name", fnameField);
  // nameFields.forEach(function (field) {
  //   // Your logic for each field here
  //   console.log(field); // For instance, this would log the value of each input field
  // });

  // if (nameField) nameField[0] = personDetails.name;
  // if (inputFields) inputDetails[0].value = personDetails.name;
  // if (emailField) emailField.value = personDetails.email;
  // if (phoneField) phoneField.value = personDetails.phone;
  // if (passwordField) passwordField.value = personDetails.password;
  // if (verifypasswordField) verifypasswordField.value = personDetails.password;

  

  // if (cvField) {
  //     const cvURL = chrome.runtime.getURL('my-cv.pdf');
  //     fetch(cvURL)
  //         .then(resp => resp.blob())
  //         .then(blob => {
  //             const file = new File([blob], 'my-cv.pdf', { type: 'application/pdf' });
  //             const dt = new DataTransfer();
  //             dt.items.add(file);
  //              // cvField.files = dt.files;
  //         });
  // }

  //     };

  // Find the input field for CV uploads using attributes
  // const cvField = document.querySelector('input[type="file"][name="cv"]');

  // if (cvField) {
  //     const cvURL = chrome.runtime.getURL('my-cv.pdf');
  //     fetch(cvURL)
  //         .then(resp => resp.blob())
  //         .then(blob => {
  //             const file = new File([blob], 'my-cv.pdf', { type: 'application/pdf' });
  //             const dt = new DataTransfer();
  //             dt.items.add(file);
  //             // cvField.files = dt.files;
  //         });

  //contextMenu

  let lastClickedElement = null;

  document.addEventListener(
    "mousedown",
    function (event) {
      if (event.button === 2) {
        // Right mouse button
        lastClickedElement = event.target;
        console.log("lastClickedElement", lastClickedElement);
      }
    },
    true
  );

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //     if (message.action === "uploadDocument") {
  //         const fileInput = lastClickedElement;
  //         if (fileInput && fileInput.tagName.toLowerCase() === 'input' && fileInput.type === 'file') {
  //             const documentURL = chrome.runtime.getURL(`${message.documentType}.pdf`);
  //             console.log("Generated URL for the document:", documentURL); // Debugging

  //             fetch(documentURL)
  //                 .then(resp => {
  //                     if (!resp.ok) throw new Error('Network response was not ok');
  //                     return resp.blob();
  //                 })
  //                 .then(blob => {
  //                     const file = new File([blob], `${message.documentType}.pdf`, { type: 'application/pdf' });
  //                     const dt = new DataTransfer();
  //                     dt.items.add(file);
  //                     fileInput.files = dt.files;
  //                 })
  //                 .catch(error => {
  //                     console.error("Error fetching the document:", error); // Debugging
  //                 });
  //         }
  //     }
  // });
};

function createFloatingPopup() {
  const popupDiv = document.createElement("div");

  // Apply styles to position the popup at the top-right corner
  popupDiv.style.position = "fixed";
  popupDiv.style.top = "10px"; // Adjust this to set the distance from the top
  popupDiv.style.right = "10px"; // Adjust this to set the distance from the right
  popupDiv.style.height = "50px";
  popupDiv.style.backgroundColor = "black"; // Customize popup styles
  popupDiv.style.border = "1px solid black"; // Customize popup styles
  popupDiv.style.zIndex = "1000";
  popupDiv.style.transition = "0.3s ease"; // Adding transition for smooth animation
  popupDiv.style.borderTopLeftRadius = "15px"; // Adding border radius to the top-left corner
  popupDiv.style.borderBottomLeftRadius = "15px"; // Adding border radius to the bottom-left corner

  popupDiv.style.display = "flex"; // Use flex display
  popupDiv.style.alignItems = "center"; // Center items vertically

  // Add the popup to the page
  document.body.appendChild(popupDiv);

  // Create and style the button
  const button = document.createElement("button");
  button.textContent = "Button";
  button.style.backgroundColor = "black"; // Customize button styles
  button.style.color = "white"; // Customize button styles
  button.style.border = "1px solid black"; // Customize button styles
  button.style.padding = "5px 10px"; // Adjust padding as needed
  popupDiv.appendChild(button);

  // Create and style the text content
  const textContent = document.createElement("div");
  textContent.textContent = "Your Popup Content";
  textContent.style.marginLeft = "10px"; // Adjust spacing between button and text
  textContent.style.color = "white"; // Customize text styles

  // Functionality for hover effect and animation
  popupDiv.addEventListener("mouseenter", () => {
    popupDiv.appendChild(textContent);
    // popupDiv.style.right = "150px"; // Slide to the left
  });

  popupDiv.addEventListener("mouseleave", () => {
    popupDiv.style.right = "10px"; // Return to the original position
    popupDiv.style.right = "10px"; // Return to the original position
    if (popupDiv.contains(textContent)) {
      popupDiv.removeChild(textContent); // Remove the text content
    }
  });

  // Close button event listener
  button.addEventListener("click", () => {
    // document.body.removeChild(popupDiv);
    onPopButtonClick();
  });
}
