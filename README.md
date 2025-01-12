# Duck.io

## Specification Deliverable

### Elevator Pitch
It is a truth universally acknowledged that everything in the world is either a duck or not a duck. Duck.io is a clicker game influenced by Cookie Clicker and based on the evolution of ducks. In addition to having a constant stream of dopamine, this game will be educational, providing information about the evolution of ducks and the behavior, appearance, etc. of existing species of ducks. Starting as a single cell, you eventually make your way with your army of ducks to dominate all of existence as Duck Supreme!

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
