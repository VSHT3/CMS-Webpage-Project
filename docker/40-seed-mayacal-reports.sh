#!/bin/sh
set -eu

source_dir="${CMS_PDF_SOURCE_DIR:-/usr/share/nginx/html/assets/reports/grants}"
target_dir="${CMS_PDF_TARGET_DIR:-/usr/share/nginx/html/assets/pdfs/grants}"

mkdir -p "$target_dir"

copy_report() {
  report_name="$1"
  temporary_file="$target_dir/.${report_name}.tmp.$$"

  cp "$source_dir/$report_name" "$temporary_file"
  chmod 0644 "$temporary_file"
  mv -f "$temporary_file" "$target_dir/$report_name"
}

copy_report mayacal-report-3.pdf
copy_report mayacal-final-report.pdf
