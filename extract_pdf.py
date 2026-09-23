import pypdf

reader = pypdf.PdfReader('assets/Poojashree_Technical_Profile.pdf')
print(f"Total Pages: {len(reader.pages)}")
for i, page in enumerate(reader.pages):
    print(f"=== PAGE {i+1} ===")
    print(page.extract_text())
