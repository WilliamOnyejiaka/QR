from flask import Blueprint, request, jsonify, send_file
from PIL import Image
from pyzbar.pyzbar import decode 
import os
from werkzeug.utils import secure_filename
import qrcode
import time

image = Blueprint('image',__name__,url_prefix='/api/v1/image')

@image.post("/generate-qrcode")
def generate_qrcode():
	data = request.get_json().get("data",None)
	if data == None:
		return jsonify({
			'error':True,
			'message':"data missing"
		}),400

	my_qr = qrcode.make(data)
	name = f'{round(time.time() * 1000)}.png'
	my_qr.save(f'src/qrimage/{name}')

	return jsonify({
		'error':False,
		'message':"generated",
		'image_name':name
	}),200


@image.get("/get-image/<image_name>")
def get_image(image_name):
	check_file = os.path.isfile(f'./src/qrimage/{image_name}')
	if not check_file:
		return jsonify({
			'error': True,
			'message':"file not found"
		}),404
	return send_file(f'qrimage/{image_name}', mimetype="image/png")

@image.post('/decode')
def decode_qr():
	image_file = request.files.get('image_file', None)

	if image_file == None:
		return jsonify({
			'error':True,
			'message':"image_file missing"
		}),400

	new_name = round(time.time() * 1000)
	extension = (image_file.mimetype.split("/"))[1]
	image_file.filename = f'{new_name}.{extension}'

	secure_image_filename = secure_filename(image_file.filename)
	image_file.save(os.path.join("image",secure_image_filename))
	
	data = decode(Image.open(f'image/{image_file.filename}'))
	os.remove(os.path.join("image",image_file.filename))

	if data == []:
		return jsonify({
			'error': True,
			'message': "Not a valid qr code"
		}), 400
	decoded_data = data[0].data.decode("ascii")

	return jsonify({
		'error':False,
		'message':decoded_data
	}),201

@image.delete("/delete-qr/<image_name>")
def delete_qrcode(image_name):
	check_file = os.path.isfile(f'./src/qrimage/{image_name}')
	if not check_file:
		return jsonify({
			'error': True,
			'message': "file not found"
		}), 404

	os.remove(os.path.join("src/qrimage", image_name))

	return jsonify({
		'error':False,
		'message':image_name
	})