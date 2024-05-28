-- Custom SQL migration file, put you code below! --

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = clock_timestamp();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER mangas_update_modified_time BEFORE UPDATE ON mangas FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER sources_update_modified_time BEFORE UPDATE ON sources FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER manga_genres_update_modified_time BEFORE UPDATE ON manga_genres FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER manga_chapters_update_modified_time BEFORE UPDATE ON manga_chapters FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
