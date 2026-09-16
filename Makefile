install-backend:
	python3 -m venv backend/.venv && . backend/.venv/bin/activate && pip install -r backend/requirements.txt

run-backend:
	. backend/.venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

run-db:
	docker compose up -d db

help:
	@echo "Available commands:"
	@echo "  make install-backend"
	@echo "  make run-db"
	@echo "  make run-backend"
