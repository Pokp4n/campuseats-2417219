# Week 1 Reflection

## 1. What is the difference between imperative and declarative UI?

Imperative UI basically tells that the program step by step how to change the interface, while declarative UI describes what the interface should look like. So, react uses declarative UI because we want to describe the UI using components and JSX.

## 2. Why must a React component name start with a capital letter?

A React component must start with a capital letter because React want to tell the difference between our own component and a normal HTML element. For example, <Header /> is a React component while <header> is an HTML element.

## 3. What is the purpose of a Fragment compared with a div?

A Fragment basically lets us to group a multiple elements without adding any extra HTML element to the page. While a div also groups elements, but it will add an actual <div> to the HTML.

## 4. What is the benefit of splitting the UI into small components?

The benefit of spilitting the UI into small components because it can make the code easier to understand, manage, and reuse. Other than that, it is also easier to update one part of the UI without changing the whole application.

# Week 6 Reflection

## 1. What happens when we click Place Order until the order appears on the Orders page?

When we try to click a Place Order, `handlePlaceOrder()` will call `placeOrders()` to save the order into the Firestore. Next, the function groups the cart items by vendor and also uses `writeBatch()` to save the orders together. After the order is saved successfully, the cart is cleared and we are redirected to the Orders page. Then, `useMyOrders()` will call `subscribeToMyOrders()` to get the orders using `onSnapshot()`. We don't need to call the `setOrders()` manually after checkout because the Firestore listener automatically updates the order list.

## 2. Why is orders a top-level collection, and why do we copy vendor and item details?

This is beacuse we use a top-level `orders` collection so we can easily get all orders belonging to a student, and even from different vendors. Moreover, each order has a `studentUid` to identify who will placed it. So, we also save the vendor name and item details directly inside the order because the Firestore does not support SQL JOINs. This will makes it easier for us to display the orders without getting the details from other collections. It also will keep the original item prices even if the vendor changes them later.

## 3. Where is our Recently Viewed feature stored in Firestore, and how do we read it?

Our Recently Viewed feature is basically will stores data in `recent/{uid}`, where `uid` is the logged-in user's Firebase ID. Each document has an `items` array that are containing the item and also it has vendor details. Then, the `recordRecent()` function will saves the latest five items using a transaction. Moreover, if we want to read the data, `subscribeToRecent()` will use `onSnapshot()`, with the line code `snapshot.data().items` to make sure it get the saved history. Lastly, this will allow our Recently Viewed list to always keep automatic update and show the same history in different browsers.

```javascript
const items = snapshot.exists() ? snapshot.data().items : [];
```
