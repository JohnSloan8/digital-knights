import os
from PIL import Image

DIRECTORY = 'public/static/images/levels-pics'
MAX_SIZE = (800, 800)
QUALITY = 80

def convert_images():
    if not os.path.exists(DIRECTORY):
        print(f"Directory {DIRECTORY} not found.")
        return

    files_processed = 0
    for filename in os.listdir(DIRECTORY):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(DIRECTORY, filename)
            try:
                with Image.open(filepath) as img:
                    # Resize
                    img.thumbnail(MAX_SIZE)
                    
                    new_filename = os.path.splitext(filename)[0] + '.webp'
                    new_filepath = os.path.join(DIRECTORY, new_filename)
                    
                    img.save(new_filepath, 'WEBP', quality=QUALITY)
                    print(f"Converted {filename} -> {new_filename}")
                    files_processed += 1
                    
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

    print(f"Finished. Converted {files_processed} images.")

if __name__ == "__main__":
    convert_images()
