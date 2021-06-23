DELETE FROM users;
DELETE FROM properties;
DELETE FROM reservations;
DELETE FROM property_reviews;

INSERT INTO users (id,name,email,password) 
VALUES (1,'Helmer Rodriguez','abc@email.com','2aBOAVhpuLvpOREQVmvmezD4EDFB'),
(2,'Rosalyn Raynor','123@email.com','.JBIDRh70tGevYzYzQgFId2u.'),
(3,'Roberto Towne','xyz@email.com','2aBOAVhpuLvpOREQVmvmezD4EDFB'),(4,'Armand Hilll','lera_hahn@dickens.org','2a10FB'),
(5,'Stephanie Wolff','darius.homenick@tod.ca','.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active
) 
VALUES (1,1,'Property_1','description','www.thumbnail_photo_url.co','www.cover_photo_url.co',67.59,7,9,3,'Macao','Ap #591-7079 Felis St.','Dallas','TX','176672','False'),
(2,2,'Property_2','description','www.thumbnail_photo_url.co','www.cover_photo_url.co',62.50,15,2,1,'Antarctica','280 Ultrices Rd.','San Pedro Garza García','N.L','398505','False'),
(3,3,'Property_3','description','www.thumbnail_photo_url.co','www.cover_photo_url.co',21.83,1,1,5,'Viet Nam','320 Orci, Av.','San Vicente de Cañete','Lima','N0M 9G8','False'),
(4,1,'Property_4','description','www.thumbnail_photo_url.co','www.cover_photo_url.co',68.49,9,8,7,'Grenada','8520 Curabitur Av.','Rahimyar Khan','Punjab','58836-133','True'),
(5,2,'Property_5','description','www.thumbnail_photo_url.co','www.cover_photo_url.co',95.94,4,6,3,'Nicaragua','Ap #569-2763 Faucibus Ave','Opgrimbie','Limburg','24957-307','False');


INSERT INTO reservations (id,start_date,end_date,property_id,guest_id) 
VALUES (1,'2018-02-12T08:00:00.000Z', '2018-02-20T07:00:00.000Z',1,4),
(2,'2018-03-12T07:00:00.000Z', '2018-03-18T07:00:00.000Z',2,5),
(3,'2018-03-12T07:00:00.000Z', '2018-03-15T07:00:00.000Z',3,4),
(4,'2018-04-09T07:00:00.000Z', '2018-04-15T07:00:00.000Z',4,5),
(5,'2018-05-07T07:00:00.000Z', '2018-05-13T07:00:00.000Z',2,2);


INSERT INTO property_reviews (id,guest_id,property_id,reservation_id,rating,message) 
VALUES (1,4,1,1,1,'message'),
(2,5,2,2,2,'message'),
(3,4,3,3,4,'message'),
(4,5,4,4,5,'message'),
(5,2,2,5,2,'message');
