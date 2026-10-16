-- 1. CREATE TABLES
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL,
    description TEXT
);

-- Join table for the many-to-many relationship
CREATE TABLE enrolments (
    student_id INTEGER,
    course_id INTEGER,
    grade TEXT,
    -- This composite primary key prevents a student enrolling in the same course twice
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- 2. INSERT SAMPLE DATA
INSERT INTO students (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('Diana Prince', 'diana@example.com'); -- Extra student for the "no enrolments" query

INSERT INTO courses (course_name, description) VALUES
('Web Foundations', 'Intro to HTML, CSS, JS'),
('Database Design', 'Intro to SQL and NoSQL'),
('System Design', 'Scaling applications');

INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B'),
(2, 1, 'A'),
(2, 3, 'C'),
(3, 2, 'B');

-- 3. QUERIES

-- Query 1: All courses for one student (by name)
SELECT courses.course_name, enrolments.grade
FROM courses
JOIN enrolments ON courses.course_id = enrolments.course_id
JOIN students ON enrolments.student_id = students.student_id
WHERE students.name = 'Alice Johnson';

-- Query 2: All students on one course
SELECT students.name, students.email
FROM students
JOIN enrolments ON students.student_id = enrolments.student_id
JOIN courses ON enrolments.course_id = courses.course_id
WHERE courses.course_name = 'Web Foundations';

-- Query 3: The number of students per course
SELECT courses.course_name, COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments ON courses.course_id = enrolments.course_id
GROUP BY courses.course_id;

-- Query 4: Students who have no enrolments
SELECT students.name
FROM students
LEFT JOIN enrolments ON students.student_id = enrolments.student_id
WHERE enrolments.course_id IS NULL;

-- Query 5: Update one enrolment's grade
UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 1 AND course_id = 2;