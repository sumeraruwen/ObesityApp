# from flask import Flask, request, jsonify
# import pickle
# import pandas as pd
# from datetime import datetime
# import random
# import joblib

# app = Flask(__name__)

# # Load meal plan model and encoders
# with open('meal_plan_model.pkl', 'rb') as f:
#     meal_model = pickle.load(f)
# with open('label_encoders.pkl', 'rb') as f:
#     meal_label_encoders = pickle.load(f)
# with open('target_encoder.pkl', 'rb') as f:
#     meal_target_encoder = pickle.load(f)

# # Load exercise model and encoders
# exercise_model_path = 'exercise_model/app_exercise_model.pkl'
# exercise_model = joblib.load(exercise_model_path)
# le_gender = joblib.load('exercise_model/le_gender.pkl')
# le_activity = joblib.load('exercise_model/le_activity.pkl')
# le_health = joblib.load('exercise_model/le_health.pkl')
# le_goal = joblib.load('exercise_model/le_goal.pkl')
# le_exercise = joblib.load('exercise_model/le_exercise.pkl')
# le_category = joblib.load('exercise_model/le_category.pkl')

# # Meal categories (unchanged)
# meal_categories = {
#     'High-Protein Meal': {
#         'Breakfast': [('Protein oatmeal with berries', 350, 450), ('Egg scramble with turkey bacon', 400, 500), ('Greek yogurt with whey protein', 370, 470), ('Chicken sausage with eggs', 390, 490)],
#         'Lunch': [('Grilled chicken breast with quinoa', 500, 600), ('Turkey wrap with veggies', 450, 550), ('Beef stir-fry with brown rice', 480, 580), ('Chicken salad with almonds', 460, 560)],
#         'Dinner': [('Pan-seared steak with sweet potato', 600, 700), ('Baked turkey with brown rice', 550, 650), ('Grilled pork chop with veggies', 580, 680), ('Chicken thigh with roasted potatoes', 570, 670)]
#     },
#     'Omega-3 Rich Meal': {
#         'Breakfast': [('Salmon avocado toast', 400, 500), ('Chia seed pudding with fish oil', 350, 450), ('Smoked mackerel on rye bread', 380, 480), ('Sardine omelette', 360, 460)],
#         'Lunch': [('Grilled salmon with quinoa', 500, 600), ('Tuna salad with leafy greens', 450, 550), ('Mackerel patties with veggies', 470, 570), ('Sardine wrap with spinach', 460, 560)],
#         'Dinner': [('Baked salmon with roasted veggies', 600, 700), ('Poached fish with cauliflower rice', 550, 650), ('Grilled trout with asparagus', 580, 680), ('Tuna steak with zucchini noodles', 570, 670)]
#     },
#     'Vegetarian Meal': {
#         'Breakfast': [('Greek yogurt with nuts and fruit', 300, 400), ('Tofu scramble with spinach', 350, 450), ('Overnight oats with chia seeds', 320, 420), ('Avocado toast with hemp seeds', 340, 440)],
#         'Lunch': [('Lentil curry with brown rice', 450, 550), ('Black bean burger with greens', 400, 500), ('Chickpea salad with avocado', 430, 530), ('Veggie stir-fry with tofu', 420, 520)],
#         'Dinner': [('Chickpea curry with veggies', 500, 600), ('Quinoa stuffed peppers', 450, 550), ('Lentil stew with sweet potato', 470, 570), ('Tofu stir-fry with broccoli', 460, 560)]
#     },
#     'Low-Carb Meal': {
#         'Breakfast': [('Avocado egg cups', 300, 400), ('Keto sausage muffins', 350, 450), ('Bacon and spinach frittata', 320, 420), ('Almond flour pancakes', 340, 440)],
#         'Lunch': [('Turkey meatballs with spinach', 450, 550), ('Steak salad with olive oil', 400, 500), ('Pork tenderloin with zucchini', 430, 530), ('Cauliflower fried rice with shrimp', 420, 520)],
#         'Dinner': [('Pan-seared steak with cauliflower mash', 500, 600), ('Salmon with asparagus', 550, 650), ('Chicken thighs with Brussels sprouts', 520, 620), ('Pork chop with kale', 540, 640)]
#     },
#     'Mediterranean Meal': {
#         'Breakfast': [('Greek yogurt with honey', 300, 400), ('Feta omelette with olives', 350, 450), ('Tomato and basil scramble', 320, 420), ('Hummus toast with cucumber', 340, 440)],
#         'Lunch': [('Chicken quinoa salad', 450, 550), ('Hummus veggie wrap', 400, 500), ('Falafel bowl with tahini', 430, 530), ('Grilled fish with tabbouleh', 460, 560)],
#         'Dinner': [('Baked salmon with couscous', 550, 650), ('Fish with roasted veggies', 500, 600), ('Lamb kebabs with tzatziki', 570, 670), ('Shrimp with Mediterranean rice', 540, 640)]
#     }
# }

# # Exercise categories (matches v4 dataset)
# exercise_categories = {
#     'Full Body Stretch - 5 min': 'Stretching', 'Seated Hamstring Stretch - 10 min': 'Stretching',
#     'Shoulder and Arm Stretch - 8 min': 'Stretching', 'Neck and Back Stretch - 6 min': 'Stretching',
#     'Seated Cat-Cow Stretch - 7 min': 'Stretching', 'Hip Flexor Stretch - 8 min': 'Stretching',
#     'Standing Quad Stretch - 6 min': 'Stretching', 'Gentle Yoga Flow - 10 min': 'Stretching',
#     'Chest Opener Stretch - 5 min': 'Stretching', 'Side Bend Stretch - 7 min': 'Stretching',
#     'Seated Forward Bend - 8 min': 'Stretching', 'Knee-to-Chest Stretch - 6 min': 'Stretching',
#     'Butterfly Stretch - 7 min': 'Stretching', 'Triceps Stretch - 5 min': 'Stretching',
#     'Calf Stretch - 6 min': 'Stretching', 'Seated Spinal Twist - 7 min': 'Stretching',
#     'Standing Side Stretch - 6 min': 'Stretching', 'Doorway Chest Stretch - 5 min': 'Stretching',
#     'Brisk Walking - 20 min': 'Cardio', 'Water Aerobics - 15 min': 'Cardio',
#     'Stationary Cycling - 15 min': 'Cardio', 'Slow Pace Walking - 25 min': 'Cardio',
#     'Step-Ups (Low Height) - 12 min': 'Cardio', 'Chair Cardio Dance - 10 min': 'Cardio',
#     'Low-Impact Jumping Jacks - 12 min': 'Cardio', 'Seated Bike Pedaling - 15 min': 'Cardio',
#     'Marching in Place - 20 min': 'Cardio', 'Side-to-Side Steps - 10 min': 'Cardio',
#     'Arm Swing Cardio - 8 min': 'Cardio', 'Stair Climbing (Slow) - 15 min': 'Cardio',
#     'Seated High Knees - 12 min': 'Cardio', 'Light Jogging in Place - 10 min': 'Cardio',
#     'Chair Step Taps - 8 min': 'Cardio', 'Standing March - 15 min': 'Cardio',
#     'Side Leg Swing Cardio - 12 min': 'Cardio', 'Arm Reach Cardio - 10 min': 'Cardio',
#     'Seated Shadow Boxing - 15 min': 'Cardio', 'Slow Dance Moves - 12 min': 'Cardio',
#     'Chair Squats - 10 min': 'Strength', 'Wall Push-Ups - 8 min': 'Strength',
#     'Seated Resistance Band Rows - 10 min': 'Strength', 'Leg Press (Seated) - 12 min': 'Strength',
#     'Arm Curls (Light Weights) - 8 min': 'Strength', 'Standing Heel Raises - 8 min': 'Strength',
#     'Seated Shoulder Press - 10 min': 'Strength', 'Knee Extensions with Band - 12 min': 'Strength',
#     'Seated Chest Press - 10 min': 'Strength', 'Standing Bicep Curls - 8 min': 'Strength',
#     'Wall Sit - 6 min': 'Strength', 'Seated Tricep Dips - 8 min': 'Strength',
#     'Leg Raises (Seated) - 10 min': 'Strength', 'Resistance Band Pull-Aparts - 8 min': 'Strength',
#     'Chair Lunges - 10 min': 'Strength', 'Standing Side Arm Raises - 8 min': 'Strength',
#     'Seated Calf Raises - 7 min': 'Strength', 'Light Dumbbell Rows - 10 min': 'Strength',
#     'Seated Marching - 15 min': 'Mobility', 'Arm Circles - 5 min': 'Mobility',
#     'Side Leg Lifts - 10 min': 'Mobility', 'Ankle Rotations - 6 min': 'Mobility',
#     'Wrist and Finger Flex - 5 min': 'Mobility', 'Seated Torso Twists - 8 min': 'Mobility',
#     'Hip Circles - 7 min': 'Mobility', 'Neck Rolls - 5 min': 'Mobility',
#     'Shoulder Shrugs - 6 min': 'Mobility', 'Seated Hip Opener - 7 min': 'Mobility',
#     'Toe Point and Flex - 5 min': 'Mobility', 'Standing Arm Swings - 8 min': 'Mobility',
#     'Knee Circles - 6 min': 'Mobility', 'Gentle Side Sways - 7 min': 'Mobility'
# }
# exercise_list = list(exercise_categories.keys())

# # Meal prediction function (unchanged)
# def predict_meal_plan(model, sample_input, label_encoders, label_encoder, meal_categories):
#     expected_fields = ['Height', 'Weight', 'Age', 'Gender', 'Activity_Level', 'Goal', 
#                        'Health_Condition', 'Dietary_Preference', 'Food_Allergy']
    
#     filtered_input = {k: sample_input[k].strip() if isinstance(sample_input[k], str) else sample_input[k] 
#                       for k in expected_fields if k in sample_input}
#     print("Filtered input:", filtered_input)

#     filtered_input['BMI'] = filtered_input['Weight'] / ((filtered_input['Height'] / 100) ** 2)
#     filtered_input['BMI_Category'] = pd.cut([filtered_input['BMI']], bins=[0, 18.5, 24.9, 29.9, 100], 
#                                             labels=['Underweight', 'Normal', 'Overweight', 'Obese'])[0]
#     gender = filtered_input['Gender']
#     bmr = (10 * filtered_input['Weight'] + 6.25 * filtered_input['Height'] - 5 * filtered_input['Age'] + 
#            (5 if gender == 'Male' else -161))
#     activity_multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725}
#     filtered_input['Calorie_Goal'] = int(bmr * activity_multipliers[filtered_input['Activity_Level']])

#     if 'Time_of_Day' not in filtered_input:
#         hour = datetime.now().hour
#         filtered_input['Time_of_Day'] = 'Breakfast' if hour < 12 else 'Lunch' if hour < 17 else 'Dinner'

#     sample_df = pd.DataFrame([filtered_input])
#     for column in ['Gender', 'Activity_Level', 'Goal', 'Health_Condition', 'Dietary_Preference', 
#                    'Food_Allergy', 'BMI_Category', 'Time_of_Day']:
#         try:
#             sample_df[column] = label_encoders[column].transform(sample_df[column])
#         except ValueError as e:
#             print(f"Warning: Unseen label in {column}: {e}")
#             return {'error': f"Invalid {column}: {sample_df[column].iloc[0]} not recognized"}

#     predicted_category_encoded = model.predict(sample_df)
#     predicted_category = label_encoder.inverse_transform(predicted_category_encoded)[0]
    
#     meal_options = meal_categories[predicted_category][filtered_input['Time_of_Day']]
#     best_meal = min(meal_options, key=lambda x: abs(x[1] - (filtered_input['Calorie_Goal'] // 3)))
#     meal_name, min_cal, max_cal = best_meal
#     calories = random.randint(min_cal, max_cal)

#     return {
#         'meal_category': predicted_category,
#         'meal': meal_name,
#         'calories': calories,
#         'time_of_day': filtered_input['Time_of_Day'],
#         'details': f"{meal_name} - A {predicted_category.lower()} suitable for {filtered_input['Time_of_Day'].lower()} with approximately {calories} kcal."
#     }

# # Exercise prediction endpoint (updated with shuffling)
# @app.route('/predict_exercises', methods=['POST'])
# def predict_exercises():
#     try:
#         data = request.get_json()
#         cleaned_data = {k: v.strip() if isinstance(v, str) else v for k, v in data.items()}
#         print("Received exercise input:", cleaned_data)
#         suitable_exercises = []
#         for exercise in exercise_list:
#             df = pd.DataFrame([{
#                 'Height': cleaned_data['Height'],
#                 'Weight': cleaned_data['Weight'],
#                 'Age': cleaned_data['Age'],
#                 'Gender': le_gender.transform([cleaned_data['Gender']])[0],
#                 'Activity_Level': le_activity.transform([cleaned_data['Activity_Level']])[0],
#                 'Health_Condition': le_health.transform([cleaned_data['Health_Condition']])[0],
#                 'Goal': le_goal.transform([cleaned_data['Goal']])[0],
#                 'BMI': cleaned_data['Weight'] / (cleaned_data['Height'] / 100) ** 2,
#                 'Exercise_Routine': le_exercise.transform([exercise])[0],
#                 'Category': le_category.transform([exercise_categories[exercise]])[0]
#             }])
#             prediction = exercise_model.predict(df)[0]
#             if prediction == 1:
#                 suitable_exercises.append(exercise)

#         # Shuffle suitable exercises for randomness
#         random.shuffle(suitable_exercises)

#         # Select up to 3 exercises from different categories
#         selected = []
#         categories_used = set()
#         for ex in suitable_exercises:
#             category = exercise_categories[ex]
#             if category not in categories_used and len(selected) < 3:
#                 selected.append(ex)
#                 categories_used.add(category)

#         # If fewer than 3, fill with remaining suitable exercises
#         if len(selected) < 3:
#             for ex in suitable_exercises:
#                 if ex not in selected and len(selected) < 3:
#                     selected.append(ex)

#         print("Predicted exercises:", selected)
#         return jsonify({'exercises': selected})
#     except ValueError as e:
#         print("Error in exercise prediction:", str(e))
#         return jsonify({'error': str(e)}), 400
#     except Exception as e:
#         print("Error in exercise prediction:", str(e))
#         return jsonify({'error': str(e)}), 400

# @app.route('/predict_meal', methods=['POST'])
# def predict_meal():
#     try:
#         data = request.get_json()
#         print("Received input:", data)
#         result = predict_meal_plan(meal_model, data, meal_label_encoders, meal_target_encoder, meal_categories)
#         print("Prediction result:", result)
#         return jsonify(result)
#     except Exception as e:
#         print("Error:", str(e))
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)


from flask import Flask, request, jsonify
import pickle
import pandas as pd
from datetime import datetime
import random
import joblib

app = Flask(__name__)

# Load meal plan model and encoders
with open('meal_plan_model.pkl', 'rb') as f:
    meal_model = pickle.load(f)
with open('label_encoders.pkl', 'rb') as f:
    meal_label_encoders = pickle.load(f)
with open('target_encoder.pkl', 'rb') as f:
    meal_target_encoder = pickle.load(f)

# Load exercise model and encoders
exercise_model_path = 'exercise_model/app_exercise_model.pkl'
exercise_model = joblib.load(exercise_model_path)
le_gender = joblib.load('exercise_model/le_gender.pkl')
le_activity = joblib.load('exercise_model/le_activity.pkl')
le_health = joblib.load('exercise_model/le_health.pkl')
le_goal = joblib.load('exercise_model/le_goal.pkl')
le_exercise = joblib.load('exercise_model/le_exercise.pkl')
le_category = joblib.load('exercise_model/le_category.pkl')

# Meal categories
meal_categories = {
    'High-Protein Meal': {
        'Breakfast': [('Protein oatmeal with berries', 350, 450), ('Egg scramble with turkey bacon', 400, 500), ('Greek yogurt with whey protein', 370, 470), ('Chicken sausage with eggs', 390, 490)],
        'Lunch': [('Grilled chicken breast with quinoa', 500, 600), ('Turkey wrap with veggies', 450, 550), ('Beef stir-fry with brown rice', 480, 580), ('Chicken salad with almonds', 460, 560)],
        'Dinner': [('Pan-seared steak with sweet potato', 600, 700), ('Baked turkey with brown rice', 550, 650), ('Grilled pork chop with veggies', 580, 680), ('Chicken thigh with roasted potatoes', 570, 670)]
    },
    'Omega-3 Rich Meal': {
        'Breakfast': [('Salmon avocado toast', 400, 500), ('Chia seed pudding with fish oil', 350, 450), ('Smoked mackerel on rye bread', 380, 480), ('Sardine omelette', 360, 460)],
        'Lunch': [('Grilled salmon with quinoa', 500, 600), ('Tuna salad with leafy greens', 450, 550), ('Mackerel patties with veggies', 470, 570), ('Sardine wrap with spinach', 460, 560)],
        'Dinner': [('Baked salmon with roasted veggies', 600, 700), ('Poached fish with cauliflower rice', 550, 650), ('Grilled trout with asparagus', 580, 680), ('Tuna steak with zucchini noodles', 570, 670)]
    },
    'Vegetarian Meal': {
        'Breakfast': [('Greek yogurt with nuts and fruit', 300, 400), ('Tofu scramble with spinach', 350, 450), ('Overnight oats with chia seeds', 320, 420), ('Avocado toast with hemp seeds', 340, 440)],
        'Lunch': [('Lentil curry with brown rice', 450, 550), ('Black bean burger with greens', 400, 500), ('Chickpea salad with avocado', 430, 530), ('Veggie stir-fry with tofu', 420, 520)],
        'Dinner': [('Chickpea curry with veggies', 500, 600), ('Quinoa stuffed peppers', 450, 550), ('Lentil stew with sweet potato', 470, 570), ('Tofu stir-fry with broccoli', 460, 560)]
    },
    'Low-Carb Meal': {
        'Breakfast': [('Avocado egg cups', 300, 400), ('Keto sausage muffins', 350, 450), ('Bacon and spinach frittata', 320, 420), ('Almond flour pancakes', 340, 440)],
        'Lunch': [('Turkey meatballs with spinach', 450, 550), ('Steak salad with olive oil', 400, 500), ('Pork tenderloin with zucchini', 430, 530), ('Cauliflower fried rice with shrimp', 420, 520)],
        'Dinner': [('Pan-seared steak with cauliflower mash', 500, 600), ('Salmon with asparagus', 550, 650), ('Chicken thighs with Brussels sprouts', 520, 620), ('Pork chop with kale', 540, 640)]
    },
    'Mediterranean Meal': {
        'Breakfast': [('Greek yogurt with honey', 300, 400), ('Feta omelette with olives', 350, 450), ('Tomato and basil scramble', 320, 420), ('Hummus toast with cucumber', 340, 440)],
        'Lunch': [('Chicken quinoa salad', 450, 550), ('Hummus veggie wrap', 400, 500), ('Falafel bowl with tahini', 430, 530), ('Grilled fish with tabbouleh', 460, 560)],
        'Dinner': [('Baked salmon with couscous', 550, 650), ('Fish with roasted veggies', 500, 600), ('Lamb kebabs with tzatziki', 570, 670), ('Shrimp with Mediterranean rice', 540, 640)]
    }
}

# Exercise categories (unchanged, included for completeness)
exercise_categories = {
    'Full Body Stretch - 5 min': 'Stretching', 'Seated Hamstring Stretch - 10 min': 'Stretching',
    'Shoulder and Arm Stretch - 8 min': 'Stretching', 'Neck and Back Stretch - 6 min': 'Stretching',
    'Seated Cat-Cow Stretch - 7 min': 'Stretching', 'Hip Flexor Stretch - 8 min': 'Stretching',
    'Standing Quad Stretch - 6 min': 'Stretching', 'Gentle Yoga Flow - 10 min': 'Stretching',
    'Chest Opener Stretch - 5 min': 'Stretching', 'Side Bend Stretch - 7 min': 'Stretching',
    'Seated Forward Bend - 8 min': 'Stretching', 'Knee-to-Chest Stretch - 6 min': 'Stretching',
    'Butterfly Stretch - 7 min': 'Stretching', 'Triceps Stretch - 5 min': 'Stretching',
    'Calf Stretch - 6 min': 'Stretching', 'Seated Spinal Twist - 7 min': 'Stretching',
    'Standing Side Stretch - 6 min': 'Stretching', 'Doorway Chest Stretch - 5 min': 'Stretching',
    'Brisk Walking - 20 min': 'Cardio', 'Water Aerobics - 15 min': 'Cardio',
    'Stationary Cycling - 15 min': 'Cardio', 'Slow Pace Walking - 25 min': 'Cardio',
    'Step-Ups (Low Height) - 12 min': 'Cardio', 'Chair Cardio Dance - 10 min': 'Cardio',
    'Low-Impact Jumping Jacks - 12 min': 'Cardio', 'Seated Bike Pedaling - 15 min': 'Cardio',
    'Marching in Place - 20 min': 'Cardio', 'Side-to-Side Steps - 10 min': 'Cardio',
    'Arm Swing Cardio - 8 min': 'Cardio', 'Stair Climbing (Slow) - 15 min': 'Cardio',
    'Seated High Knees - 12 min': 'Cardio', 'Light Jogging in Place - 10 min': 'Cardio',
    'Chair Step Taps - 8 min': 'Cardio', 'Standing March - 15 min': 'Cardio',
    'Side Leg Swing Cardio - 12 min': 'Cardio', 'Arm Reach Cardio - 10 min': 'Cardio',
    'Seated Shadow Boxing - 15 min': 'Cardio', 'Slow Dance Moves - 12 min': 'Cardio',
    'Chair Squats - 10 min': 'Strength', 'Wall Push-Ups - 8 min': 'Strength',
    'Seated Resistance Band Rows - 10 min': 'Strength', 'Leg Press (Seated) - 12 min': 'Strength',
    'Arm Curls (Light Weights) - 8 min': 'Strength', 'Standing Heel Raises - 8 min': 'Strength',
    'Seated Shoulder Press - 10 min': 'Strength', 'Knee Extensions with Band - 12 min': 'Strength',
    'Seated Chest Press - 10 min': 'Strength', 'Standing Bicep Curls - 8 min': 'Strength',
    'Wall Sit - 6 min': 'Strength', 'Seated Tricep Dips - 8 min': 'Strength',
    'Leg Raises (Seated) - 10 min': 'Strength', 'Resistance Band Pull-Aparts - 8 min': 'Strength',
    'Chair Lunges - 10 min': 'Strength', 'Standing Side Arm Raises - 8 min': 'Strength',
    'Seated Calf Raises - 7 min': 'Strength', 'Light Dumbbell Rows - 10 min': 'Strength',
    'Seated Marching - 15 min': 'Mobility', 'Arm Circles - 5 min': 'Mobility',
    'Side Leg Lifts - 10 min': 'Mobility', 'Ankle Rotations - 6 min': 'Mobility',
    'Wrist and Finger Flex - 5 min': 'Mobility', 'Seated Torso Twists - 8 min': 'Mobility',
    'Hip Circles - 7 min': 'Mobility', 'Neck Rolls - 5 min': 'Mobility',
    'Shoulder Shrugs - 6 min': 'Mobility', 'Seated Hip Opener - 7 min': 'Mobility',
    'Toe Point and Flex - 5 min': 'Mobility', 'Standing Arm Swings - 8 min': 'Mobility',
    'Knee Circles - 6 min': 'Mobility', 'Gentle Side Sways - 7 min': 'Mobility'
}
exercise_list = list(exercise_categories.keys())

def predict_meal_plan(model, sample_input, label_encoders, label_encoder, meal_categories):
    expected_fields = ['Height', 'Weight', 'Age', 'Gender', 'Activity_Level', 'Goal', 
                       'Health_Condition', 'Dietary_Preference', 'Food_Allergy']
    
    filtered_input = {k: sample_input[k].strip() if isinstance(sample_input[k], str) else sample_input[k] 
                      for k in expected_fields if k in sample_input}
    print("Filtered input:", filtered_input)

    filtered_input['BMI'] = filtered_input['Weight'] / ((filtered_input['Height'] / 100) ** 2)
    filtered_input['BMI_Category'] = pd.cut([filtered_input['BMI']], bins=[0, 18.5, 24.9, 29.9, 100], 
                                            labels=['Underweight', 'Normal', 'Overweight', 'Obese'])[0]
    gender = filtered_input['Gender']
    bmr = (10 * filtered_input['Weight'] + 6.25 * filtered_input['Height'] - 5 * filtered_input['Age'] + 
           (5 if gender == 'Male' else -161))
    activity_multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725}
    filtered_input['Calorie_Goal'] = int(bmr * activity_multipliers[filtered_input['Activity_Level']])

    if 'Time_of_Day' not in filtered_input:
        hour = datetime.now().hour
        filtered_input['Time_of_Day'] = 'Breakfast' if hour < 12 else 'Lunch' if hour < 17 else 'Dinner'

    sample_df = pd.DataFrame([filtered_input])
    for column in ['Gender', 'Activity_Level', 'Goal', 'Health_Condition', 'Dietary_Preference', 
                   'Food_Allergy', 'BMI_Category', 'Time_of_Day']:
        try:
            sample_df[column] = label_encoders[column].transform(sample_df[column])
        except ValueError as e:
            print(f"Warning: Unseen label in {column}: {e}")
            return {'error': f"Invalid {column}: {sample_df[column].iloc[0]} not recognized"}

    predicted_category_encoded = model.predict(sample_df)
    predicted_category = label_encoder.inverse_transform(predicted_category_encoded)[0]

    # Debug override: Force meal_category based on Dietary_Preference
    dietary_to_category = {
        'Vegetarian': 'Vegetarian Meal',
        'Mediterranean': 'Mediterranean Meal',
        'Keto': 'Low-Carb Meal',
        'Pescatarian': 'Omega-3 Rich Meal',
        'No Restrictions': predicted_category,  # Use model prediction if no specific preference
        'Vegan': 'Vegetarian Meal',  # Treat Vegan as Vegetarian for now
    }
    if filtered_input['Dietary_Preference'] in dietary_to_category:
        predicted_category = dietary_to_category[filtered_input['Dietary_Preference']]
        print(f"Forced category to {predicted_category} based on Dietary_Preference: {filtered_input['Dietary_Preference']}")

    meal_options = meal_categories[predicted_category][filtered_input['Time_of_Day']]
    meal_data = [
        {
            'meal': meal[0],
            'calories': random.randint(meal[1], meal[2]),
            'details': f"{meal[0]} - A {predicted_category.lower()} suitable for {filtered_input['Time_of_Day'].lower()} with approximately {random.randint(meal[1], meal[2])} kcal."
        }
        for meal in meal_options
    ]

    return {
        'meal_category': predicted_category,
        'meals': meal_data,
        'time_of_day': filtered_input['Time_of_Day']
    }

@app.route('/predict_exercises', methods=['POST'])
def predict_exercises():
    try:
        data = request.get_json()
        cleaned_data = {k: v.strip() if isinstance(v, str) else v for k, v in data.items()}
        print("Received exercise input:", cleaned_data)
        suitable_exercises = []
        for exercise in exercise_list:
            df = pd.DataFrame([{
                'Height': cleaned_data['Height'],
                'Weight': cleaned_data['Weight'],
                'Age': cleaned_data['Age'],
                'Gender': le_gender.transform([cleaned_data['Gender']])[0],
                'Activity_Level': le_activity.transform([cleaned_data['Activity_Level']])[0],
                'Health_Condition': le_health.transform([cleaned_data['Health_Condition']])[0],
                'Goal': le_goal.transform([cleaned_data['Goal']])[0],
                'BMI': cleaned_data['Weight'] / (cleaned_data['Height'] / 100) ** 2,
                'Exercise_Routine': le_exercise.transform([exercise])[0],
                'Category': le_category.transform([exercise_categories[exercise]])[0]
            }])
            prediction = exercise_model.predict(df)[0]
            if prediction == 1:
                suitable_exercises.append(exercise)

        random.shuffle(suitable_exercises)
        selected = []
        categories_used = set()
        for ex in suitable_exercises:
            category = exercise_categories[ex]
            if category not in categories_used and len(selected) < 3:
                selected.append(ex)
                categories_used.add(category)

        if len(selected) < 3:
            for ex in suitable_exercises:
                if ex not in selected and len(selected) < 3:
                    selected.append(ex)

        print("Predicted exercises:", selected)
        return jsonify({'exercises': selected})
    except ValueError as e:
        print("Error in exercise prediction:", str(e))
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print("Error in exercise prediction:", str(e))
        return jsonify({'error': str(e)}), 400

@app.route('/predict_meal', methods=['POST'])
def predict_meal():
    try:
        data = request.get_json()
        print("Received input:", data)
        result = predict_meal_plan(meal_model, data, meal_label_encoders, meal_target_encoder, meal_categories)
        print("Prediction result:", result)
        return jsonify(result)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)