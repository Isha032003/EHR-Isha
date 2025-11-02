# -*- coding: utf-8 -*-
"""
Milestone 3 — Local Version
Adapted from Google Colab script to run on desktop Python (VS Code, etc.)
"""

import os
import zipfile
import shutil
import pandas as pd
from tqdm import tqdm
from transformers import pipeline
import easyocr

# === Setup directories ===
WORK_DIR = "clinical_note_gen"
DATA_ZIP = r"C:\Users\khair\OneDrive\Desktop\EHR\Dataset.zip"  # <- change if needed
DATA_PATH = os.path.splitext(DATA_ZIP)[0]  # same folder name without .zip
OUTPUT_PATH = os.path.join(WORK_DIR, "results_M3")

os.makedirs(WORK_DIR, exist_ok=True)
os.makedirs(OUTPUT_PATH, exist_ok=True)

print("✅ Working directory:", os.getcwd())
print("✅ Data path:", DATA_PATH)

# === Extract dataset ===
if not os.path.exists(DATA_PATH):
    print("📦 Extracting dataset...")
    with zipfile.ZipFile(DATA_ZIP, "r") as z:
        z.extractall(DATA_PATH)
    print("✅ Dataset extracted to:", DATA_PATH)
else:
    print("✅ Dataset already extracted.")

# === Collect image paths ===
image_paths = []
for root, _, files in os.walk(DATA_PATH):
    for f in files:
        if f.lower().endswith((".jpg", ".jpeg", ".png")):
            image_paths.append(os.path.join(root, f))

print(f"✅ Found {len(image_paths)} images.")
if image_paths:
    print("🧠 Example paths:", image_paths[:5])

# === OCR: Extract text from images ===
reader = easyocr.Reader(["en"])
data = []

for img_path in tqdm(image_paths, desc="🔍 Extracting text from images"):
    result = reader.readtext(img_path, detail=0)
    text = " ".join(result)
    data.append({"image_path": img_path, "extracted_text": text})

df = pd.DataFrame(data)
ocr_csv = os.path.join(OUTPUT_PATH, "ocr_results.csv")
df.to_csv(ocr_csv, index=False)
print("✅ OCR complete →", ocr_csv)

# === Clinical note generation ===
note_generator = pipeline("text2text-generation", model="google/flan-t5-base")

generated_notes = []
for text in tqdm(df["extracted_text"], desc="🩺 Generating clinical notes"):
    if not text.strip():
        generated_notes.append("No text detected in image.")
    else:
        prompt = f"Generate a concise clinical note summarizing this patient information: {text}"
        result = note_generator(prompt, max_length=80, do_sample=True)
        generated_notes.append(result[0]["generated_text"])

df["generated_note"] = generated_notes
notes_csv = os.path.join(OUTPUT_PATH, "generated_clinical_notes.csv")
df.to_csv(notes_csv, index=False)
print("✅ Clinical notes generated →", notes_csv)

# === ICD-10 classification ===
icd_classifier = pipeline("text-classification", model="roberta-large-mnli")

predicted_labels = []
for note in tqdm(df["generated_note"], desc="🏷️ Predicting ICD-10 labels"):
    result = icd_classifier(note)
    predicted_labels.append(result[0]["label"])

df["predicted_icd10"] = predicted_labels
final_csv = os.path.join(OUTPUT_PATH, "final_notes_with_icd10.csv")
df.to_csv(final_csv, index=False)
print("✅ ICD-10 coding complete →", final_csv)

# === Sample preview ===
sample = df.sample(min(3, len(df)))
for _, row in sample.iterrows():
    print(f"\n🩻 Image: {row['image_path']}")
    print(f"🧾 Extracted Text: {row['extracted_text']}")
    print(f"🧠 Generated Note: {row['generated_note']}")
    print(f"🏷️ ICD-10 Prediction: {row['predicted_icd10']}")

# === Zip final results ===
final_zip = os.path.join(WORK_DIR, "results_M3.zip")
shutil.make_archive(final_zip.replace(".zip", ""), "zip", OUTPUT_PATH)
print(f"📦 Final results zipped → {final_zip}")
