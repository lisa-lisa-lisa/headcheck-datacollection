import json
import base64
import flask
import cv2
import io
import base64
import time
import PIL
from PIL import Image
from flask import request, render_template, jsonify
from pathlib import Path

app = flask.Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/snapshot")
def snapshot():
    # output meta file

    return render_template("snapshot.html")

@app.route("/save", methods=["POST"])
def save():
    # if meta doesn't exist then create
    # save images
    data = request.get_json(force = True)
    base_path = Path("database")
    base_path.mkdir(exist_ok=True)
    user_path = base_path / data["username"]
    print(user_path)
    photo_path = user_path / "photos"
    if not user_path.exists():
        #save meta data and images
        user_path.mkdir()
        photo_path.mkdir()

    my_meta_path = user_path / "meta.json"
    with open(my_meta_path,"w") as file:
        photo = data.pop("photo")
        photo_string = photo.split(",")
        photo_value = photo_string[1]
        file.write(json.dumps(data,indent = 2))

    # print(photo_value,file=open("filename","w"))
    # convert photo
    image_data = base64.b64decode(photo_value)
    image = Image.open(io.BytesIO(image_data))
    t = int(time.time())
    photo_file = photo_path / (str(t)+".jpg")
    image.convert("RGB").save(str(photo_file))
    # with open(photo_file,"wb") as f:
    #     f.write(image)

    return jsonify({"ok":True})

app.run(debug=True)
