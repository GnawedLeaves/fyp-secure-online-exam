CREATE TABLE testtable (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    email VARCHAR(255)
);

INSERT INTO testtable (name, age, email) VALUES
('John Doe', 25, 'john.doe@example.com'),
('Jane Smith', 30, 'jane.smith@example.com'),
('Bob Johnson', 22, 'bob.johnson@example.com');
