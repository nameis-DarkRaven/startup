# Duck.io

## Specification Deliverable

### Elevator Pitch
It is a truth universally acknowledged that everything is either a duck or not a duck. Duck.io is a clicker game influenced by Cookie Clicker and based on the evolution of ducks. In addition to having a constant stream of dopamine, this game will be educational, providing information about the evolution of ducks and the behavior, appearance, etc. of existing species of ducks. Starting as a single cell, can you build up your army of ducks to dominate all of existence and rule the galaxy as Duck Supreme?

### Design
![Login Page](https://github.com/nameis-DarkRaven/startup/blob/main/Login%20Page.png?raw=true)
![Main Page](https://github.com/nameis-DarkRaven/startup/blob/main/Main%20Page.png?raw=true)
![Closed Upgrades Tab Page](https://github.com/nameis-DarkRaven/startup/blob/main/Closed%20Upgrades%20Tab.png?raw=true)

### Key Features
- Secure register/login over HTTPS
- Ability to add Ducks to currency by clicking the centralized duck picture
- Scrolling Quote Board with current duck status and a quote generated from a given list
- Ability to purchase buildings (x1, x10, x100, xMax.), upgrades, and potentially ascensions that increase the number of ducks generated per second
- Ability to view the help section, settings, and profile information (email and username), which allows you to log out
- Ability to close and reopen the upgrades tab for a better view of your duck
- Realtime update on how many ducks you have
- Progress is automatically saved and stored in the database

### Technologies
- **HTML** - Used to give a basic structure to the website as shown in the design images.
- **CSS** - Used to make the website adaptable to screen size, etc., and to help with website styling.
- **React** - Used to count ducks and generate the scrolling quotes/status along the bottom of the screen.
- **Javascript** - Used when a user clicks the duck to add more ducks, redeem upgrades, and access their profile, settings, and help information.
- **Web Service** - Used https://random-d.uk/api to randomize an image of a duck as the background for the login page. 
- **Database and Login** - Used to store users so that they can save and continue their game on any device.
- **WebSocket** - Used to save and store player data to a database automatically. 



## AWS Deliverable

Website: [duck-io](https://startup.duck-io.click/)

### Notes
- DNS grabs IP from Web server for you
- Domains are read from the right. Example: react.simon.cs260.click has the root domain cs260.click and the top-level domain .click. You buy domains as a root including a pair of sld and tld.
- Personal IP address is stored in LocalHost, and your computer already knows it without having to ask around.
- command to remote shell: ```ssh -i [pem doc] ubuntu@34.228.248.115``` or ```ssh -i [pem doc] ubuntu@duck-io.click```.

## HTML

### Notes

Turns out HTML has its own styling, albeit not much. However, style="" is very useful. I can use it to change the color of the background of something, its text, and more.
  
### Deliverable
- [x] HTML Pages - home page, clicker page, and about page with my elevator pitch
- [x] Links - there are links at the top of each page to each other page
- [x] Web API - When the page loads (including reloads), the background changes to a random duck picture
- [x] Images - There is a placeholder duck picture where the duck to be clicked is on the clicker page
- [x] DB/Login - one can log in and register
- [x] Websocket - There is a count placeholder on the duck clicker page
- [x] Text - there is text both on the about page and in each button for the upgrades and "duckielutions", which are currently placeholders.


## CSS

### Deliverable
- [x] HTML Pages - home page, clicker page, and about page with my elevator pitch; each page has similar coloring but unique body layouts
- [x] Links - there are links at the top of each page to each other page, formatted the same for easy use
- [x] Web API - When the page loads (including reloads), the background changes to a random duck picture
- [x] Images - There is a picture of the eyes of a duck, meant to be a "single-celled duck" to be clikced on the clicker page
- [x] DB/Login - login and register buttons have decent formatting with placeholder text to guide the user
- [x] Websocket - There is a count placeholder on the duck clicker page, which has been formatted to stand out
- [x] Text - There is a scrolling text bar at the bottom of the clicker page.
- [x] Buttons - the buttons that are to be clicked bounce when they are clicked



### Notes
- [MDN](https://developer.mozilla.org/en-US/) is used for HTML, CSS, and JavaScript documentation.
- CSS is formatted as follows:
  
  ![CSS Format](https://github.com/webprogramming260/.github/blob/main/profile/css/introduction/cssDefinitions.jpg)
- p for paragaphs is an example of an element selector; there are also ids and classes, which are custom selectors
- you can also combine them into element classes; example:
  ```
  p.highlight = any p item with class="highlight"
  ```
- other selectors:
  * list - affects a given list of selectors
  * Descendant - a list of descendants such as body sections, which affects any section that is a descendant of a body
  * Child - similar to descendant that affects any p that is a direct child of a section with example section > p
  * Pseudo - state based; example: p:hover, affects p items when mouse is hovering over them
- Keyframes:
  * from {start} next item {next item} to {end}

- ChatGBT does wonders for helping you get a css foundation. It won't get you exactly what you want, but it can help you figure out what to use for what you want.


## React Part 1 - Transferring to React
No javascript has been implemented yet.
### Deliverable
Little interaction changed. Changes are noted below.
- [x] HTML Pages - home page, clicker page, and about page with my elevator pitch; each page is now linked to only its css file and jsx file
- [x] Links - there are links at the top of each page to the other pages through NavLink
- [x] Web API - When the page loads (including reloads), the background changes to a random duck picture
- [x] Images - There is a picture of the eyes of a duck, meant to be a "single-celled duck" to be clicked on the clicker page
- [x] DB/Login - login and register buttons redirect user to click page through NavLink
- [x] Websocket - There is a count placeholder on the duck clicker page
- [x] Text - There is a scrolling text bar at the bottom of the clicker page.
- [x] Buttons - the buttons that are to be clicked bounce when they are clicked


## React Part 2 - JavaScript

### Notes 
- print = console.log(insert string or function here)
- JS is dynamacally typed, meaning that if you are doing concatenation with strings and decide to add a number, it will turn that int into a string and concatenate it.
- const: variable is always pointing to its assigned object; arrays can be manipulated, but if the var is a string, that string cannot change
- some syntax: words.forEach(word) => console.log(word); words is an array; this is a lambda function
- useState can be used for reactive components, such as buttons or images that change
- useEffect can be used for interval or lifecycle related components, such as numbers that increase over time

### Deliveralbe
Changes from this deliverable:
- [x] UseState: "Click me" button (the duck evolution picture) now adds ducks to your duck count and gives off a +clicks animation when you click it.
- [x] UseState: You can now buy upgrades that you have sufficient ducks for. These increase the ducks per click.
- [x] UseState: You can now buy duckielutions that you have suffient ducks for. You can buy infinitely many of each of these.
- [x] UseEffect: Owned duckielutions increase your passively earned ducks per second.
- [x] Javascript: allows upgrades and duckielutions tab to open and close.
- [x] Javascript: populates attributions based on list of attributions.
- [x] Javascript: using useState, populates the correct image for the duck evolution picture depending on which duckielution you have achieved.
- [x] Login: can enter credentials to access duck clicker.

