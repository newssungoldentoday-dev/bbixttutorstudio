#!/usr/bin/env bash
# nushell.sh - simple helper to start a demo static server
# Usage: ./nushell.sh [port]
PORT=${1:-8000}
echo "Starting demo static server on http://localhost:${PORT}"
# preferred: Python 3 http.server
python3 -m http.server ${PORT}
