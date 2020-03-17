DROP TABLE IF EXISTS RestaurantStaffs;
CREATE TABLE RestaurantStaffs (
    username VARCHAR(64) PRIMARY KEY --REFERENCES Users ON DELETE CASCADE
);

DROP TABLE IF EXISTS Restaurants;
CREATE TABLE Restaurants (
    rname VARCHAR(64) PRIMARY KEY,
    minSpending FLOAT
);

DROP TABLE IF EXISTS WorksAt;
CREATE TABLE WorksAt (
    username VARCHAR(64) REFERENCES RestaurantStaffs,
    rname VARCHAR(64) REFERENCES Restaurants,
    PRIMARY KEY (username, rname)
);

DROP TABLE IF EXISTS Promotions;
CREATE TABLE Promotions (
    promoId SERIAL, 
    rname VARCHAR(64) REFERENCES Restaurants ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    discount NUMERIC(2,2),
    PRIMARY KEY (promoId, rname)
);

DROP TABLE IF EXISTS FoodCategories;
CREATE TABLE FoodCategories (
    category VARCHAR(64) PRIMARY KEY
);

DROP TABLE IF EXISTS Food;
CREATE TABLE Food (
    fname VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) REFERENCES FoodCategories ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Sells;
CREATE TABLE Sells (
    fname VARCHAR(64) REFERENCES Food,
    rname VARCHAR(64) REFERENCES Restaurants,
    avail INTEGER,
    maxLimit INTEGER,
    price FLOAT,
    PRIMARY KEY (fname, rname)
);