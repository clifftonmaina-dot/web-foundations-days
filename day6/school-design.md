# School Database Design

## Table Explanations
*   **students**: Stores individual student details including their unique ID, name, and email address.
*   **courses**: Stores available courses including a unique ID, course name, and a brief description.
*   **enrolments**: A join table that records which students are taking which courses, alongside the grade they achieved. 

## Relationships
*   **One-to-Many**: A single student can have many enrolments. A single course can also have many enrolments.
*   **Many-to-Many**: Students and courses share a many-to-many relationship (one student takes multiple courses, and one course has multiple students). A join table (`enrolments`) is needed to break this down into two manageable one-to-many relationships so the database can store the links efficiently and hold extra link-specific data, like the student's grade.

## Indexing
I would add an index on the `students.email` column. Because student emails must be completely unique and are likely used as login credentials, the database will need to search this column constantly. An index will make looking up a student by their email significantly faster as the school grows.

## SQL vs NoSQL
For a school management system, I would definitely choose a **SQL (Relational)** database. School data is highly structured and relies on strict relationships (a student must exist to be enrolled; a course must exist to be taught). SQL provides ACID compliance, ensuring that transactions like updating grades or managing enrollments remain consistent and reliable, preventing issues like duplicate enrollments or orphaned data.