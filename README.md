# its-framework

its-framework is a lightweight script that manages state and events for elements. 
It's heavily inspired by flux and modular pattern design.

its-framework encourages a centralized approach in a modular environment. The global state and event manager unifies just enough to keep the complex operations of a team environment in a centralized location.
The core organizing principle is to delegate all events and capture a view and state relationship between elements. By adding its-control or its-view attributes its-framework will keep an ongoing capture/update process on all corresponding elements. its-framework caching structure does not include a virtual DOM but is optimized with efficient array access queries after an initial document scan.
