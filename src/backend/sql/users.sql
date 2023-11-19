CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    type VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (first_name, last_name, type, email, password)
VALUES
  ('John', 'Doe', 'Regular', 'john.doe@example.com', 'hashed_password_1'),
  ('Jane', 'Smith', 'Admin', 'jane.smith@example.com', 'hashed_password_2'),
  ('Bob', 'Johnson', 'Regular', 'bob.johnson@example.com', 'hashed_password_3');
