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

# # Meal categories (same as in Colab)
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
#     sample_input['BMI'] = float(sample_input['Weight']) / ((float(sample_input['Height']) / 100) ** 2)
#     sample_input['BMI_Category'] = pd.cut([sample_input['BMI']], bins=[0, 18.5, 24.9, 29.9, 100],
#                                           labels=['Underweight', 'Normal', 'Overweight', 'Obese'])[0]

#     sample_df = pd.DataFrame([sample_input])
#     for column in ['Gender', 'Activity_Level', 'Goal', 'Health_Condition', 'Dietary_Preference', 'Food_Allergy', 'BMI_Category']:
#         sample_df[column] = label_encoders[column].transform(sample_df[column])

#     predicted_category_encoded = model.predict(sample_df)
#     predicted_category = label_encoder.inverse_transform(predicted_category_encoded)[0]
#     recommended_meal = np.random.choice(meal_categories[predicted_category])

#     return {'category': predicted_category, 'meal': recommended_meal}

# @app.route('/predict_meal', methods=['POST'])
# def predict():
#     try:
#         data = request.json
#         result = predict_meal_plan(data)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)

from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)

# Load the trained model and encoders
with open('meal_plan_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)
with open('target_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Meal categories
meal_categories = {
    'High-Protein Meal': [
        'Grilled chicken breast with quinoa and vegetables',
        'Pan-seared steak with sweet potato mash and steamed broccoli',
        'Baked turkey with brown rice and mixed vegetables'
    ],
    'Omega-3 Rich Meal': [
        'Grilled salmon with brown rice and steamed green vegetables',
        'Baked salmon with quinoa and roasted vegetables',
        'Poached fish with cauliflower rice and leafy greens'
    ],
    'Vegetarian Meal': [
        'Lentil curry with brown rice',
        'Black bean burger with sweet potato wedges and mixed greens',
        'Chickpea curry with steamed vegetables'
    ],
    'Low-Carb Meal': [
        'Grilled chicken breast with avocado and roasted vegetables',
        'Pan-seared steak with cauliflower mash and steamed broccoli',
        'Baked salmon with asparagus and butter sauce'
    ],
    'Mediterranean Meal': [
        'Grilled chicken breast with quinoa and roasted vegetables',
        'Baked salmon with whole grain couscous and steamed broccoli',
        'Poached fish with brown rice and mixed vegetables'
    ]
}

def predict_meal_plan(sample_input):
    try:
        # Validate and convert inputs
        required_fields = ['Weight', 'Height', 'Gender', 'Activity_Level', 'Goal', 
                         'Health_Condition', 'Dietary_Preference', 'Food_Allergy']
        for field in required_fields:
            if field not in sample_input or not sample_input[field]:
                raise ValueError(f"Missing or empty field: {field}")

        # Convert Weight and Height to float
        sample_input['Weight'] = float(sample_input['Weight'])
        sample_input['Height'] = float(sample_input['Height'])

        # Calculate BMI
        sample_input['BMI'] = sample_input['Weight'] / ((sample_input['Height'] / 100) ** 2)
        sample_input['BMI_Category'] = pd.cut([sample_input['BMI']], 
                                            bins=[0, 18.5, 24.9, 29.9, 100],
                                            labels=['Underweight', 'Normal', 'Overweight', 'Obese'])[0]

        # Prepare DataFrame
        sample_df = pd.DataFrame([sample_input])
        for column in ['Gender', 'Activity_Level', 'Goal', 'Health_Condition', 
                      'Dietary_Preference', 'Food_Allergy', 'BMI_Category']:
            if column not in label_encoders:
                raise ValueError(f"Label encoder missing for {column}")
            if sample_df[column].iloc[0] not in label_encoders[column].classes_:
                raise ValueError(f"Invalid value for {column}: {sample_df[column].iloc[0]}")
            sample_df[column] = label_encoders[column].transform(sample_df[column])

        # Predict
        predicted_category_encoded = model.predict(sample_df)
        predicted_category = label_encoder.inverse_transform(predicted_category_encoded)[0]
        recommended_meal = np.random.choice(meal_categories[predicted_category])

        return {'category': predicted_category, 'meal': recommended_meal}
    except Exception as e:
        print(f"Error in predict_meal_plan: {str(e)}")  # Log to Flask console
        raise

@app.route('/predict_meal', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        print(f"Received data: {data}")  # Log incoming data
        result = predict_meal_plan(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)