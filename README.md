# Project Name : ironCohort

## Description

A space for friends(as long as you are part of the ironhack cohort) to gather socially and through business. 
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **sign up/login** - As a user I want to sign up or log in on the webpage so that I can see all the events that I could attend
- **homepage** - As a user I want to be able to access the homepage so that I see what the activities are going on
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **career tab** - As a user I want to see all the jobs available so that I can choose which ones I want to aplppy to
- **gather tab** - As a user I want to create an event so that I can invite others to attend
- **gather detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **about tab** - I am or other user are able to see my basic info and as a user I want to check my profile information and be able to edit it, and add new info. Also, to go back to the home page if I don't want to see the profile anymore.
- **photo tab** - As a user I am able to see my photo gallery
- **cohort tab** - As a user I am able to see my cohorts

## Backlog

List of other features outside of the MVPs scope

Messages:
- cohorts are able to chat

User profile:
- upload cover photo
- see other users profile
- list events the user is attending

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Post:
- user able to add emoji

Date:
- show date of post



## ROUTES:

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - email
    - password

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password

- POST /auth/logout
  - redirects to / if user logged in

- GET /homepage
  - renders the homepage

- POST /homepage
  - user's post
  - body: 
    - name
    - photo
    - date
    - description

- GET /profile
  - renders user-profile.hbs
  - redirects to / if user presses button

- POST /profile 

  - profile picture
  - litte info of the user
  
  sub nav bar:
  about;
  cohort;
  photo;

- Get /profile/about
render user-about.hbs
  body:
  name;
  work;
  education;


- Get /profile/photo
  - render user-gallery.hbs
  
- Post /profile/photo
  - user will be to upload photos

- Get /profile/cohort
  - render user-cohort.hbs


- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
email: String
password: String, Number
```

Post model

```
owner: ObjectId<User>
description: String
date: Date 
location: String (maybe)

``` 

## Links

to be confirmed

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

to be confirmed

### Slides

The url to your presentation slides

to be confirmed

