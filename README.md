# Assignment 1

## Description: Chat app for assignment 1 3813ICT 2023

# Chat Application Interaction Overview

This section provides an overview of the interaction between the client and server in the Chat Application. It outlines how data on the server side is changed and how the display of each Angular component page is updated.

## User Registration and Login

### Server Side Changes

1. When a user registers or logs in, the client sends a request to the server.
2. The server verifies the user's credentials and sends a response indicating success or failure.
3. If successful, the server generates a unique ID for the user and adds them to the `usersData` array.
4. The updated `usersData` is then saved to the data file.

### Display Update

1. If registration or login is successful, the user is redirected to the main application page.
2. The user's information may be displayed in the UI (e.g., username, role).

## Group Creation

### Server Side Changes

1. When a user creates a new group, the client sends a request to the server.
2. The server verifies the group name's availability and sends a response indicating success or failure.
3. If successful, the server generates a unique ID for the group and adds it to the `groupsData` array.
4. The updated `groupsData` is then saved to the data file.

### Display Update

1. If group creation is successful, the new group may be added to the list of available groups in the UI.

## Adding Users to a Group

### Server Side Changes

1. When a user adds members to a group, the client sends a request to the server.
2. The server verifies the group ID and the availability of the selected users.
3. If successful, the server updates the `members` property of the respective group in `groupsData`.

### Display Update

1. If user addition is successful, the UI may update to reflect the changes in the group's member list.

## Channel Creation (to be implemented)

### Server Side Changes

1. When a user creates a new channel within a group, the client sends a request to the server.
2. The server verifies the channel name's availability and sends a response indicating success or failure.
3. If successful, the server adds the new channel to the `channels` property of the respective group in `groupsData`.

### Display Update

1. If channel creation is successful, the new channel may be displayed in the list of channels for that group.

## Displaying User Lists

### Server Side Changes

1. When a user requests the list of users or groups, the client sends a request to the server.
2. The server retrieves the relevant data from `usersData` or `groupsData`.

### Display Update

1. The received data is used to update the UI, displaying the list of users or groups.

These interactions facilitate the smooth functioning of the Chat Application, ensuring that data is accurately managed on the server side and displayed appropriately in the Angular component pages.

# Organisation of Git Repository

## Git Approach

The approach I took to building this project was to use a github repository. Since I was the only one working on the project it didnt seem necessary or as time effective to create branches for seperate parts of the applicaiton. Instead I frequently commited after each implmentation of a new feature. If I wished to go back and correct a mistake for example, I could use git's commit history to go back and fix errors without loosing all of my progress

## Version Control Approach

- Git was used for version control throughout the project.
- Branches were utilized to separate development tasks and features. The `main` branch was kept stable for production-ready code.
- When a feature or task was complete, a pull request was created for review before merging it into the `main` branch.
- Commit messages were written in a descriptive manner to provide context about the changes made.
- Tags were used for versioning milestones or releases.

This approach ensures a structured and organized version control history, making it easier to track changes, collaborate, and manage the project's development lifecycle.

# Chat Application API Routes

This section outlines the REST API routes provided by the Node.js server for communication with the Angular front end. It describes each route, its parameters, return values, and the functionality it performs.

## 1. User Registration

- **Route:** `/register`
- **Method:** POST
- **Parameters:**
  - `username` (string): The username chosen by the user during registration.
  - `password` (string): The chosen password for the user account.
- **Return Value:**
  - If successful, returns a JSON object with the user's information.
  - If unsuccessful (e.g., username already taken), returns an error message.

## 2. User Login

- **Route:** `/login`
- **Method:** POST
- **Parameters:**
  - `username` (string): The username provided by the user during login.
  - `password` (string): The user's password for authentication.
- **Return Value:**
  - If successful, returns a JSON object with the user's information.
  - If unsuccessful (e.g., incorrect username or password), returns an error message.

## 3. Get List of Users

- **Route:** `/get-users`
- **Method:** GET
- **Parameters:** None
- **Return Value:** Returns an array of user objects with their details (e.g., username, role).

## 4. Create New Group

- **Route:** `/create-group`
- **Method:** POST
- **Parameters:**
  - `name` (string): The name of the group to be created.
  - `members` (array): An array of usernames representing the initial members of the group.
  - `channels` (array): An array of channel names within the group.
  - `admins` (array): An array of usernames representing the group administrators.
- **Return Value:**
  - If successful, returns a JSON object with the created group's information.
  - If unsuccessful (e.g., group name already taken), returns an error message.

## 5. Add Members to Group

- **Route:** `/add-members/:groupId`
- **Method:** POST
- **Parameters:**
  - `groupId` (string): The unique ID of the group to which members will be added.
- **Return Value:**
  - If successful, returns a JSON object with the updated group's information, including the added members.
  - If unsuccessful (e.g., group not found), returns an error message.

## 6. Get List of Groups

- **Route:** `/get-groups`
- **Method:** GET
- **Parameters:** None
- **Return Value:** Returns an array of group objects with their details (e.g., name, members, channels).

## 7. Create New Channel in Group

- **Route:** `/create-channel/:groupId`
- **Method:** POST
- **Parameters:**
  - `groupId` (string): The unique ID of the group in which the channel will be created.
  - `channelName` (string): The name of the new channel.
- **Return Value:**
  - If successful, returns a JSON object with the updated group's information, including the new channel.
  - If unsuccessful (e.g., channel name already taken), returns an error message.

## 8. Get List of Channels in Group

- **Route:** `/get-channels/:groupId`
- **Method:** GET
- **Parameters:**
  - `groupId` (string): The unique ID of the group for which channel information is requested.
- **Return Value:** Returns an array of channel names within the specified group.

These routes facilitate the communication between the Angular front end and the Node.js server, enabling various operations such as user registration, group creation, adding members, and more.

# Chat Application Data Structures

This Chat Application utilises two main data structures to manage users and groups effectively:

## 1. usersData

### Purpose

`usersData` serves as a repository for storing information about individual users in the system. It allows the program to keep track of various attributes associated with each user, such as their unique `id`, `name`, and `role`.

### Representation

Each user is represented as an object, where the object's properties correspond to different attributes of the user (e.g., `id`, `name`, `role`). These objects are stored in an array, allowing for efficient iteration and retrieval of user data.

### Usage

`usersData` is used for tasks like authentication, where the program needs to verify user credentials and determine their role in the system.

## 2. groupsData

### Purpose

`groupsData` serves as a central data structure for managing groups within the application. It enables the program to organize users into specific groups, define group-specific channels, and designate administrators.

### Representation

Similar to `usersData`, each group is represented as an object. The group object contains properties like `id`, `name`, `members`, `channels`, and `admins` to capture the group's characteristics.

### Usage

`groupsData` is crucial for functionalities related to group management. This includes creating new groups, adding members, and specifying administrators for a particular group.

These data structures are foundational to the program's functionality. They facilitate the organization, management, and retrieval of information about users and groups. By leveraging these data structures, the program can perform a wide range of operations, ensuring effective user and group management in the application.

# Angular Application Architecture

This section outlines the architectural components of the Angular application, including components and services.

## Components

### 1. User Login Component

- **Description:** Handles user login functionality.
- **Functionality:** Allows users to log in by entering their username and password.

### 2. Group Management Component

- **Description:** Manages the creation of groups, addition of members, and channel creation.
- **Functionality:** Allows users to create groups, add members to groups, and create channels within groups.

### 3. User Management Component

- **Description:** Exclusive to SuperAdmins, this component is responsible for creating and removing users.
- **Functionality:** SuperAdmins can create new users and remove existing ones.

## Services

### 1. Auth Service

- **Description:** Handles user authentication and authorization.
- **Functionality:** Provides methods for user login and logout.

### 2. Group Service

- **Description:** Manages group-related operations.
- **Functionality:** Provides methods for creating groups, adding members to groups, creating channels, and retrieving group information.

### 3. User Service

- **Description:** Manages user-related operations.
- **Functionality:** Provides methods for creating and removing users.

## Interaction Overview

- The User Login component interacts with the Auth Service for user authentication.
- The Group Management component interacts with the Group Service for creating groups, adding members, and creating channels.
- The User Management component interacts with the User Service for creating and removing users.

This architecture separates concerns effectively, allowing for modular development and easy maintenance. Components handle UI interactions, services manage data and business logic, and services represent the structure of data entities.
