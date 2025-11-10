<!-- Taskley -->

Taskley is a simple Task Management App built with HTML, CSS, and JavaScript.

<!-- The features -->

add tasks with:

1. Task name
2. Category
3. Deadline
4. Initial status
5. View all tasks in a table
6. update all tasks in a table
7. update the status of each task using a dropdown
8. Automatically mark tasks as "Overdue" when the current date is past the deadline (and the task is not completed)
9. Filter tasks by status or category 
10. Save tasks using 'localstorage' so they stay after refreshing the page

<!-- How to Run the app -->

- open web page
- Add a task on form
- Use the filters to view tasks by status or category 
- refresh the page to see your tasks are saved


<!-- README  -->

In this project, I created a simple task management app using HTML, CSS, and JavaScript. One of the hardest parts was making sure the tasks on the page always matched what was actually saved. I fixed this by storing all the tasks in one array and using a renderTasks() function to update the display every time something changed.
Another challenge was figuring out how to automatically mark tasks as overdue. I compared each task’s deadline to the current date, and if it was past due and not completed, I updated its status to “Overdue.” I also had to learn how to properly use localStorage and JSON so the tasks would stay after refreshing.