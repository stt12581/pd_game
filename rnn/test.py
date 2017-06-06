from __future__ import print_function
import numpy as np
np.random.seed(1337)  # for reproducibility

from keras.preprocessing import sequence
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense, Activation, Embedding, TimeDistributed, Bidirectional
from keras.layers.core import Masking
from keras.optimizers import SGD, RMSprop
from keras.callbacks import EarlyStopping,ModelCheckpoint
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from math import tan
import json

TEST_FILE = "../haha"
DIMENSION = 153
PORT_NUMBER = 8080

def scaleLastNum(pred):
	return 2.76 * tan(pred[len(pred) - 1])

def run(feature):
	x = feature.split()
        if len(x) == 0:
		return {'E': 0, 'P': 0, 'A': 0}

	x = [float(num) for num in x]
	x = np.reshape(x, (1, 1, DIMENSION))	

	global total
	if total is None:
		total = x
	else:
		total = np.concatenate((total, x), axis = 1)
		if len(total[0]) > 3:
			total = np.delete(total, 0, axis = 1)

	e_pred = model_DV.predict(total, verbose=0).flatten()
	p_pred = model_DP.predict(total, verbose=0).flatten()
	a_pred = model_DA.predict(total, verbose=0).flatten()

	return {'E': scaleLastNum(e_pred), 'P': scaleLastNum(p_pred), 'A': scaleLastNum(a_pred)}

#This class will handles any incoming request from the browser 
class myHandler(BaseHTTPRequestHandler):
	#Handler for the GET requests
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','text/json')
		self.end_headers()
		# # Send the html message
		# result = run()
		# self.wfile.write(json.dumps(result))
		return

	def do_POST(self):
		content_len = int(self.headers.getheader('content-length', 0))
		post_body = self.rfile.read(content_len)
		#print("Received: ", post_body)

		self.send_response(200)
		self.send_header('Content-type','text/json')
		self.end_headers()
		# Send the html message
		result = run(post_body)
		self.wfile.write(json.dumps(result))
		return

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print('Started httpserver on port ' , PORT_NUMBER)

	model_DV = load_model('FHOG_PCA_DV_model')
	model_DP = load_model('FHOG_PCA_DP_model')
	model_DA = load_model('FHOG_PCA_DA_model')
	print('Finish loading PCA models...')

	total = None
	
	#Wait forever for incoming http requests
	server.serve_forever()

except KeyboardInterrupt:
	print('^C received, shutting down the web server')
	server.socket.close()

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)
