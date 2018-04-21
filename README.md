## Palindrome Check
For Shaw and Partners Full-stack test

## Requirements
This app requires:
* [NodeJS](https://nodejs.org)
* Express module (already included in the packages)

## Instructions
1. Clone this repository through `git clone https://github.com/joaopbernhardt/palindrome_check_nodejs`
1. Open your Command Line Interface in the folder and run `node index.js`
1. Access http://localhost:8081/
1. Type in the form to check words or sentences

## How it works
* The page has event listeners attached to the form, such as:
```javascript
// file frontend.html
var form = document.getElementById("id_form")
form.addEventListener('change', () => checkInputs());
```
        
* When any change is detected in the form, the input value is sent to the localhost server as POST:
```javascript  
// file frontend.html
            response = $.ajax({
                type: 'POST',
                url: "/verify_palindrome",
                timeout: 5000,
                cache: false,
                statusCode: {
                    200: () => update_value(true),
                    400: () => update_value(false)
                },
                error: e => in_result.value = 'Error connecting to API',
                success: update_value,
                data: {
                    'string': string
                }
            });
```
* The sent string is checked through this method:
```javascript
// file index.js
function isPalindrome(string) {
    // Checks if the string is palindrome.

    // Normalizes to lowercase & removes non-alphanumeric characters.
    string = string.toLowerCase();
    string = string.replace(/\W/g, '');

    let len = string.length;
    if (len==0) return false;

    // Outside-in checking of characters. 
    for (let i = 0; i < len; i++) {
        if (string[i] != string[len-1-i]) return false;
    };
    return true;
}
```
* If the received POST is in the proper format and the input word is palindrome, the servers returns 200. Returns 400 otherwise:
```javascript
// file index.js
isPalindrome(string) ? res.status(200) : res.status(400);
```
* The page's script asynchronously detects this response and changes the result value accordingly:
```javascript
// file frontend.html
function update_value(result) {
    in_result.value = result ? 'Yes, it is a palindrome.' : 'No palindrome.';
}
```
