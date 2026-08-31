#!/bin/sh
set -eu

target=${CMS_PDF_TARGET:-/usr/share/nginx/html/assets/pdfs/grants}
source=${CMS_PDF_SOURCE:-/opt/cms-pdf-seed/grants}

mkdir -p "$target"
cp "$source/mayacal-report-1.pdf" "$target/mayacal-report-1.pdf"
cp "$source/mayacal-report-2.pdf" "$target/mayacal-report-2.pdf"
cp "$source/mayacal-report-3.pdf" "$target/mayacal-report-3.pdf"
cp "$source/mayacal-final-report.pdf" "$target/mayacal-final-report.pdf"
cp "$source/A1-Database-POTBELLY.pdf" "$target/A1-Database-POTBELLY.pdf"
cp "$source/potbelly-final-report.pdf" "$target/potbelly-final-report.pdf"
