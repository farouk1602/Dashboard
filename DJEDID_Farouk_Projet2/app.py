from flask import Flask, render_template  
from flask import jsonify
import json
from flaskext.mysql import MySQL  

app = Flask(__name__)  



mysql = MySQL()


#ces des lignes des configurations
app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

mysql.init_app(app)

app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')
	

@app.route('/api/data')
def doGetData1():
	conn = mysql.connect()  
	cursor =conn.cursor()	
	cursor.execute("SELECT specialite, COUNT(*) AS nombre_etudiants FROM resultats WHERE annee = 2019 GROUP BY specialite ") 

	data = cursor.fetchall()  
	row_headers=[x[0] for x in cursor.description]

	cursor.close()  

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)  
	
	

	
@app.route('/api/data2')
def doGetData2():
      
	data = {"years":[], "datasets":[]}
      
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	annee_tuple = cursor.fetchall()
	annee_list =  [item[0] for item in annee_tuple]
	data["annee"]=annee_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	
	for specialite in specialite_list:
		cursor.execute("SELECT AVG(moyenne) FROM resultats WHERE specialite = %s GROUP BY annee", (specialite,))
		moyenne_tuple = cursor.fetchall()
		moyenne_list = [item[0] for item in moyenne_tuple]

		data["datasets"].append({"label": specialite, "data": moyenne_list})

	data_JSON = json.dumps(data)	
	return data_JSON 	



@app.route('/api/data3')
def doGetData3():

    conn = mysql.connect()	
    cursor = conn.cursor()	
    cursor.execute("SELECT sexe, COUNT(*) AS nombre_etudiants FROM resultats WHERE moyenne >= 10 GROUP BY sexe ")	

    data = cursor.fetchall()	
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))					
					
    return jsonify(json_data)


@app.route('/api/data4')
def doGetData4():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT count(*) as count , specialite FROM resultats WHERE sexe = 'h' GROUP BY specialite HAVING AVG(moyenne) >= 10 ")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)



@app.route('/api/data5')
def doGetData5():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT count(moyenne) as cmoy2,annee FROM resultats WHERE moyenne < 10 GROUP BY annee")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)

@app.route('/api/data6')
def doGetData6():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT count(moyenne) as cmoy,annee FROM resultats WHERE moyenne >= 10 GROUP BY annee")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)


@app.route('/api/data7')
def doGetData7():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT specialite, SUM(CASE WHEN sexe = 'f' THEN 1 ELSE 0 END) AS count_women, SUM(CASE WHEN sexe = 'h' THEN 1 ELSE 0 END) AS count_men FROM resultats WHERE annee = 2020 AND moyenne >= 10 GROUP BY specialite ")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)


@app.route('/api/data8')
def doGetData8():
	
	conn = mysql.connect()	
	cursor =conn.cursor()		
	cursor.execute("SELECT CASE WHEN moyenne BETWEEN 0 AND 10 THEN 'Les moyennes entre 0 et 10' WHEN moyenne BETWEEN 10 AND 20 THEN 'Les moyennes entre 10 et 20' END AS categorie, COUNT(*) AS nb_etudiants FROM resultats WHERE moyenne IS NOT NULL GROUP BY categorie")	
	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)



	
if __name__ == '__main__':
	app.run(debug=True, port=5000)
	
	


