from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    comments = db.relationship('Comment', backref='post', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

@app.route("/")
def home():
    return "Welcome to Personal Blog"

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json
    new_post = Post(title=data['title'], content=data['content'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'id': new_post.id, 'title': new_post.title, 'content': new_post.content})

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{'id': post.id, 'title': post.title, 'content': post.content, 'comments': [comment.content for comment in post.comments]} for post in posts])

@app.route('/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'})

@app.route('/posts/<int:id>/comments', methods=['POST'])
def add_comment(id):
    data = request.json
    post = Post.query.get_or_404(id)
    new_comment = Comment(content=data['comment'], post_id=post.id)
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'id': post.id, 'title': post.title, 'content': post.content, 'comments': [comment.content for comment in post.comments]})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

    db.create_all()
    app.run(debug=True)
