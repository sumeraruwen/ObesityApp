# from flask import Flask, request, jsonify
# import pandas as pd
# import numpy as np
# import pickle

# app = Flask(__name__)

# # Load the trained model and encoders
# with open('meal_plan_model.pkl', 'rb') as f:
#     model = pickle.load(f)
# with open('label_encoders.pkl', 'rb') as f:
#     label_encoders = pickle.load(f)
# with open('target_encoder.pkl', 'rb') as f:
#     label_encoder = pickle.load(f)

# # Meal categories
# meal_categories = {
#     'High-Protein Meal': [
#         'Grilled chicken breast with quinoa and vegetables',
#         'Pan-seared steak with sweet potato mash and steamed broccoli',
#         'Baked turkey with brown rice and mixed vegetables'
#     ],
#     'Omega-3 Rich Meal': [
#         'Grilled salmon with brown rice and steamed green vegetables',
#         'Baked salmon with quinoa and roasted vegetables',
#         'Poached fish with cauliflower rice and leafy greens'
#     ],
#     'Vegetarian Meal': [
#         'Lentil curry with brown rice',
#         'Black bean burger with sweet potato wedges and mixed greens',
#         'Chickpea curry with steamed vegetables'
#     ],
#     'Low-Carb Meal': [
#         'Grilled chicken breast with avocado and roasted vegetables',
#         'Pan-seared steak with cauliflower mash and steamed broccoli',
#         'Baked salmon with asparagus and butter sauce'
#     ],
#     'Mediterranean Meal': [
#         'Grilled chicken breast with quinoa and roasted vegetables',
#         'Baked salmon with whole grain couscous and steamed broccoli',
#         'Poached fish with brown rice and mixed vegetables'
#     ]
# }

# def predict_meal_plan(sample_input):
#     try:
#         # Validate and convert inputs
#         required_fields = ['Weight', 'Height', 'Gender', 'Activity_Level', 'Goal', 
#                          'Health_Condition', 'Dietary_Preference', 'Food_Allergy']
#         for field in required_fields:
#             if field not in sample_input or not sample_input[field]:
#                 raise ValueError(f"Missing or empty field: {field}")

#         # Convert Weight and Height to float
#         sample_input['Weight'] = float(sample_input['Weight'])
#         sample_input['Height'] = float(sample_input['Height'])

#         # Calculate BMI
#         sample_input['BMI'] = sample_input['Weight'] / ((sample_input['Height'] / 100) ** 2)
#         sample_input['BMI_Category'] = pd.cut([sample_input['BMI']], 
#                                             bins=[0, 18.5, 24.9, 29.9, 100],
#                                             labels=['Underweight', 'Normal', 'Overweight', 'Obese'])[0]

#         # Prepare DataFrame
#         sample_df = pd.DataFrame([sample_input])
#         for column in ['Gender', 'Activity_Level', 'Goal', 'Health_Condition', 
#                       'Dietary_Preference', 'Food_Allergy', 'BMI_Category']:
#             if column not in label_encoders:
#                 raise ValueError(f"Label encoder missing for {column}")
#             if sample_df[column].iloc[0] not in label_encoders[column].classes_:
#                 raise ValueError(f"Invalid value for {column}: {sample_df[column].iloc[0]}")
#             sample_df[column] = label_encoders[column].transform(sample_df[column])

#         # Predict
#         predicted_category_encoded = model.predict(sample_df)
#         predicted_category = label_encoder.inverse_transform(predicted_category_encoded)[0]
#         recommended_meal = np.random.choice(meal_categories[predicted_category])

#         return {'category': predicted_category, 'meal': recommended_meal}
#     except Exception as e:
#         print(f"Error in predict_meal_plan: {str(e)}")  # Log to Flask console
#         raise

# @app.route('/predict_meal', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No JSON data provided'}), 400
#         print(f"Received data: {data}")  # Log incoming data
#         result = predict_meal_plan(data)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)


from flask import Flask, request, jsonify
import pickle
import pandas as pd
from datetime import datetime
import random  # Added missing import

app = Flask(__name__)

# Load model and encoders
with open('meal_plan_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)
with open('target_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Meal categories
meal_categories = {
    'High-Protein Meal': {
        'Breakfast': [('Protein oatmeal with berries', 350, 450), ('Egg scramble with turkey bacon', 400, 500)],
        'Lunch': [('Grilled chicken breast with quinoa', 500, 600), ('Turkey wrap with veggies', 450, 550)],
        'Dinner': [('Pan-seared steak with sweet potato', 600, 700), ('Baked turkey with brown rice', 550, 650)]
    },
    'Omega-3 Rich Meal': {
        'Breakfast': [('Salmon avocado toast', 400, 500), ('Chia seed pudding with fish oil', 350, 450)],
        'Lunch': [('Grilled salmon with quinoa', 500, 600), ('Tuna salad with leafy greens', 450, 550)],
        'Dinner': [('Baked salmon with roasted veggies', 600, 700), ('Poached fish with cauliflower rice', 550, 650)]
    },
    'Vegetarian Meal': {
        'Breakfast': [('Greek yogurt with nuts and fruit', 300, 400), ('Tofu scramble with spinach', 350, 450)],
        'Lunch': [('Lentil curry with brown rice', 450, 550), ('Black bean burger with greens', 400, 500)],
        'Dinner': [('Chickpea curry with veggies', 500, 600), ('Quinoa stuffed peppers', 450, 550)]
    },
    'Low-Carb Meal': {
        'Breakfast': [('Avocado egg cups', 300, 400), ('Keto sausage muffins', 350, 450)],
        'Lunch': [('Grilled chicken with avocado', 450, 550), ('Steak salad with olive oil', 400, 500)],
        'Dinner': [('Pan-seared steak with cauliflower mash', 500, 600), ('Salmon with asparagus', 550, 650)]
    },
    'Mediterranean Meal': {
        'Breakfast': [('Greek yogurt with honey', 300, 400), ('Feta omelette with olives', 350, 450)],
        'Lunch': [('Chicken quinoa salad', 450, 550), ('Hummus veggie wrap', 400, 500)],
        'Dinner': [('Baked salmon with couscous', 550, 650), ('Fish with roasted veggies', 500, 600)]
    }
}

def predict_meal_plan(model, sample_input, label_encoders, label_encoder, meal_categories):
    # Define expected fields
    expected_fields = ['Height', 'Weight', 'Age', 'Gender', 'Activity_Level', 'Goal', 
                       'Health_Condition', 'Dietary_Preference', 'Food_Allergy']
    
    # Filter input to only expected fields
    filtered_input = {k: sample_input[k] for k in expected_fields if k in sample_input}
    print("Filtered input:", filtered_input)  # Debugging

    # Calculate BMI and Calorie Goal
    filtered_input['BMI'] = filtered_input['Weight'] / ((filtered_input['Height'] / 100) ** 2)
    filtered_input['BMI_Category'] = pd.cut([filtered_input['BMI']], bins=[0, 18.5, 24.9, 29.9, 100], 
                                            labels=['Underweight', 'Normal', 'Overweight', 'Obese'])[0]
    gender = filtered_input['Gender']
    bmr = (10 * filtered_input['Weight'] + 6.25 * filtered_input['Height'] - 5 * filtered_input['Age'] + 
           (5 if gender == 'Male' else -161))
    activity_multipliers = {'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725}
    filtered_input['Calorie_Goal'] = int(bmr * activity_multipliers[filtered_input['Activity_Level']])

    # Determine time of day
    if 'Time_of_Day' not in filtered_input:
        hour = datetime.now().hour
        filtered_input['Time_of_Day'] = 'Breakfast' if hour < 12 else 'Lunch' if hour < 17 else 'Dinner'

    # Encode input
    sample_df = pd.DataFrame([filtered_input])
    for column in ['Gender', 'Activity_Level', 'Goal', 'Health_Condition', 'Dietary_Preference', 
                   'Food_Allergy', 'BMI_Category', 'Time_of_Day']:
        sample_df[column] = label_encoders[column].transform(sample_df[column])

    # Predict meal category
    predicted_category_encoded = model.predict(sample_df)
    predicted_category = label_encoder.inverse_transform(predicted_category_encoded)[0]
    
    # Match calories to goal
    meal_options = meal_categories[predicted_category][filtered_input['Time_of_Day']]
    best_meal = min(meal_options, key=lambda x: abs(x[1] - (filtered_input['Calorie_Goal'] // 3)))
    meal_name, min_cal, max_cal = best_meal
    calories = random.randint(min_cal, max_cal)  # Uses random here

    return {
        'meal_category': predicted_category,
        'meal': meal_name,
        'calories': calories,
        'time_of_day': filtered_input['Time_of_Day'],
        'details': f"{meal_name} - A {predicted_category.lower()} suitable for {filtered_input['Time_of_Day'].lower()} with approximately {calories} kcal."
    }

@app.route('/predict_meal', methods=['POST'])
def predict_meal():
    try:
        data = request.get_json()
        print("Received input:", data)  # Debugging
        result = predict_meal_plan(model, data, label_encoders, label_encoder, meal_categories)
        print("Prediction result:", result)  # Debugging
        return jsonify(result)
    except Exception as e:
        print("Error:", str(e))  # Debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)