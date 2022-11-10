create database INC;

use INC;

CREATE TABLE Filiers (
  id int AUTO_INCREMENT PRIMARY KEY,
  nme varchar(50) ,
  hoursCount int ,
  directorName varchar(60) ,
  stadyingYear varchar(30)

);

CREATE TABLE Grps (
  id int AUTO_INCREMENT PRIMARY KEY,
  nme varchar(50) ,
  filier int ,
  FOREIGN KEY (filier) REFERENCES Filiers (id)
);

CREATE TABLE Students (
  id int AUTO_INCREMENT PRIMARY KEY,
  grp int ,
  fname varchar(30) ,
  lname varchar(30) ,
  city varchar(30) ,
  phne varchar(20) ,
  zip varchar(10) ,
  email varchar(100) ,
  usrNme varchar(50) ,
  psswrd text,
  prflPic longblob,
  lastActive datetime ,
  lastIp varchar(50) ,
  FOREIGN KEY (grp) REFERENCES Grps (id)
);

CREATE TABLE Famillies (
  id int AUTO_INCREMENT PRIMARY KEY,
  stdnt int ,
  fname varchar(30) ,
  lname varchar(30) ,
  phone varchar(20) ,
  email varchar(40) ,
  relation varchar(30) ,
  addrss varchar(50) ,
  FOREIGN KEY (stdnt) REFERENCES Students (id)
);



CREATE TABLE Users (
  id int AUTO_INCREMENT PRIMARY KEY,
  usrType int ,
  fname varchar(50) ,
  lname varchar(50) ,
  addrss varchar(255) ,
  city varchar(30) ,
  phne varchar(20) ,
  zip varchar(10) ,
  email varchar(100) ,
  usrNme varchar(50) ,
  psswrd text,
  prflPic longblob,
  lastActive datetime ,
  lastIp varchar(50)

);


CREATE TABLE Modules (
  id int AUTO_INCREMENT PRIMARY KEY,
  filier int ,
  nme varchar(30) ,
  season varchar(30) ,
  hoursCount int ,
  teacher int ,
   FOREIGN KEY (filier) REFERENCES Filiers (id),
   FOREIGN KEY (teacher) REFERENCES Users (id)
);



CREATE TABLE TimeLinePlan (
  id int AUTO_INCREMENT PRIMARY KEY,
  grp int ,
  FOREIGN KEY (grp) REFERENCES Grps (id)
);

CREATE TABLE PlanedSeassion (
  id int AUTO_INCREMENT PRIMARY KEY,
  TimeLinePlan int ,
  module int ,
  seassionTime datetime ,
  room varchar(20) ,
  FOREIGN KEY (TimeLinePlan) REFERENCES TimeLinePlan (id),
   FOREIGN KEY (module) REFERENCES Modules (id)
);

CREATE TABLE SessionDone (
  id int AUTO_INCREMENT PRIMARY KEY,
  stdnt int ,
  teacher int ,
  module int ,
  presence int ,
  seasionTime datetime ,
  room varchar(20) ,
  FOREIGN KEY (stdnt) REFERENCES Students (id),
  FOREIGN KEY (teacher) REFERENCES Users (id),
  FOREIGN KEY (module) REFERENCES Modules (id)
);
