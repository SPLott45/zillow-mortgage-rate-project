/*----- constants -----*/

const $streetNumInput = $('#streetNumInput');
const $streetNameInput = $('#streetNameInput');
const $cityInput = $('#cityInput');
const $stateInput = $('#stateInput');
const $zipCodeInput = $('#zipCodeInput');

const $formatted_street_address = $('#formatted_street_address');
const $city = $('#city');
const $state = $('#state');
const $zip_code = $('#zip_code');

const $value = $('#value');
const $date = $('#date');
const $high = $('#high');
const $low = $('#low');

/*----- app's state (variables) -----*/

    //Tell us a little about yourself//
    let firstName;
    let lastName;

    //Tell us about the property//
    let streetNumUserInput = $streetNumInput;
    let streetNameUserInput = $streetNameInput;
    let cityUserInput = $cityInput;
    let stateUserInput = $stateInput;
    let zipCodeUserInput = $zipCodeInput;


    //Here's your Property Valuation Report//
    let  propertyValReport; 

    //Property Value Data
    let propertyValData;
/*----- cached element references -----*/
/*----- event listeners -----*/
console.log("Line 41");
$('form').on('submit', getPropertyValReport)

function getPropertyValReport(event) {
    event.preventDefault();
    console.log("checking function Line 46");
    // if($streetNumUserInput.val() === "") return;
    // if($streetNameUserInput.val() === "") return;
    // if($cityUserInput.val() === "") return;
    // if($stateUserInput.val() === "") return;
    // if($zipCodeUserInput.val() === "") return;

    streetNumUserInput = $streetNumInput.val();
    streetNameUserInput = $streetNameInput.val();
    cityUserInput = $cityInput.val();
    stateUserInput = $stateInput.val();
    zipCodeUserInput = $zipCodeInput.val();

    let combinedAddress = `${streetNumUserInput + streetNameUserInput},${cityUserInput},${stateUserInput}&${zipCodeUserInput}`;

    // //clear the input after user submits form
    // streetNumUserInput = $streetNumInput.val("");
    // streetNameUserInput = $streetNameInput.val("");
    // cityUserInput = $cityInput.val("");
    // stateUserInput = $stateInput.val("");
    // zipCodeUserInput = $zipCodeInput.val("");


/*----- functions -----*/
    console.log("Line 68");
//API Call
    $.ajax({
        url: 'https://apis.estated.com/v4/property?token=cl1dkUgroRVoeSNImtkectbz1rdtQh&combined_address=' + combinedAddress
    }).then(function(data) {
        console.log(data);
        propertyValData = data;
        render ();

    }, function(error) {
        console.log(error)
});
}
 
function render() {
    console.log($city.html(propertyValData.data.address.city))
    $formatted_street_address.html(propertyValData.data.address.formatted_street_address);
    $city.html(propertyValData.data.address.city);
    $state.html(propertyValData.data.address.state);
    $zip_code.html(propertyValData.data.address.zip_code);
    $value.html(propertyValData.data.valuation.value);
    $date.html(propertyValData.data.valuation.date);
    $high.html(propertyValData.data.valuation.high);
    $low.html(propertyValData.data.valuation.low);
}