from flask import Flask
from v2.scrapers.init_driver import init_driver
from v2.routes import football, nba, mlb

app = Flask(__name__)
app.register_blueprint(football.bp)
app.register_blueprint(nba.bp)
app.register_blueprint(mlb.bp)


@app.route("/health", methods=["GET"])
def health_check():
    init_driver()
    return {"status": "OK"}, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
