TRUNCATE user_table, habit, habit_counter  RESTART IDENTITY;

INSERT INTO user_table(name, email, password)
    VALUES
        ('test', 'test1@gmail.com', '$2a$10$bSQ6V2lYWaTS.KH3K81De.Yvaf2RoNcZcU3BcsZqsdVirBvs.EkzS'),
        ('test2', 'test2@hotmail.com', ''),
        ('test3', 'test3@test.com', '');

INSERT INTO habit (habit, user_id, currTime, currFreq, frequency) 
    VALUES 
        ('test1', 1, current_timestamp - INTERVAL '2 day', 3, 3),
        ('test2', 1, current_timestamp - INTERVAL '3 day', 3, 3),
        ('test3', 1, current_timestamp - INTERVAL '1 day', 1, 1),

        ('test1', 2, current_timestamp - INTERVAL '2 day', 1, 4),
        ('test2', 2, current_timestamp - INTERVAL '3 day', 0, 3),
        ('test3', 2, current_timestamp - INTERVAL '1 day', 2, 5);

INSERT INTO habit_counter(habit_id, time_done, completedStreak)
    VALUES
        --Task 1 completed 4x yesterday
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', TRUE),
        --Task 1 completed 3x the day before
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        --Task 2 completed 1x today
        (2, current_timestamp, FALSE),
        (2, current_timestamp, FALSE);
