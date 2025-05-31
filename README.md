# Workout Tracker API
A RESTful API built with Node.js, Express, TypeScript, and PostgreSQL that allows users to track their workouts, create workout plans, and log progress over time. This API supports user authentication, exercise management, workout creation, and progress reporting.


## Database Schema
This API uses **PostgreSQL** as the database. You can generate the tables by executing the following SQL statements:

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE exercises (
  exercise_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  muscle_group TEXT
);

CREATE TABLE workouts (
  workout_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  title TEXT NOT NULL,
  notes TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workout_items (
  workout_item_id SERIAL PRIMARY KEY,
  workout_id INTEGER REFERENCES workouts(workout_id),
  exercise_id INTEGER REFERENCES exercises(exercise_id),
  sets INTEGER,
  reps INTEGER,
  weight INTEGER,
  order_index INTEGER
);

CREATE TABLE workout_logs (
  workout_log_id SERIAL PRIMARY KEY,
  workout_id INTEGER REFERENCES workouts(workout_id),
  performed_at TIMESTAMPTZ DEFAULT now(),
  comment TEXT
);

CREATE TABLE workout_log_items (
  workout_log_item_id SERIAL PRIMARY KEY,
  workout_log_id INTEGER REFERENCES workout_logs(workout_log_id),
  exercise_id INTEGER REFERENCES exercises(exercise_id),
  set_number INTEGER,
  reps_completed INT,
  weight INTEGER
);
```