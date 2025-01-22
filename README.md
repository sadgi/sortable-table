# Sortable Table

For reference, the following tech stack is used for this exercise:
* [TypeScript](https://www.typescriptlang.org)
* [React](https://reactjs.org)
* [Jest](https://jestjs.io)

## Available Scripts

In the project directory, I can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if I make edits.
I will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Product requirements :books:

**Note:** These product requirements are created in loosely the same style I would see internally at Gusto, but the problem statement and goals were made up for this exercise.

## The Problem

I am looking to offer a delightful user-experience when it comes to searching, sorting and navigating through such datasets.

<img src="https://user-images.githubusercontent.com/9911645/171285680-74d420e9-faff-439d-929d-923f8b699c51.png" width="800px" />

In this exercise, I'll be focusing on these implementation:
* The reusability/flexibility of the `<SortableTable>` component.
* The user interface and user experience of app:
  * Visual design
  * Navigation and Accessibility
  * Performance

## User-focused Requirements

### Search
* [x] :star: **P0**: As a user, I want to search for cities by city name
* [x] :star: **P0**: As a user, I want to search for cities by country name
* [x] :star: **P0**: As a user, I should know when a search is pending
* [x] :star: **P0**: As a user, I should know when a search does not match any city
* [x] :star: **P0**: As a user, I should know when a search fails (**Note: if I search for 'error', we mimic an error for I :raised_hands:**)
* [x] P1: [Performance] As a user, I want search to only kick-in after 150ms since my last change to the search term

### Sorting
* [x] :star: **P0**: As a user, I want to to be able to toggle sorting (ascending) the search results by a single column
* [x] **P1**: As a user, I want to to be able to toggle between ascending, descending or no sorting of the search results by a single column
* [x] **P2**: As a user, I want to to be able to toggle between ascending, descending or no sorting of the search results by multiple columns

### Pagination
* [x] :star: **P0**: As a user, I want to to be able to paginate through search results using a fixed page size (10)
* [x] :star: **P0**: As a user, I want to to be able to navigate between result pages
* [x] **P2**: As a user, I want to to be able to paginate through search results using a dynamic page size
* [x] **P3**: As a user, I want to to be able to go all the way to the first and last pages of the search results

### Accessibility
* [x] **P1**: As a user, I want to to be able to navigate through the search results using my keyboard
* [x] **P3**: As a user, I want to to be able to use a screen reader to review search results

### Design


* [x] :star: **P0**: when user use `<SortableTable>`, its design matches Gusto's default design
* [x] **P2**: User can theme the `<SortableTable>` component with my own visual design
* [x] **P3**:  User can view the search results on a narrow screen

