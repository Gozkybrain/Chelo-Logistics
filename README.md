# FlyMe Documentation: Flight Booking System with Tracking

## Technologies Used
* React: JS Library and Framework for interface.
* Firebase: 
    * Firebase Authentication: Used for user authentication.
    * Firestore: A NoSQL database to store ticket details.
* React Router: A library for routing in React applications.
* CSS: For styling the application components.
* HTML2Canvas and JSpdf: A Package to handle saving the receipt to PDF.

## Aims and Objectives

### Aims
The primary aim of this project is to create a simple and efficient flight booking system with package tracking capabilities. The system allows users to add new shipments, book flight tickets, and track shipments using a unique tracking number with an interactive map.

### Objectives
* User Authentication: Ensure that only authenticated users can add new shipments and book flight tickets.
* Shipment Tracking: Allow users to track their shipments using a unique tracking number and visualize the route on an interactive map.
* Flight Ticket Booking: Enable users to book flight tickets and manage their bookings.
* Data Storage: Store shipment and ticket details securely in Firestore.
* User-Friendly Interface: Provide an intuitive and easy-to-use interface for users to interact with the system.
* Interactive Map: Display the shipment's route and current location on a map for real-time tracking.

## Functionalities
### 1. Package Tracking
* Tracking Number: Each shipment is assigned a unique tracking number for easy tracking.
* Real-Time Tracking: Users can track the status of their shipments in real-time.
* Route Visualization: The shipment's route is displayed on an interactive map, showing key locations such as origin, destination, and current location.
* Status Updates: Users can see the current status of their shipment (e.g., In Transit, Delivered).

### 2. Interactive Map
* Map Integration: The system uses OpenLayers to display an interactive map for tracking shipments.
* Route Display: The map shows the shipment's route, including all intermediate locations.
* Current Location: The shipment's current location is highlighted on the map with a blinking marker.
* Zoom and Pan: Users can zoom in/out and pan across the map for a detailed view.

### 3. Flight Booking
* Ticket Booking: Users can book flight tickets and receive a confirmation with a unique booking ID.
* Ticket Management: Users can view, edit, or cancel their flight bookings.
* Receipt Generation: Users can download their booking receipt as a PDF.

### 4. User Authentication
* Login/Signup: Users can create an account or log in to access the system.
* Protected Routes: Only authenticated users can access the create booking and create tracking features.