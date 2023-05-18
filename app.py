from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
from bson.objectid import ObjectId
from pymongo import MongoClient
import certifi 
ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.dvzynwy.mongodb.net/?retryWrites=true&w=majority', tlsCAFile = ca )

db = client.dbsparta


@app.route('/')
def home():
   return render_template('index.html')



# 댓글 가져오기
@app.route("/showComment", methods=["GET"])
def comment_get():
       teamComment_data = list(db.teamComment.find())
       for i in range(len(teamComment_data)):
        teamComment_data[i]['_id'] = str(teamComment_data[i]['_id'])
       return jsonify({'result': teamComment_data })



# 댓글 작성
@app.route("/introPosting", methods=["POST"])
def comment_post():
    comment_receive = request.form['comment_give']
   #  num = len(list(db.fan.find({},{'_id':False})))


    doc = {'comment': comment_receive,
           'like' : 0, 
    }
    db.teamComment.insert_one(doc)
    
    return jsonify({'msg': '저장 완료!'})





#DELETE
@app.route("/comment_delete", methods=["POST"])
def comment_delete():
    id_receive = request.form['id']
    db.teamComment.delete_one({'_id': ObjectId(id_receive)})
    return jsonify({'msg':"삭제 완료!"})





# 좋아요
@app.route("/fan/like", methods=["POST"]) 
def fan_like():
    like_receive = request.form['like_give']
    id_receive = request.form['id_give']

    db.teamComment.update_one({'_id': ObjectId(id_receive)},{'$set': {'like' : int(like_receive) + 1 }})
    return jsonify({'msg':'좋아요'})


if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)