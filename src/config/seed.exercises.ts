import "dotenv/config";
import { db } from "./db";

const exercises = [
  {
    name: "Barbell Bench Press",
    description:
      "A compound chest exercise performed on a flat bench using a barbell.",
    category: "strength",
    muscle_group: "chest",
  },
  {
    name: "Dumbbell Shoulder Press",
    description: "An overhead pressing movement that targets the shoulders.",
    category: "strength",
    muscle_group: "shoulders",
  },
  {
    name: "Pull-Up",
    description: "A bodyweight back exercise performed using a bar.",
    category: "strength",
    muscle_group: "back",
  },
  {
    name: "Deadlift",
    description:
      "A total body lift that primarily targets the posterior chain.",
    category: "strength",
    muscle_group: "back",
  },
  {
    name: "Barbell Squat",
    description:
      "A lower body strength exercise targeting quads, glutes, and hamstrings.",
    category: "strength",
    muscle_group: "legs",
  },
  {
    name: "Bicep Curl",
    description: "An isolation exercise that targets the biceps.",
    category: "strength",
    muscle_group: "arms",
  },
  {
    name: "Tricep Dips",
    description: "A bodyweight exercise that targets the triceps and chest.",
    category: "strength",
    muscle_group: "arms",
  },
  {
    name: "Leg Press",
    description:
      "A machine-based exercise that targets the quadriceps and glutes.",
    category: "strength",
    muscle_group: "legs",
  },
  {
    name: "Romanian Deadlift",
    description: "Targets hamstrings and glutes with minimal back involvement.",
    category: "strength",
    muscle_group: "legs",
  },
  {
    name: "Lat Pulldown",
    description: "A cable machine exercise targeting the lats.",
    category: "strength",
    muscle_group: "back",
  },
  {
    name: "Jump Rope",
    description: "A full-body cardiovascular exercise using a skipping rope.",
    category: "cardio",
    muscle_group: "full body",
  },
  {
    name: "Running",
    description: "High-impact cardio exercise that builds endurance.",
    category: "cardio",
    muscle_group: "legs",
  },
  {
    name: "Cycling",
    description: "Low-impact cardio workout performed on a bicycle.",
    category: "cardio",
    muscle_group: "legs",
  },
  {
    name: "Burpees",
    description: "A full-body explosive cardio movement.",
    category: "cardio",
    muscle_group: "full body",
  },
  {
    name: "Mountain Climbers",
    description: "Dynamic bodyweight cardio that targets the core.",
    category: "cardio",
    muscle_group: "core",
  },
  {
    name: "Plank",
    description: "A core isometric exercise that builds stability.",
    category: "flexibility",
    muscle_group: "core",
  },
  {
    name: "Side Plank",
    description: "An isometric core exercise targeting obliques.",
    category: "flexibility",
    muscle_group: "core",
  },
  {
    name: "Yoga Downward Dog",
    description: "Stretch targeting hamstrings, calves, and shoulders.",
    category: "flexibility",
    muscle_group: "full body",
  },
  {
    name: "Cat-Cow Stretch",
    description: "Spinal flexibility movement from yoga.",
    category: "flexibility",
    muscle_group: "back",
  },
  {
    name: "Seated Forward Fold",
    description: "Hamstring and lower back stretch.",
    category: "flexibility",
    muscle_group: "legs",
  },
  {
    name: "Bodyweight Squat",
    description: "Lower-body strength using bodyweight only.",
    category: "strength",
    muscle_group: "legs",
  },
  {
    name: "Push-Up",
    description: "Classic chest and triceps exercise using bodyweight.",
    category: "strength",
    muscle_group: "chest",
  },
  {
    name: "Lunges",
    description: "A unilateral leg exercise great for balance and strength.",
    category: "strength",
    muscle_group: "legs",
  },
  {
    name: "Glute Bridge",
    description: "Targets glutes and hamstrings from the floor.",
    category: "strength",
    muscle_group: "legs",
  },
  {
    name: "Superman Hold",
    description: "Strengthens the lower back using bodyweight.",
    category: "strength",
    muscle_group: "back",
  },
];

const seedExercises = async () => {
  try {
    await db.connect();

    for (const ex of exercises) {
      await db.query(
        `INSERT INTO exercises (name, description, category, muscle_group)
         VALUES ($1, $2, $3, $4)`,
        [ex.name, ex.description, ex.category, ex.muscle_group],
      );
    }

    console.log("✅ Exercise seeding complete");
  } catch (err) {
    console.error("❌ Error seeding exercises:", err);
  } finally {
    await db.end();
  }
};

seedExercises();
