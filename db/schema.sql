-- db/schema.sql
DROP DATABASE IF EXISTS tuner;
CREATE DATABASE tuner;

\c tuner;
CREATE TABLE playlists (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 is_favorite BOOLEAN
);

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN,
 playlist_id INT REFERENCES playlists (id) ON DELETE SET NULL
);
