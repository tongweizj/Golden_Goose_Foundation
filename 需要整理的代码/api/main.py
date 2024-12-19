from flask import Flask,request,render_template,url_for,jsonify,redirect,flash
from flask_sqlalchemy import SQLAlchemy

# Init App
app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'
# our database uri
username = "postgres"
password = "mysecretpassword"
dbname = "smart_fund_tracker"
host='127.0.0.1'
port='5432' 
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{username}:{password}@{host}:5432/{dbname}"
app.config["SQLALCHEMY_ECHO"] = True

db = SQLAlchemy(app)

# Create A Model For Table
class FundDailyPrice(db.Model):
    __tablename__ = 'fund_daily_price'
    id = db.Column(db.Integer, primary_key=True)
    fund_code = db.Column(db.String(10))
    date = db.Column(db.Date)
    price = db.Column(db.Float(precision="10,4"))



@app.route('/',methods=['GET'])
def index():
    posts = FundDailyPrice.query.all()
    return render_template("index.html",posts=posts)



# 更新 某只基金的某一天收盘价格情况
@app.route('/api/v1/fund/daily/price', methods=['POST'])
def ark():
    if request.method == 'POST':
        data = request.get_json()
        message = data['message']
        # 在此处添加将 message 保存到 PostgreSQL 的代码
        # 将时间和价格分别保存到表中
        fund_code = message['code']
        date = message['date']
        price = float(message['price'])
        print('price',price)
        blog_post = FundDailyPrice(fund_code=fund_code,date=date,price=price)
        db.session.add(blog_post)
    
        db.session.commit()
        flash("Post Added")
      
       
        # 返回保存成功的提示信息
        return jsonify({'status': 'success', 'message': 'Data saved successfully!'})
    else:
        # 返回请求方法不支持的错误信息
        return jsonify({'status': 'error', 'message': 'Method not allowed!'}), 405


if __name__ == '__main__':
    with app.app_context():
        db.create_all() # <--- create db object.
    app.run(debug=True)