from flask import Flask, render_template
from .api.v1.routes.image import image

def create_app():
	app = Flask(__name__,template_folder='templates')

	@app.get("/")
	def index():
		return render_template("index.html")

	@app.get("/decode")
	def decode():
		return render_template("decode.html")

	@app.get("/generate-qrcode")
	def generate_qrcode():
		return render_template("generate_qrcode.html")

	app.register_blueprint(image)

	return app