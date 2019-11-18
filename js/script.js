$(document).ready(function () {
    //global variables

    const checkboxes = $('input:checkbox');
    const $activitiesSection = $('.activities');
    const creditCardOption = $('#payment option[value="Credit Card"]');
    const $creditCardDiv = $('#credit-card');
    const $payPalDiv = $('#paypal');
    const $bitCoinDiv = $('#bitcoin');
    const $paymentMenu = $('#payment');
    const otherTitle = $('#other-title');
    let conferenceCost = 0.0;

    //create elements
    const totalCostDiv = document.createElement('div');

    //set default state on page load
    $('#name').focus();
    $payPalDiv.hide();
    $bitCoinDiv.hide();
    otherTitle.hide();
    creditCardOption.prop('selected', true);




//job Role when other option is selected from Job Role Drop Down display field
    $('#title').change(() => {
        const title = ($('#title option:selected').text());
        console.log(title);
        if (title === 'Other') {
            otherTitle.show();
        }
    });

    //t-shirt section
    //hide color options until a a theme is selected from the t-shirt design menu
    let shirtSelected = false;
    designOptions();
    const designMenu = $('#design');

    const designOption = designMenu.change(() => {
            console.log($('#design option:selected').text());
            shirtSelected = $('#design option:selected').text();
            designOptions();
        }
    )

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
        if (e.target.checked){
            //if box checked disable boxes at same time and apply line through effect
            for(let i = 0; i < checkboxes.length; i++){
                let currentBox = checkboxes[i];
                //get the date time value of the checkbox in the loop
                let otherDateAndTime = checkboxes[i].getAttribute('data-day-and-time');
                if (selectedDateAndTime === otherDateAndTime && currentBox != e.target){
                    checkboxes[i].setAttribute('disabled', 'true');
                    currentBox.parentElement.style.textDecoration = 'line-through';
                }
            }
        }
        //remove disabled attr and styles if unchecked
        else {
            for(let i = 0; i < checkboxes.length; i++){
                let currentBox = checkboxes[i];
                //get the date time value of the checkbox in the loop
                let otherDateAndTime = checkboxes[i].getAttribute('data-day-and-time');
                if (selectedDateAndTime === otherDateAndTime && currentBox != e.target){
                    checkboxes[i].setAttribute('disabled', 'false');
                    currentBox.parentElement.style.textDecoration = 'none';
                }
            }
        }
    })
        /////Manage cost section
    //TODO complete this thing

    /*function createAmountField(){
        //append a total amount field if activities are selected
        if (amountFieldActive){
            return;
        }else {
            amountFieldActive = true;
           $activitiesSection.append(totalCostDiv).text('hello world');

        }
    }
     function handleCost() {


     }*/
    ///////////
    //Payment Info
    ////////
    $paymentMenu.change((e) =>{
        const paymentOption = e.target.value;
        console.log(paymentOption);
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
    })
//TODO validation error if one of the three payment types is not selected




})








