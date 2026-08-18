#!/usr/bin/env bash
set -euo pipefail

VENV_DIR="${1:-/tmp/iter21-clean-venv}"
REQ_FILE="/app/backend/requirements.txt"

rm -rf "$VENV_DIR"
python3 -m venv "$VENV_DIR"
env -u PIP_EXTRA_INDEX_URL -u PIP_INDEX_URL PIP_CONFIG_FILE=/dev/null \
  "$VENV_DIR/bin/python" -m pip install --upgrade pip
env -u PIP_EXTRA_INDEX_URL -u PIP_INDEX_URL PIP_CONFIG_FILE=/dev/null \
  "$VENV_DIR/bin/pip" install -r "$REQ_FILE"
env -u PIP_EXTRA_INDEX_URL -u PIP_INDEX_URL PIP_CONFIG_FILE=/dev/null \
  "$VENV_DIR/bin/python" -c 'import gspread; print(gspread.__version__)'
