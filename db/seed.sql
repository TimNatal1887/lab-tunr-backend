
\c tuner;


INSERT INTO playlists (name, is_favorite) VALUES 
('Gym', false),
('Chill', true),
('Work Commute', true);

INSERT INTO songs (name, artist, album, time, is_favorite, playlist_id) VALUES
('Man on the Moon', 'Kid Cudi', 'A Kid Name Cudi', '3:27', true, 1 ),
('Going to the Ceremony', 'Kid Cudi', 'Satellite Flight: The Journey to Mother Moon', '3:48', true,1),
('Faded Heart', 'Børns', 'Blue Madonna', '3:35', false,2);