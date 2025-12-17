import os
import json
from PIL import Image

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def analyze_image(file_path, max_colors=6):
    try:
        img = Image.open(file_path)
        img = img.convert('RGBA')
        
        # Get pixel data
        pixels = list(img.getdata())
        
        # Filter out transparent pixels (Alpha < 10)
        visible_pixels = [p[:3] for p in pixels if p[3] > 10]
        
        if not visible_pixels:
            return {}

        total_pixels = len(visible_pixels)
        
        # Create a new image from visible pixels to use Pillow's quantize
        # We create a 1xN image strip
        temp_img = Image.new('RGB', (total_pixels, 1))
        temp_img.putdata(visible_pixels)
        
        # Quantize to max_colors using Fast Octree (method=2)
        # This reduces the palette to the dominant colors
        quantized = temp_img.quantize(colors=max_colors, method=2)
        
        # Get palette (returns [r, g, b, r, g, b, ...])
        palette = quantized.getpalette()
        
        # Get histogram of indices
        counts = quantized.histogram() 
        
        result = {}
        
        # Iterate through the counts and find non-zero ones
        for idx, count in enumerate(counts):
            if count > 0:
                # Get color from palette
                # The palette is a flat list of 768 values (256 RGB triplets)
                if palette and idx * 3 + 2 < len(palette):
                    r = palette[idx * 3]
                    g = palette[idx * 3 + 1]
                    b = palette[idx * 3 + 2]
                    hex_color = rgb_to_hex((r, g, b))
                    
                    ratio = count / total_pixels
                    
                    if hex_color in result:
                        result[hex_color] += ratio
                    else:
                        result[hex_color] = ratio
                    
        final_result = {k: round(v, 4) for k, v in result.items()}
        return dict(sorted(final_result.items(), key=lambda item: item[1], reverse=True))
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return {}

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(current_dir, 'color_analysis.json')
    
    results = {}
    
    files = [f for f in os.listdir(current_dir) if f.lower().endswith('.png')]
    
    print(f"Found {len(files)} PNG files.")
    
    for f in files:
        print(f"Processing {f}...")
        file_path = os.path.join(current_dir, f)
        color_data = analyze_image(file_path)
        results[f] = color_data
        
    with open(output_file, 'w') as json_file:
        json.dump(results, json_file, indent=4)
        
    print(f"Analysis complete. Saved to {output_file}")

if __name__ == "__main__":
    main()
