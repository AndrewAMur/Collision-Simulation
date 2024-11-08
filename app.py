from flask import Flask, render_template, jsonify, request
import math

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def calculate_collision(m1, m2, v1, v2):
    v1_final = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
    v2_final = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
    return v1_final, v2_final

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    m1 = data['m1']
    m2 = data['m2']
    v1 = data['v1']
    v2 = data['v2']
    
    v1_final, v2_final = calculate_collision(m1, m2, v1, v2)
    
    return jsonify({
        'v1_final': v1_final,
        'v2_final': v2_final
    })

if __name__ == '__main__':
    app.run(debug=True)
