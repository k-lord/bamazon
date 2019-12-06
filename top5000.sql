DROP DATABASE IF EXISTS top_songsDB;
CREATE DATABASE top_songsDB;

USE top_songsDB;

CREATE TABLE top5000(
  position INT NOT NULL,
  artist_name VARCHAR(100) NOT NULL,
  song_name VARCHAR(200) NOT NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur(10,4) NULL,
  raw_row(10,4) NULL,
  PRIMARY KEY (position)
);
