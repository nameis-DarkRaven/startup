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
- Scrolling Quote Board with current duck status and a random quote generated from a given list
- Ability to purchase buildings (x1, x10, x100, etc.), upgrades, and possibly ascensions (not yet decided) that increase the number of ducks generated per second
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

## HTML & CSS Deliverable

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
  



