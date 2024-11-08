SQl Query
create database OnlineFoodOrderingApp;

use OnlineFoodOrderingApp;
CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    salary DECIMAL(10, 2),
    date_of_joining DATE,
    phone_no VARCHAR(15),
    state VARCHAR(50),
    district VARCHAR(50),
    locality VARCHAR(100)
);
CREATE TABLE Helper (
    helper_id INT PRIMARY KEY,
    emp_id INT,
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);
CREATE TABLE Baker (
    baker_id INT PRIMARY KEY,
    emp_id INT,
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);
CREATE TABLE Manager (
    manager_id INT PRIMARY KEY,
    emp_id INT,
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone_no VARCHAR(15),
    balance DECIMAL(10, 2)
);
CREATE TABLE Menu (
    item_id INT PRIMARY KEY,
    item_name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    availability BOOLEAN
);

CREATE TABLE Orders (
    order_no INT PRIMARY KEY,
    student_id INT,
    item_id INT,               
    total_amount DECIMAL(10, 2),
    order_time TIME,
    order_date DATE,
    order_status VARCHAR(20),
    manager_id INT,
    baker_id INT,
    helper_id INT,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (item_id) REFERENCES Menu(item_id),  -- Foreign key reference to Menu table
    FOREIGN KEY (manager_id) REFERENCES Manager(manager_id),
    FOREIGN KEY (baker_id) REFERENCES Baker(baker_id),
    FOREIGN KEY (helper_id) REFERENCES Helper(helper_id)
);

CREATE TABLE Review (
    review_id INT PRIMARY KEY,
    past_order_no INT,
    review_text TEXT,
    rating INT,
    review_time TIME,
    review_date DATE,
    FOREIGN KEY (past_order_no) REFERENCES Orders(order_no)
);
