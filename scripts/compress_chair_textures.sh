#!/bin/bash

# Directory containing the textures
DIR="public/static/animation-files/objects"

# Check if directory exists
if [ ! -d "$DIR" ]; then
    echo "Directory $DIR does not exist."
    exit 1
fi

# Files to compress
FILES=(
    "old_wooden_chair_AO-old_wooden_chair_Roughness-old_wooden_chair_Metallic.png"
    "old_wooden_chair_Normal.png"
    "old_wooden_chair_bcolor.png"
)

# Resolution to resize to (1024x1024 should result in small files)
SIZE="256x256"

for file in "${FILES[@]}"; do
    FILEPATH="$DIR/$file"
    if [ -f "$FILEPATH" ]; then
        echo "Processing $file..."
        
        # Create backup if not exists
        if [ ! -f "$FILEPATH.bak" ]; then
            echo "  Creating backup..."
            cp "$FILEPATH" "$FILEPATH.bak"
        fi
        
        # Resize and compress
        # -resize 1024x1024: Resizes image
        # -strip: Removes metadata
        # -quality 80: Compression quality level (doesn't affect PNG much usually, but some encoders use it)
        # -define png:compression-level=9: Max compression
        convert "$FILEPATH" -resize "$SIZE" -strip -define png:compression-level=9 "$FILEPATH"
        
        # Check size
        NEW_SIZE=$(du -h "$FILEPATH" | cut -f1)
        echo "  New size: $NEW_SIZE"
    else
        echo "Warning: $file not found in $DIR"
    fi
done

echo "Compression complete."
