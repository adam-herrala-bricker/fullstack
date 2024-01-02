CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Dave', 'dave.org', 'Dave Blog');

INSERT INTO blogs (author, url, title) VALUES ('Ron', 'ron.org', 'Ron Blog');
