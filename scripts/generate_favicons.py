
import os
from PIL import Image

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_IMAGE = os.path.join(BASE_DIR, 'public', 'static', 'images', 'DK-logo.png')
OUTPUT_DIR = os.path.join(BASE_DIR, 'public', 'static', 'favicons')

# Ensure output directory exists
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def generate_favicons():
    try:
        img = Image.open(SOURCE_IMAGE)
        print(f"Loaded source image: {SOURCE_IMAGE}")

        # Define sizes and filenames
        # Format: (width, height, filename)
        configs = [
            (16, 16, 'favicon-16x16.png'),
            (32, 32, 'favicon-32x32.png'),
            (96, 96, 'android-chrome-96x96.png'),
            (150, 150, 'mstile-150x150.png'),
            (180, 180, 'apple-touch-icon.png'), # Using 180x180 as modern standard
            # (76, 76, 'apple-touch-icon.png'), # Uncomment if strictly following current layout.tsx
        ]

        for width, height, filename in configs:
            # Resize with LANCZOS for best quality
            resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
            output_path = os.path.join(OUTPUT_DIR, filename)
            resized_img.save(output_path)
            print(f"Generated: {filename}")

        # Generate favicon.ico
        # It can contain multiple sizes
        ico_sizes = [(16, 16), (32, 32), (48, 48)]
        ico_path = os.path.join(OUTPUT_DIR, 'favicon.ico')
        img.save(ico_path, format='ICO', sizes=ico_sizes)
        print("Generated: favicon.ico")

    except Exception as e:
        print(f"Error generating favicons: {e}")

if __name__ == "__main__":
    generate_favicons()
