CREATE TABLE IF NOT EXISTS 
products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    imageUrl VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category_id INTEGER,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (category_id) references categories
)

CREATE TABLE IF NOT EXISTS 
reviews(
    id SERIAL PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    rate INTEGER NOT NULL,
    user_id INTEGER,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) references products,
    FOREIGN KEY (user_id) references users
)

CREATE TABLE IF NOT EXISTS 
carts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) references products,
    FOREIGN KEY (user_id) references users
)

CREATE TABLE IF NOT EXISTS 
users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL
)

CREATE TABLE IF NOT EXISTS 
categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)