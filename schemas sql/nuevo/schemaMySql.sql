
CREATE TABLE artist (
  id INT,
  name TEXT,
  link TIMESTAMP,
  picture TEXT,
  picture_small TEXT,
  picture_medium TEXT,
  picture_big TEXT,
  picture_xl TEXT,
  tracklist TEXT,
  type TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE album (
  id INT,
  title TEXT,
  cover TEXT,
  cover_small TEXT,
  cover_medium TEXT,
  cover_big TEXT,
  cover_xl TEXT,
  md5_image TEXT,
  tracklist TEXT,
  type TEXT,
  PRIMARY KEY (id)
);


CREATE TABLE song (
  id INT,
  readable BOOLEAN,
  title TEXT,
  title_short TEXT,
  title_version TEXT,
  link TEXT,
  duration INT,
  rank INT,
  explicit_lyrics BOOLEAN,
  explicit_content_lyrics INT,
  explicit_content_cover INT,
  preview TEXT,
  md5_image TEXT,
  type TEXT,
  artist_id INT,
  album_id INT,
  lyrics TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  FOREIGN KEY (album_id) REFERENCES album(id)
);
