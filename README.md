### Objective

You have a summer job lined up in Las Vegas! Unfortunately, COVID-19 has forced the closure of the casinos in 2020. Your boss requests that you create a full-stack app that is a straightforward slot machine game with a slight twist in order to bring some of the company's operations online. Build it so the home always prevails!

### Brief
A player is given ten credits at the beginning of a game or session.
It takes one credit to pull the lever on the machine (roll the slots).
One row with three blocks appears on the gaming screen.
When rolling, players must land on the same symbol in every block in order to win.
A cherry (10 credits reward), a lemon (20 credits reward), an orange (30 credits reward), and a watermelon (40 credits reward) are the four available emblems.
It is necessary for the server to maintain the game (session) state.
However, the house has a point about that, so even if the player keeps winning, they can't keep playing forever.
A twist is also there in the CASH OUT button, which is present on the screen.

### Tasks
- To complete the assignment, use Node.js for the backend and Vue.js for the frontend.
-   It is advised to employ frameworks, and we propose that you use NuxtJs for the front end and NestJs for the back end. If it slows you down or you don't have any experience with these frameworks, it is **optional**. 
-   A session is started on the server when a user starts the app, and they begin with 10 credits.

-   **Server-side:**

    - A player's rolls are genuinely random when they have fewer than 40 credits left in the gaming session.
    -   The server starts to somewhat cheat if a user has between 40 and 60 credits:
        Before relaying a successful roll to the client, the server does a 30% chance roll to determine whether to reroll that round.
        If the result of that roll is true, the server rerolls and relays the updated outcome.
    -   The server still behaves in the same way if the user has more than 60 credits, however in this situation, the likelihood of the round being rerolled rises to 60%.
        If the result of that roll is true, the server rerolls and relays the updated outcome.
    - A cash-out endpoint is available for moving credits from the

-   **Client side:**
    - Include a very basic, minimalist table with three blocks arranged in a row.
    - Include a game-starting button next to the table.
    - The first letter of each sign's component (C for cherry, L for lemon, O for orange, and W for watermelon) can serve as the symbol.
    - All blocks should spin (perhaps with the character "X" spinning) after sending a roll request to the server.
    - The first sign should spin for an additional second after getting a response from the server before displaying the outcome. The second sign should then be displayed at 2 seconds, followed by the third sign at 3 seconds.
    - If the user wins the round, the amount from the server answer is added to their session credit; otherwise, it is subtracted by 1.
    - Add a button that reads "CASH OUT" to the screen, but when the user hovers over it, there is a 40% chance that it will become unclickable and a 50% chance that it will move 300 pixels in a random direction (this roll should be done on the client-side). If they successfully reach it, session credits are added to their account.

### Evaluation Criteria

    - Completion: Did you finish the features as instructed?
    - Correctness: Does the solution work in a logical, planned manner?
    - Maintainability: Has the code been written in an organized, readable manner?
    - Readability: Does the codebase have comments that clarify difficult code areas, or is it easily understandable?

### CodeSubmit

As though it were going into production, please plan, design, and document your code. After that, submit your updates to the master branch. You may submit the task on the assignment page once you've pushed your code.

Best wishes and good programming,