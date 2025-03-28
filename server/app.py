from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to make requests

# SQLite Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///anonymous.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Database Model
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(500), nullable=False)

# Create Database
with app.app_context():
    db.create_all()

# Endpoint: Create a Post
@app.route("/post", methods=["POST"])
def create_post():
    data = request.json
    if not data.get("username") or not data.get("message"):
        return jsonify({"msg": "Username and message are required"}), 400

    new_post = Post(username=data["username"], message=data["message"])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"msg": "Post Created", "id": new_post.id}), 201

# Endpoint: Get All Posts
@app.route("/posts", methods=["GET"])
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all()
    return jsonify([{"id": p.id, "username": p.username, "message": p.message} for p in posts])

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
