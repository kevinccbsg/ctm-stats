```sql
-- lifetime_stats
CREATE OR REPLACE FUNCTION lifetime_stats()
RETURNS TABLE (
  id INT,
  name VARCHAR(255),
  profile_picture_url TEXT,
  twitch_url TEXT,
  games_won INT,
  total_games INT,
  maxout_games INT,
  winning_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
      p.id,
      p.name,
      p.profile_picture_url,
      p.twitch_url,
      COUNT(tg.game_result = true or NULL)::integer AS games_won,
      SUM(CASE WHEN tg.final_score >= 1000000 THEN 1 ELSE 0 END)::integer AS maxout_games,
      COUNT(*)::integer AS total_games,
      CASE
        WHEN COUNT(*) > 0 THEN COUNT(tg.game_result = true or NULL) * 100.0 / NULLIF(COUNT(*), 0)
        ELSE 0
      END AS winning_percentage
    FROM
      players p
      LEFT JOIN tetris_games tg ON p.id = tg.player_id
    GROUP BY
      p.id, p.name, p.profile_picture_url, p.twitch_url;
  RETURN;
END;
$$ LANGUAGE plpgsql;
```

```sql
--- year stats, sames as previous one but with a year filter
CREATE OR REPLACE FUNCTION year_stats(
  IN event_year_param INT
)
RETURNS TABLE (
  id INT,
  name VARCHAR(255),
  profile_picture_url TEXT,
  twitch_url TEXT,
  games_won INT,
  total_games INT,
  maxout_games INT,
  winning_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
      p.id,
      p.name,
      p.profile_picture_url,
      p.twitch_url,
      COUNT(tg.game_result = true or NULL)::integer AS games_won,
      SUM(CASE WHEN tg.final_score >= 1000000 THEN 1 ELSE 0 END)::integer AS maxout_games,
      COUNT(*)::integer AS total_games,
      CASE
        WHEN COUNT(*) > 0 THEN COUNT(tg.game_result = true or NULL) * 100.0 / NULLIF(COUNT(*), 0)
        ELSE 0
      END AS winning_percentage
    FROM
      players p
      LEFT JOIN tetris_games tg ON p.id = tg.player_id
      LEFT JOIN matches m ON m.id = tg.match_id
      LEFT JOIN events e ON e.id = m.event_id
    WHERE
      e.year = event_year_param
    GROUP BY
      p.id, p.name, p.profile_picture_url, p.twitch_url;
  RETURN;
END;
$$ LANGUAGE plpgsql;
```