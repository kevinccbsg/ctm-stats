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

```sql
-- player vs player function
CREATE OR REPLACE FUNCTION get_player_v_player_results(
    player1_id INT,
    player2_id INT
)
RETURNS TABLE (
    match_id INT,
    game_number INT,
    round_max TEXT,
    event_name TEXT,
    player1_style TEXT,
    player1_topout TEXT,
    player1_score INT,
    player1_result TEXT,
    player2_result TEXT,
    player2_score INT,
    player2_topout TEXT,
    player2_style TEXT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        tg.match_id,
        tg.game_number,
        MAX(tg.round) AS round_max,
        MAX(e.name) AS event_name,
        MAX(CASE WHEN player_id = 88 THEN playstyle END) AS player1_style,
        MAX(CASE WHEN tg.player_id = player1_id THEN tg.topout_type END) AS player1_topout,
        MAX(CASE WHEN tg.player_id = player1_id THEN tg.final_score END)::integer AS player1_score,
        MAX(CASE WHEN tg.player_id = player1_id THEN CASE WHEN tg.game_result = true THEN 'Win' ELSE 'Loss' END END) AS player1_result,
        MAX(CASE WHEN tg.player_id = player2_id THEN CASE WHEN tg.game_result = true THEN 'Win' ELSE 'Loss' END END) AS player2_result,
        MAX(CASE WHEN tg.player_id = player2_id THEN tg.final_score END)::integer AS player2_score,
        MAX(CASE WHEN tg.player_id = player2_id THEN tg.topout_type END) AS player2_topout,
        MAX(CASE WHEN tg.player_id = player2_id THEN tg.playstyle END) AS player2_style
    FROM
        tetris_games tg
        LEFT JOIN matches m ON m.id = tg.match_id
        LEFT JOIN events e ON e.id = m.event_id
    WHERE
        (tg.player_id = player1_id OR tg.opponent_id = player1_id)
        AND (tg.player_id = player2_id OR tg.opponent_id = player2_id)
    GROUP BY
        tg.match_id, tg.game_number
    ORDER BY
        tg.match_id DESC, tg.game_number DESC;

    RETURN;
END;
$$ LANGUAGE plpgsql;
```


```sql
CREATE OR REPLACE FUNCTION calculate_combined_median()
RETURNS TABLE (
    player_id INTEGER,
    player_name VARCHAR(255),
    combined_median NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH natural_topouts AS (
        SELECT
            player_id,
            PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY final_score) AS median_final_score
        FROM
            public.tetris_games
        WHERE
            topout_type = 'Natural' AND level_start = 18
        GROUP BY
            player_id
    ),
    natural_items AS (
        SELECT
            player_id,
            final_score
        FROM
            public.tetris_games
        WHERE
            level_start = 18 AND topout_type = 'Natural'
    ),
    intentional_aggressive_topouts AS (
        SELECT
            tg.player_id,
            tg.final_score AS average_final_score
        FROM
            public.tetris_games AS tg
        WHERE
            tg.topout_type IN ('Intentional', 'Aggressive')
            AND tg.final_score >= (SELECT SUM(median_final_score) FROM natural_topouts)
            AND level_start = 18
    ),
    combined_values AS (
        SELECT player_id, final_score AS combined_value FROM natural_items
        UNION
        SELECT player_id, average_final_score AS combined_value FROM intentional_aggressive_topouts
    )
    SELECT
        cv.player_id,
        MAX(p.name) AS player_name,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY combined_value) AS combined_median
    FROM
        combined_values cv
    LEFT JOIN
        players p ON p.id = cv.player_id
    GROUP BY
        cv.player_id;

    RETURN;
END;
$$ LANGUAGE plpgsql;
```