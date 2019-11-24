//global variables

const checkboxes = $('input:checkbox');
const $activitiesSection = $('.activities');
const creditCardOption = $('#payment option[value="Credit Card"]');
const $creditCardDiv = $('#credit-card');
const $payPalDiv = $('#paypal');
const $bitCoinDiv = $('#bitcoin');
const $paymentMenu = $('#payment');
const otherTitle = $('#other-title');
const designMenu = $('#design');
//fields used in validation
let shirtSelected = false;
let activitySelected = 0;
let conferenceCost = 0.0;
let nameValue = '';
let emailValue = '';
let cardNumber = '';
let zipCode = '';
let cvv = '';
let paymentOption = 'Credit Card';

//create elements
const totalCostDiv = document.createElement('div');
totalCostDiv.setAttribute('id', 'cost-div');
const amountSpan = document.createElement('span');

//set default state on page load
$('#name').focus();
$payPalDiv.hide();
$bitCoinDiv.hide();
otherTitle.hide();
creditCardOption.prop('selected', true);


//job Role when other option is selected from Job Role Drop Down display field
$('#title').change(() => {
    const title = ($('#title option:selected').text());
    if (title === 'Other') {
        otherTitle.show();
    } else {
        otherTitle.hide();
    }
});

//t-shirt section
//hide color options until a a theme is selected from the t-shirt design menu

designOptions();

function designOptions() {
    if (shirtSelected === false || shirtSelected === 'Select Theme') {
        $('#color').html("<option value='Theme'>Please select a T-shirt theme</option>");
    } else if (shirtSelected === "Theme - JS Puns") {
        $('#color').html("<option value='Theme'>Cornflower Blue</option>" +
            "<option value='Theme'>Dark Slate Grey</option>" +
            "<option value='Theme'>Gold</option>");
    } else {
        $('#color').html('<option value="Theme">Tomato</option>' +
            '<option value="Theme">Steel Blue</option>' +
            '<option value="Theme">Dim Grey</option>');
    }
}

///////
//Register for Activities Section
// ////

const activityCheckedHandler = checkboxes.change((e) => {
    const selectedDateAndTime = e.target.getAttribute('data-day-and-time');
    let value = (e.target.getAttribute('data-cost'));
    let adjustedValue = parseFloat(value.slice(1));
    activitySelected = adjustedValue;
    if (e.target.checked) {
        conferenceCost += adjustedValue;
        createAmountField();
        //if box checked disable boxes at same time and apply line through effect
        for (let i = 0; i < checkboxes.length; i++) {
            let currentBox = checkboxes[i];
            //get the date time value of the checkbox in the loop
            let otherDateAndTime = checkboxes[i].getAttribute('data-day-and-time');
            if (selectedDateAndTime === otherDateAndTime && currentBox != e.target) {
                checkboxes[i].setAttribute('disabled', 'true');
                currentBox.parentElement.style.textDecoration = 'line-through';
            }
        }
    }
    //remove disabled attr and styles if unchecked
    else {
        conferenceCost -= adjustedValue;
        createAmountField();
        for (let i = 0; i < checkboxes.length; i++) {
            let currentBox = checkboxes[i];
            //get the date time value of the checkbox in the loop
            let otherDateAndTime = checkboxes[i].getAttribute('data-day-and-time');
            if (selectedDateAndTime === otherDateAndTime && currentBox != e.target) {
                checkboxes[i].setAttribute('disabled', 'false');
                currentBox.parentElement.style.textDecoration = 'none';
            }
        }
    }
});

/////Manage cost section

function createAmountField() {
    //append a total amount field if activities are selected
    $activitiesSection.append(totalCostDiv);
    totalCostDiv.append(amountSpan);
    $('#cost-div').addClass('output');
    $('#cost-div').text(`Total Cost: ${conferenceCost}`);
}


///////////
//Payment Info
////////
$paymentMenu.change((e) => {
    paymentOption = e.target.value;
    switch (paymentOption) {
        case 'PayPal':
            $payPalDiv.show();
            $bitCoinDiv.hide();
            $creditCardDiv.hide();

            break;
        case 'Bitcoin':
            $bitCoinDiv.show();
            $payPalDiv.hide();
            $creditCardDiv.hide();
            break;
        default:
            $creditCardDiv.show();
            $payPalDiv.hide();
            $bitCoinDiv.hide();
    }
});

///////////////////
// Validation section
//////////////////

$('button').click(function (event) {
    //Note that I made the decision to validate all info on click rather
    // than one section at a time
    //I thought it informing the user of all validation errors a once is a better
    // experience than one at time. At least I hate it when that happens to me.

    const invalidName = validateName();
    const validEmail = validateEmail();
    const activityChosen = validateActivity();
    const validCreditCardDetails = validateCreditCard();
    let validZip = validateZipCode();
    let validCVV = validateCVV();
    if (invalidName) {
        event.preventDefault();
    }
    if (!validEmail || emailValue === '') {
        event.preventDefault();
    }
    if (!activityChosen) {
        event.preventDefault();
    }
    if (!validCreditCardDetails) {
        event.preventDefault();
    }
    if (!validZip){
        event.preventDefault()
    }
    if (!validCVV){
        event.preventDefault();
    }
});


function validateName() {
    //check if name field does not contain two strings of letters
    //separated by a space
    const emptyString = /^$/;
    let nameTest = emptyString.test(nameValue);
    if (nameTest) {
        setNameHelper(true);
    } else {
        setNameHelper(false);
    }
    return nameTest;
};

function validateEmail() {
    console.log('email validator called');
    const emailRegex = /^\S+@\S+\.\S+$/;
    let result = (emailRegex.test(emailValue));
    console.log('email validation = ' + result);
    if (!result) {
        setEmailHelper(true);
    } else {
        setEmailHelper(false);
    }
    return result;
};

function validateActivity() {
    console.log('called set activity validation');
    console.log('value of activity selected ' + conferenceCost);
   if (conferenceCost  > 0){
       console.log('true branch acticity val');
       setActivityHelper(true);
       return true;
   }else {
       setActivityHelper(false);
       return false;
   }
};

function validateCreditCard() {
       const validCardFormat = /^[0-9]{13,16}$/;
    if (paymentOption === 'Credit Card') {
        //sub routine to validate card details only if a card is chosen.
        let validCard = validCardFormat.test(cardNumber);
        if (validCard){
            setCCNumberHelper(true);
            return true;
        }else {
            setCCNumberHelper(false);
            return false;
        }
    }else {
        return true;
    }
};
// Used some arrow functions for practice not sure which way
// is preferred for this project

const validateZipCode = () =>{
    const validZipCode = /^[0-9]{5}$/;
    if (paymentOption === 'Credit Card'){
        let result = validZipCode.test(zipCode);
        if (!result){
            setZipHelper(false);
        }else {
            setZipHelper(true);
        }
        return result;
    }
    return true;

};

const validateCVV = () => {
    const cvvRegex = /^[0-9]{3}$/;
    if (paymentOption === 'Credit Card'){
        let result = cvvRegex.test(cvv);
        if (!result){
            setCVVHelper(false);
        }else {
            setCVVHelper(true);
        }
        return result;
    }
    return  true;

};
/////////////////////
// Helper functions to add or remove CSS depending on validation results
/////////////////////

function setNameHelper(validName) {
    let condition = validName;
    if (condition) {
        $('#name').toggleClass('invalid', true);
        $('#nameHelper').removeAttr('hidden');
    } else {
        $('#name').toggleClass('invalid', false);
        $('#nameHelper').attr('hidden', 'true');
    }
};

function setEmailHelper(validEmail) {
    let condition = validEmail;
    if (condition) {

        $('#mail').toggleClass('invalid', true);
        $('#emailHelper').removeAttr('hidden');
    } else {
        $('#mail').toggleClass('invalid', false);
        $('#emailHelper').attr('hidden', 'true');
    }
};

function setActivityHelper(validActivty) {
    let condition = validActivty;
    if (!condition) {
        $('#activity-helper').removeAttr('hidden');
    } else {
        $('#activity-helper').attr('hidden', 'true');
    }
};

function setCCNumberHelper(validNumber){
    if (!validNumber){
        $('#ccHelper').removeAttr('hidden');
    }else {
        $('#ccHelper').attr('hidden', 'true');
    }
};

function setZipHelper(validZip){
    if (!validZip){
        $('#zipHelper').removeAttr('hidden');

    }else {
        $('#zipHelper').attr('hidden', 'true');
    }
};

function setCVVHelper(validCVV){
    if (!validCVV){
        $('#cvvHelper').removeAttr('hidden');
    }else {
        $('#cvvHelper').attr('hidden', 'false');
    }
};


/////////
// Event Handlers
////////


$('#name').change(function (e) {
    nameValue = e.target.value;
});

$('#mail').change(function (e) {
    emailValue = e.target.value;
});

const designOption = designMenu.change(() => {
        shirtSelected = $('#design option:selected').text();
        designOptions();
    }
);

$('#cc-num').change(function (e) {
    cardNumber = e.target.value;
});

$('#zip').change(function (e) {
    zipCode = e.target.value;
});

$('#cvv').change(function (e) {
    cvv = e.target.value;
});











