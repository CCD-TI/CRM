from shared.Server import create_app
import os

app = create_app()

if __name__ == "__main__":
    puerto = int(os.getenv("PORT", "8007"))
    app.run(debug=True, host="0.0.0.0", port=puerto)
