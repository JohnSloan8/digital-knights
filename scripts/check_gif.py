from PIL import Image
import os

file_path = "./website/digital-knights/public/static/animation-files/gifs/electric-transparent.gif"

def check_gif():
    if not os.path.exists(file_path):
        print("File not found.")
        return

    try:
        with Image.open(file_path) as im:
            print(f"Format: {im.format}")
            print(f"Mode: {im.mode}")
            print(f"Is Animated: {getattr(im, 'is_animated', False)}")
            print(f"Frames: {getattr(im, 'n_frames', 1)}")
            print(f"Info: {im.info}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_gif()
