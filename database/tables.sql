drop Database if exists dataverse_anagn;
create Database dataverse_anagn character set utf8 collate utf8_general_ci;
use dataverse_anagn;

create table  Users (
    Personid 	int NOT NULL AUTO_INCREMENT,
	Name		varchar(64) not null,
	LastName	varchar(64) not null,
	Password	varchar(64) not null,
    Email 		varchar(64) not null,
    Phone 	 	varchar(64) ,
    Company 	varchar(64) , 

    primary key (Personid)
);

