# Week 1 Reflection

## 1. What is the difference between imperative and declarative UI?

Imperative UI focuses on telling the program step by step how to update the interface. Declarative UI focuses on describing what the interface should look like based on the current data. React uses the declarative approach because we write the UI using components and JSX, and React handles the changes to the page.

## 2. Why must a React component name start with a capital letter?

A React component name starts with a capital letter so React can differentiate between our own components and normal HTML elements. For example, <Header /> refers to a React component that we created, while <header> refers to a normal HTML element.

## 3. What is the purpose of a Fragment compared with a div?

A Fragment allows us to group multiple JSX elements together without adding an extra HTML element to the webpage. A div also groups elements, but it creates an actual <div> element in the HTML. In our App component, we use a Fragment <>...</> to group the Header, main content, and Footer without adding an unnecessary div.

## 4. What is the benefit of splitting the UI into small components?

Splitting the UI into small components makes the code easier to understand, manage, and reuse. Each component has its own responsibility. For example, Header handles the navigation, VendorCard displays vendor information, MenuItemCard displays food information, and Footer displays the footer content. If we need to make changes later, we can update a specific component without changing the whole application.
