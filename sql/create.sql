DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS organizations;

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY AUTOINCREMENT,
  name varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  image_url varchar(200) NULL,
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organizations (
  id integer PRIMARY KEY AUTOINCREMENT,
  name varchar(100) NOT NULL UNIQUE,
  owner_id integer NOT NULL,
  image_url varchar(100) NULL,
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(owner_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS organization_members (
  id integer PRIMARY KEY AUTOINCREMENT,
  organization_id integer NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY(organization_id) REFERENCES organizations(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  UNIQUE(organization_id, user_id)
);

CREATE TABLE IF NOT EXISTS flowers (
  id integer PRIMARY KEY AUTOINCREMENT,
  url varchar(200) NOT NULL,
  name varchar(100) NOT NULL UNIQUE,
  created_at date NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_flowers (
  id integer PRIMARY KEY AUTOINCREMENT,
  sender_user_id integer NOT NULL,
  reciever_user_id integer NOT NULL,
  flower_id integer NOT NULL,
  message varchar(200) NULL,
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(reciever_user_id) REFERENCES users(id),
  FOREIGN KEY(reciever_user_id) REFERENCES users(id),
  FOREIGN KEY(flower_id) REFERENCES flowers(id)
);

CREATE TABLE IF NOT EXISTS reactions (
  id integer PRIMARY KEY AUTOINCREMENT,
  url varchar(200) NULL,
  name varchar(100) NOT NULL UNIQUE,
  created_at date NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_flower_reactions (
  id integer PRIMARY KEY AUTOINCREMENT,
  user_flowers_id integer NOT NULL,
  reactor_user_id integer NOT NULL,
  created_at date NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_flowers_id) REFERENCES user_flowers(id),
  FOREIGN KEY(reactor_user_id) REFERENCES users(id)
);

INSERT INTO users (id, name, password, email) VALUES (1,  'owner1', 'password', 'user1@test.com');
INSERT INTO users (id, name, password, email) VALUES (2,  'owner2', 'password', 'user2@test.com');
INSERT INTO users (id, name, password, email) VALUES (3,  'owner3', 'password', 'user3@test.com');
INSERT INTO users (id, name, password, email) VALUES (4,  'user4',  'password', 'user4@test.com');
INSERT INTO users (id, name, password, email) VALUES (5,  'user5',  'password', 'user5@test.com');
INSERT INTO users (id, name, password, email) VALUES (6,  'user6',  'password', 'user6@test.com');
INSERT INTO users (id, name, password, email) VALUES (7,  'user7',  'password', 'user7@test.com');
INSERT INTO users (id, name, password, email) VALUES (8,  'user8',  'password', 'user8@test.com');
INSERT INTO users (id, name, password, email) VALUES (9,  'user9',  'password', 'user9@test.com');
INSERT INTO users (id, name, password, email) VALUES (10, 'user10', 'password', 'user10@test.com');
INSERT INTO users (id, name, password, email) VALUES (11, 'user11', 'password', 'user11@test.com');
INSERT INTO users (id, name, password, email) VALUES (12, 'user12', 'password', 'user12@test.com');
INSERT INTO users (id, name, password, email) VALUES (13, 'user13', 'password', 'user13@test.com');
INSERT INTO users (id, name, password, email) VALUES (14, 'user14', 'password', 'user14@test.com');
INSERT INTO users (id, name, password, email) VALUES (15, 'user15', 'password', 'user15@test.com');
INSERT INTO users (id, name, password, email) VALUES (16, 'user16', 'password', 'user16@test.com');
INSERT INTO users (id, name, password, email) VALUES (17, 'user17', 'password', 'user17@test.com');
INSERT INTO users (id, name, password, email) VALUES (18, 'user18', 'password', 'user18@test.com');
INSERT INTO users (id, name, password, email) VALUES (19, 'user19', 'password', 'user19@test.com');
INSERT INTO users (id, name, password, email) VALUES (20, 'user20', 'password', 'user20@test.com');

INSERT INTO organizations (id, name, owner_id) VALUES (1, 'organization1', 1);
INSERT INTO organizations (id, name, owner_id) VALUES (2, 'organization2', 2);
INSERT INTO organizations (id, name, owner_id) VALUES (3, 'organization3', 3);

INSERT INTO organization_members (id, organization_id, user_id) VALUES (1,  1, 1);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (2,  2, 2);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (3,  3, 3);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (4,  1, 4);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (5,  1, 5);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (6,  1, 6);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (7,  1, 7);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (8,  1, 8);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (9,  1, 9);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (10,  2, 10);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (11,  2, 11);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (12,  2, 12);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (13, 3, 13);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (14, 3, 14);
INSERT INTO organization_members (id, organization_id, user_id) VALUES (15, 3, 15);


INSERT INTO flowers (id, url, name) VALUES (1,  'http://www.planwallpaper.com/static/images/flowers-3.jpg', 'flower1');
INSERT INTO flowers (id, url, name) VALUES (2,  'http://www.wonderslist.com/wp-content/uploads/2013/01/Most-Beautiful-Flowers.jpg', 'flower2');
INSERT INTO flowers (id, url, name) VALUES (3,  'http://www.planwallpaper.com/static/images/Flowers-Photos-8-Cool-Wallpapers-HD.jpg', 'flower3');

INSERT INTO user_flowers (id, sender_user_id, reciever_user_id, flower_id, message) VALUES (1, 1,  4,  1, "Thank you user4 for fixing the door");
INSERT INTO user_flowers (id, sender_user_id, reciever_user_id, flower_id, message) VALUES (2, 4,  5,  2, "Thank you user5 for letting me use your laptop");
INSERT INTO user_flowers (id, sender_user_id, reciever_user_id, flower_id, message) VALUES (3, 4,  6,  3, "Thank you user6 for helping out with customers");
INSERT INTO user_flowers (id, sender_user_id, reciever_user_id, flower_id, message) VALUES (4, 2,  11, 1, "Thank you user11 helping me with user settings ");
INSERT INTO user_flowers (id, sender_user_id, reciever_user_id, flower_id, message) VALUES (5, 12, 11, 2, "Thank you user11 for your advice on React");
INSERT INTO user_flowers (id, sender_user_id, reciever_user_id, flower_id, message) VALUES (6, 3,  13, 1, "Thank you user13");
