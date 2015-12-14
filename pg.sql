create table customers(id varchar(15) primary key, name varchar (50), email varchar (100));

create table payments(id varchar(15) primary key, customer_id varchar (50) references customers(id), amount integer not null, status varchar (50));

